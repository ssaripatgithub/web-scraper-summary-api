import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/CreateJob.dto';
import { UpdateJobDto } from './dto/UpdateJob.dto';
import { Job } from '../schemas/Jobs.schema';
import { Messages } from '../constants';
import { Result } from '../types';

@Injectable()
export class JobsService {
  private logger: Logger;
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {
    this.logger = new Logger(JobsService.name);
  }
  getJobById(id: string) {
    return this.jobModel.findById(id);
  }

  async createJob(params: CreateJobDto): Promise<Result> {
    try {
      const new_job = await new this.jobModel(params).save();
      return {
        success: true,
        data: new_job.toObject(),
        message: '',
      };
    } catch (error) {
      const message = error.message || Messages.SOMETHING_WENT_WRONG;
      this.logger.error(`${Messages.ERROR_SAVING_JOB} ${message}`);

      return {
        success: false,
        message: `${Messages.JOB_CREATION_FAILED} ${message}`,
        data: null,
      };
    }
  }

  async updateJob(id: string, params: UpdateJobDto): Promise<Result> {
    try {
      const result = await this.jobModel.findByIdAndUpdate(id, params, {
        new: true,
      });
      const data = result?.toObject();
      return {
        success: true,
        message: '',
        data,
      };
    } catch (error) {
      const message = `Failed to update job ID: ${id} : ${error?.message}`;
      this.logger.error(message);
      return {
        success: false,
        message,
        data: null,
      };
    }
  }
}
