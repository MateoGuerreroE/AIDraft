import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
