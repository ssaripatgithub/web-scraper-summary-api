import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { getModelToken } from '@nestjs/mongoose';
import { Job } from '../schemas/Jobs.schema';
import { ScrapperModule } from '../providers/scraper/scraper/scraper.module';
import { LlmModule } from '../providers/llm/llm/llm.module';
import { JobsController } from './jobs.controller';
import { CreateJobDto } from './dto/CreateJob.dto';

describe('JobsService', () => {
  let service: JobsService;
  const mockJobModel = {
    create: jest.fn().mockResolvedValue({
      _id: '12345',
      ...new CreateJobDto(),
    }),
    find: jest.fn().mockResolvedValue([
      {
        _id: '12345',
        title: 'Job Title',
        description: 'Job Description',
      },
    ]),
    save: jest.fn().mockResolvedValue({
      _id: '12345',
      ...new CreateJobDto(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        JobsService,
        {
          provide: getModelToken(Job.name),
          useValue: mockJobModel,
        },
      ],
      imports: [ScrapperModule, LlmModule],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
