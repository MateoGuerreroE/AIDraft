import { Module } from '@nestjs/common';
import { LoggingService } from 'src/services';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
