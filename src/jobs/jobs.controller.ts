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
import { Messages } from '../constants';
import { Job } from '../schemas/Jobs.schema';
import { Result } from '../types';
import { ScraperService } from '../providers/scraper/scraper.service';
import { LlmService } from '../providers/llm/llm.service';
import { PromMonit } from '../metrics/prom-monit.decorator';
import { PrometheusService } from '../providers/prometheus/prometheus.service';

@Controller('jobs')
export class JobsController {
  private logger: Logger;
  constructor(
    private readonly jobsService: JobsService,
    private readonly scraperService: ScraperService,
    private readonly llmService: LlmService,
    private readonly prometheusService: PrometheusService,
  ) {
    this.logger = new Logger(JobsController.name);
  }

  @Get(':id')
  @PromMonit()
  async getJobById(@Param('id') id: string): Promise<Job> {
    const is_valid = mongoose.Types.ObjectId.isValid(id);
    if (!is_valid) throw new HttpException(Messages.INVALID_ID, BAD_REQUEST);
    const result = await this.jobsService.getJobById(id);
    if (!result) throw new HttpException(Messages.JOB_NOT_FOUND, NOT_FOUND);
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @PromMonit()
  async createJob(@Body() params: CreateJobDto): Promise<Result | Job> {
    const { url } = params;
    // this.jobRequestsCounter.inc({ method: 'POST', status: 'pending' });
    this.logger.log(`Received request to scrape URL: ${url}`);

    let summary = '';
    let status = JobStatuses.PENDING;
    let error_message = '';

    const create_job_result = await this.jobsService.createJob({
      ...params,
      status,
      created_date: new Date(),
    });

    if (!create_job_result?.success) {
      return create_job_result;
    }

    const job_id = create_job_result?.data?._id.toString();
    try {
      this.logger.log(`Scraping text for job ID: ${job_id}`);
      const scrape_result = await this.scraperService.scrapeWebpage(url);

      if (!scrape_result?.success) {
        error_message =
          scrape_result?.message || Messages.NO_TEXT_CONTENT_FOUND;
      } else {
        const scraped_text: string = scrape_result?.data ?? '';
        const result = await this.llmService.generateSummary({
          text: scraped_text,
          job_id,
        });
        summary = result?.data ?? '';
        status = result?.success ? JobStatuses.COMPLETED : JobStatuses.FAILED;

        if (!result?.success) {
          error_message = result?.message;
        }
      }
    } catch (error) {
      error_message = error_message || error.message;
      this.logger.error('Error in createJob:', error_message);
    }

    const update_params = {
      _id: job_id,
      ...params,
      summary,
      status,
      ...(error_message && { error_message }),
      updated_date: new Date(),
    };
    const update_result = await this.jobsService.updateJob(
      job_id,
      update_params,
    );
    if (!update_result?.success) {
      return {
        ...update_params,
        error_message: `Failed to process job ID: ${job_id}`,
      };
    }

    return update_result?.data;
  }

  @Get('/metrics/metrics')
  async getMetrics(): Promise<string> {
    return this.prometheusService.getMetrics();
  }
}
