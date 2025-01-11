import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from './llm.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { UtilsModule } from '../../utils/utils.module';

describe('LlmService', () => {
  let service: LlmService;
  const mock_summary = 'Mocked summary';
  const mockHttpService = {
    post: jest.fn().mockReturnValue(
      of({
        data: {
          choices: [
            {
              message: {
                content: mock_summary,
              },
            },
          ],
        },
      }),
    ),
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
      imports: [UtilsModule],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return successful response', async () => {
    const prompt = 'Test prompt';
    const response = await service.generateSummary({
      text: prompt,
      job_id: '12345',
    });
    const summary = response?.data;
    expect(summary).toEqual(mock_summary);
  });
});
