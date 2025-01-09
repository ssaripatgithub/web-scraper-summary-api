import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
const { BAD_REQUEST, NOT_FOUND } = HttpStatus;
import mongoose from 'mongoose';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/CreateJob.dto';
import { JobStatuses } from './jobs.types';
import { Messages } from 'src/constants';
import { ScraperService } from 'src/providers/scraper/scraper/scraper.service';
import { LlmService } from 'src/providers/llm/llm/llm.service';

@Controller('jobs')
export class JobsController {
  private logger: Logger;
  constructor(
    private readonly jobsService: JobsService,
    private readonly scraperService: ScraperService,
    private readonly llmService: LlmService,
  ) {
    this.logger = new Logger(JobsController.name);
  }

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    const is_valid = mongoose.Types.ObjectId.isValid(id);
    if (!is_valid) throw new HttpException(Messages.INVALID_ID, BAD_REQUEST);
    const result = await this.jobsService.getJobById(id);
    if (!result) throw new HttpException(Messages.JOB_NOT_FOUND, NOT_FOUND);
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createJob(@Body() params: CreateJobDto) {
    const { url } = params;

    let summary = '';
    let status = JobStatuses.FAILED;
    let error_message = '';

    try {
      const text = await this.scraperService.scrapeWebpage(url);

      if (!text) {
        error_message = Messages.NO_TEXT_CONTENT_FOUND;
      }

      const result = await this.llmService.generateSummary(text);
      summary = result?.summary ?? '';
      status = result?.success ? JobStatuses.COMPLETED : JobStatuses.FAILED;

      if (!result?.success) {
        error_message = result?.error_message;
      }
    } catch (error) {
      error_message = error_message || error.message;
      this.logger.error('Error in createJob:', error_message);
    }

    return this.jobsService.createJob({
      ...params,
      summary,
      status,
      ...(error_message && { error_message }),
      created_date: new Date(),
    });
  }
}
