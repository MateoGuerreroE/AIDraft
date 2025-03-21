import { Module } from '@nestjs/common';
import { ConfigModule } from './Config.module';
import { LoggingModule } from './Logging.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRecord, SummaryRecord, UserRecord } from 'src/data';
import { GeminiService, NoteService, SummaryService } from 'src/services';
import { GenerativeAIService } from 'src/types';
import { NoteController, SummaryController } from 'src/controller';

@Module({
  imports: [
    ConfigModule,
    LoggingModule,
    TypeOrmModule.forFeature([NoteRecord, UserRecord, SummaryRecord]),
  ],
  providers: [
    NoteService,
    SummaryService,
    { provide: GenerativeAIService, useClass: GeminiService },
  ],
  controllers: [NoteController, SummaryController],
  exports: [NoteService, SummaryService],
})
export class ContentModule {}
