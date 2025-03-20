import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateNoteDTO, NoteRecord } from 'src/data';
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
}
