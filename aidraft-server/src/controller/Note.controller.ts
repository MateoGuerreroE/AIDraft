import { Body, Controller, HttpException, Post, Put } from '@nestjs/common';
import { CreateNoteDTO, NoteRecord, UpdateNoteDTO } from 'src/data';
import { LoggingService, NoteService } from 'src/services';
import { ApiResponse, ApplicationError } from 'src/types';

@Controller('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly logger: LoggingService,
  ) {}

  @Post('/create')
  async createNote(
    @Body() note: CreateNoteDTO,
  ): Promise<ApiResponse<NoteRecord>> {
    try {
      const createdNote = await this.noteService.createNote(note);
      return { data: createdNote };
    } catch (e) {
      if (e instanceof ApplicationError) {
        this.logger.debug(e.getMetadata());
        throw new HttpException(e.message, e.statusCode);
      }
      this.logger.error(e, 'CreateNoteController');
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Put('/save')
  async saveNote(
    @Body() noteUpdates: UpdateNoteDTO,
  ): Promise<ApiResponse<string>> {
    try {
      const updatedNote = await this.noteService.updateNoteById(noteUpdates);
      return { data: updatedNote.updatedAt.toISOString() };
    } catch (e) {
      if (e instanceof ApplicationError) {
        this.logger.debug(e.getMetadata());
        throw new HttpException(e.message, e.statusCode);
      }
      this.logger.error(e, 'SaveNoteController');
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
