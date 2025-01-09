import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  sanitizeScrapedText(text: string) {
    // replace /n with <new line here> to avoid malformed request add context for the llm.
    return text.replace(/\n+/gm, '<new line here>').trim();
  }
}
