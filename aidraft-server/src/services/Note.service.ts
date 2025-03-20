import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRecord, UpdateNoteDTO, UserRecord } from 'src/data';
import { CreateNoteDTO } from 'src/data/dtos/CreateNote.dto';
import { BadRequestError, NotFoundError, UnauthorizedError } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRecord)
    private readonly noteRepository: Repository<NoteRecord>,
    @InjectRepository(UserRecord)
    private readonly userRepository: Repository<UserRecord>,
  ) {}

  async getNoteById(noteId: string): Promise<NoteRecord> {
    const note = await this.noteRepository.findOneBy({ noteId });
    if (!note) {
      throw new NotFoundError('Note', { entityId: noteId });
    }
    return note;
  }

  async getNotesByUserId(userId: string): Promise<NoteRecord[]> {
    return this.noteRepository.find({ where: { user: { userId } } });
  }

  async createNote(noteAttributes: CreateNoteDTO): Promise<NoteRecord> {
    const validUser = await this.userRepository.findOneBy({
      userId: noteAttributes.userId,
    });
    if (!validUser) {
      throw new NotFoundError('User to link new Note', {
        entityId: noteAttributes.userId,
      });
    }
    const noteInstance = this.noteRepository.create({
      ...noteAttributes,
      user: { userId: noteAttributes.userId },
    });
    return this.noteRepository.save(noteInstance);
  }

  async updateNoteById(
    noteAttributes: UpdateNoteDTO,
    updater: string,
  ): Promise<NoteRecord> {
    const { noteId, ...updatedAttributes } = noteAttributes;
    const existentNote = await this.noteRepository.findOne({
      where: { noteId },
      relations: { user: true },
    });
    if (!existentNote) {
      throw new NotFoundError('Note to Update', { entityId: noteId });
    }
    if (updater !== existentNote.user.userId) {
      throw new UnauthorizedError('Cannot update note you do not own');
    }
    const { affected } = await this.noteRepository.update(
      { noteId },
      updatedAttributes,
    );
    if (affected === 0) {
      throw new NotFoundError('Note', { entityId: noteAttributes.noteId });
    }
    return this.getNoteById(noteAttributes.noteId);
  }

  async deleteNoteById(noteId: string): Promise<void> {
    const { affected } = await this.noteRepository.softDelete({ noteId });
    if (affected === 0) {
      throw new NotFoundError('Note', { entityId: noteId });
    }
  }

  async deleteNotesBatch(noteIds: string[]): Promise<void> {
    for (const noteId of noteIds) {
      await this.deleteNoteById(noteId);
    }
  }

  async removeNoteRecord(noteId: string): Promise<void> {
    const note = await this.getNoteById(noteId);
    if (note.deletedAt === null) {
      throw new BadRequestError('Note is not in trash', {
        rule: 'Note must be in trash to be removed',
      });
    }
    await this.noteRepository.remove(note);
  }
}
