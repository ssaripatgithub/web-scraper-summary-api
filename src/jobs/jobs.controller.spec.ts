import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from '../schemas/Jobs.schema';
import { jobStub } from './stubs/jobs.stub';
import { CreateJobDto } from './dto/CreateJob.dto';
import { ScraperModule } from '../providers/scraper/scraper.module';
import { LlmModule } from '../providers/llm/llm.module';
import { PrometheusModule } from '../providers/prometheus/prometheus.module';

jest.mock('./jobs.service');

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService],
      controllers: [JobsController],
      imports: [ScraperModule, LlmModule, PrometheusModule],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    service = module.get<JobsService>(JobsService);
    jest.clearAllMocks();
  });

  describe('getJobById', () => {
    describe('when getJobById is called', () => {
      let job: Job;

      beforeEach(async () => {
        job = await controller.getJobById(jobStub()._id);
      });

      test('then it should call jobsService', () => {
        expect(service.getJobById).toHaveBeenCalledWith(jobStub()._id);
      });

      test('then it should return a job', () => {
        expect(job).toEqual(jobStub());
      });
    });
  });

  describe('createJob', () => {
    describe('when createJob is called', () => {
      let job: Job;
      let params: CreateJobDto;

      beforeEach(async () => {
        params = {
          url: jobStub().url,
        };
        const result = await controller.createJob(params);
        if ('url' in result) job = result;
        else job = result.data;
      });

      test('then it should return a job', () => {
        expect(job).toEqual(jobStub());
      });
    });
  });
});
