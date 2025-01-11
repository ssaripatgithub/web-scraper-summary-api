import mongoose from 'mongoose';
import { jobStub } from '../stubs/jobs.stub';
import { JobSchema } from '../../schemas/Jobs.schema';

const Job = mongoose.model('Job', JobSchema);
export const JobsService = jest.fn().mockReturnValue({
  getJobById: jest.fn().mockResolvedValue(new Job(jobStub())),
  createJob: jest.fn().mockResolvedValue(jobStub()),
});
