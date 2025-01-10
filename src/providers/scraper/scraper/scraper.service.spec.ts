import { Test, TestingModule } from '@nestjs/testing';
import { ScraperService } from './scraper.service';
import { jest } from '@jest/globals';
import puppeteer from 'puppeteer';
jest.mock('puppeteer');

describe('ScraperService', () => {
  let service: ScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperService],
    }).compile();

    service = module.get<ScraperService>(ScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should scrape webpage', async () => {
    const mock_text_content = 'Mocked text content';
    const url = 'https://example.com';

    const mockEvaluate = jest
      .fn<() => Promise<string>>()
      .mockResolvedValue(mock_text_content);
    const mockGoto = jest.fn<() => Promise<boolean>>().mockResolvedValue(true);
    const mockNewPage = jest.fn<() => Promise<any>>().mockResolvedValue({
      goto: mockGoto,
      evaluate: mockEvaluate,
    });

    const mockBrowser = {
      newPage: mockNewPage,
      close: jest.fn(),
    } as any;

    (puppeteer as any).launch = jest
      .fn<() => Promise<any>>()
      .mockResolvedValue(mockBrowser);

    const result = await service.scrapeWebpage(url);

    // Assert: Verify the expected content is returned
    expect(result?.data).toBe(mock_text_content);
    expect(puppeteer.launch).toHaveBeenCalledTimes(1);
    expect(mockBrowser.newPage).toHaveBeenCalledTimes(1);
    expect(mockGoto).toHaveBeenCalledWith(url, {
      waitUntil: 'domcontentloaded',
    });
    expect(mockEvaluate).toHaveBeenCalledTimes(1);
    expect(mockBrowser.close).toHaveBeenCalledTimes(1);
  });
});
