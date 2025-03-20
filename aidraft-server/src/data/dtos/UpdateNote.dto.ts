import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateNoteDTO {
  @IsUUID()
  @IsNotEmpty()
  noteId!: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
