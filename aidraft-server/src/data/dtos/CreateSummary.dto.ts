import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { SummaryType } from 'src/types';

export class CreateSummaryDTO {
  @IsNotEmpty()
  @IsUUID()
  noteId: string;

  @IsEnum(SummaryType)
  @IsNotEmpty()
  type: SummaryType;

  @IsOptional()
  @IsString()
  customInstructions?: string;
}
