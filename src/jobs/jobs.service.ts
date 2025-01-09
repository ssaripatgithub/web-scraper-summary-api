import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/Jobs.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}
  getJobById(id: string) {
    return this.jobModel.findById(id);
  }
}
