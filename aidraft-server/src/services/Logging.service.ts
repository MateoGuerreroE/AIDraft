import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService extends Logger implements LoggerService {
  constructor() {
    super();
  }

  log(message: string) {
    super.log(message);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
  }

  warn(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.verbose(message);
  }
}
