import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
