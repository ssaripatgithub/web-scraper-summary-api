import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/CreateJob.dto';
import { JobStatuses } from './jobs.types';
import { Messages } from 'src/constants';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    const is_valid = mongoose.Types.ObjectId.isValid(id);
    if (!is_valid)
      throw new HttpException(Messages.INVALID_ID, HttpStatus.BAD_REQUEST);
    const result = await this.jobsService.getJobById(id);
    if (!result)
      throw new HttpException(Messages.JOB_NOT_FOUND, HttpStatus.NOT_FOUND);
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createJob(@Body() params: CreateJobDto) {
    return this.jobsService.createJob({
      ...params,
      status: JobStatuses.PENDING,
      created_date: new Date(),
    });
  }
}
