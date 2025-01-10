import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from './llm.service';
import { HttpService } from '@nestjs/axios';
import { UtilsModule } from '../../../utils/utils.module';
import { LlmModule } from './llm.module';

describe('LlmService', () => {
  let service: LlmService;
  const mockHttpService = {
    post: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LlmService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
      imports: [UtilsModule, LlmModule],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
