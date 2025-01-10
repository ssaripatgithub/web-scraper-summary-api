import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { ScrapperModule } from '../providers/scraper/scraper/scraper.module';
import { LlmModule } from '../providers/llm/llm/llm.module';

describe('JobsController', () => {
  let controller: JobsController;
  const mockJobService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService],
      controllers: [JobsController],
      imports: [ScrapperModule, LlmModule],
    })
      .overrideProvider(JobsService)
      .useValue(mockJobService)
      .compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
