import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/Jobs.schema';
import { CreateJobDto } from './dto/CreateJob.dto';
import { Messages } from 'src/constants';

@Injectable()
export class JobsService {
  private logger: Logger;
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {
    this.logger = new Logger(JobsService.name);
  }
  getJobById(id: string) {
    return this.jobModel.findById(id);
  }

  async createJob(params: CreateJobDto) {
    try {
      const new_job = new this.jobModel(params);
      return new_job;
    } catch (error) {
      const message = error.message || Messages.SOMETHING_WENT_WRONG;
      this.logger.log(`${Messages.ERROR_SAVING_JOB} ${message}`);

      return {
        success: false,
        message: `${Messages.JOB_CREATION_FAILED} ${message}`,
      };
    }
  }
}
