import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateSummaryDTO } from 'src/data';
import { LoggingService, SummaryService } from 'src/services';
import { ApiResponse, ApplicationError } from 'src/types';

@Controller('summary')
export class SummaryController {
  constructor(
    private readonly summaryService: SummaryService,
    private readonly logger: LoggingService,
  ) {}

  @Post('/create')
  async createSummary(
    @Body() createSummary: CreateSummaryDTO,
  ): Promise<ApiResponse<string>> {
    try {
      const summaryResult = await this.summaryService.createSummary(
        createSummary.noteId,
        createSummary.type,
        createSummary.customInstructions,
      );
      return { data: summaryResult.body };
    } catch (e) {
      if (e instanceof ApplicationError) {
        this.logger.debug(e.getMetadata());
        throw new HttpException(e.message, e.statusCode);
      }
      console.log(e);
      this.logger.error(e, 'Error creating summary');
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
