import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRecord, SummaryRecord } from 'src/data';
import {
  BadRequestError,
  GenerativeAIService,
  NotFoundError,
  SummaryType,
} from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(SummaryRecord)
    private readonly summaryRepository: Repository<SummaryRecord>,
    @InjectRepository(NoteRecord)
    private readonly noteRepository: Repository<NoteRecord>,
    private readonly generativeSummaryService: GenerativeAIService,
  ) {}

  async createSummary(
    noteId: string,
    type: SummaryType,
    customInstructions?: string,
  ): Promise<SummaryRecord> {
    const note = await this.noteRepository.findOneBy({ noteId });
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    const noteContent = note.content;
    if (!noteContent.length) throw new BadRequestError('Note is empty');
    const summary = await this.generativeSummaryService.generateSummary(
      noteContent,
      type,
      customInstructions,
    );
    const summaryInstance = this.summaryRepository.create({
      note: { noteId },
      body: summary,
      customInstructions: customInstructions ?? null,
      type,
    });
    return this.summaryRepository.save(summaryInstance);
  }
}
