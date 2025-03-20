import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
