import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { Messages } from 'src/constants';
import { GenerateSummaryOutput } from './llm.types';
import { UtilsService } from 'src/utils/utils.service';
import { IsObject } from 'class-validator';
const {
  LLM_API = '',
  LLM_MODEL = '',
  LLM_API_KEY = '',
  // LLM_MAX_TOKEN = '',
  LLM_ROLE = '',
  LLM_MIN_TOKEN = '',
  SUMMARIZE_PROMPT = '',
} = process.env;

@Injectable()
export class LlmService {
  private logger: Logger;
  private api_key = LLM_API_KEY;
  private authorization = `Bearer ${this.api_key}`;
  constructor(
    private httpService: HttpService,
    private readonly utilsService: UtilsService,
  ) {
    this.logger = new Logger(LlmService.name);
  }
  async generateSummary(text: string): Promise<GenerateSummaryOutput> {
    const sanitized_text = this.utilsService.sanitizeScrapedText(text);
    const prompt = `${SUMMARIZE_PROMPT} ${sanitized_text}`;
    const request_body = {
      model: LLM_MODEL,
      messages: [
        {
          role: LLM_ROLE,
          // using slice to avail free tier
          content: prompt.slice(0, +LLM_MIN_TOKEN),
        },
      ],
      // max_tokens: +LLM_MAX_TOKEN,
    };
    const config = {
      headers: {
        Authorization: this.authorization,
      },
    };

    return lastValueFrom(this.httpService.post(LLM_API, request_body, config))
      .then((response: AxiosResponse) => {
        const summary =
          response?.data?.choices[0]?.message?.content.trim() ?? '';
        return {
          success: true,
          summary,
          error_message: '',
        };
      })
      .catch((error: AxiosError) => {
        const data = error?.response?.data;
        let message = '';
        if (
          data &&
          typeof data === 'object' &&
          IsObject(data) &&
          'message' in data &&
          typeof data?.message === 'string'
        ) {
          message = data?.message || '';
        }
        message = message || error?.message || Messages.SOMETHING_WENT_WRONG;
        this.logger.error(`Error in Llm request: ${message}`);
        return {
          success: false,
          summary: '',
          error_message: message,
        };
      });
  }
}
