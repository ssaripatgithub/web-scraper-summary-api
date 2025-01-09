import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Job not found', 404);
    const findJob = await this.jobsService.getJobById(id);
    if (!findJob) throw new HttpException('Job not found', 404);
    return findJob;
  }

  @Post()
  createJob(@Body() params: any) {
    return params;
  }
}
