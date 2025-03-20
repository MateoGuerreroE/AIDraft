import {
  Body,
  Controller,
  HttpException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/AuthGuard';
import { CreateNoteDTO, NoteRecord, UpdateNoteDTO } from 'src/data';
import { LoggingService, NoteService } from 'src/services';
import { ApiResponse, ApplicationError, IAuthUser } from 'src/types';
import { AuthUser } from 'src/utils/decorators';

@Controller('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly logger: LoggingService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  async createNote(
    @Body() note: CreateNoteDTO,
    @AuthUser() user: IAuthUser,
  ): Promise<ApiResponse<NoteRecord>> {
    try {
      const userId = note.userId || user.userId;
      const createdNote = await this.noteService.createNote({
        ...note,
        userId,
      });
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

  @UseGuards(JwtGuard)
  @Put('/save')
  async saveNote(
    @Body() noteUpdates: UpdateNoteDTO,
    @AuthUser() user: IAuthUser,
  ): Promise<ApiResponse<string>> {
    try {
      const updatedNote = await this.noteService.updateNoteById(
        noteUpdates,
        user.userId,
      );
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
