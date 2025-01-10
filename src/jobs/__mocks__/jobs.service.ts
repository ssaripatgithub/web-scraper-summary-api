import { jobStub } from '../stubs/jobs.stub';

export const JobsService = jest.fn().mockReturnValue({
  getJobById: jest.fn().mockResolvedValue(jobStub()),
  createJob: jest.fn().mockResolvedValue(jobStub()),
});
