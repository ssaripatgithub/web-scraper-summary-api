import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Result } from 'src/types';

@Injectable()
export class ScraperService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(ScraperService.name);
  }

  async scrapeWebpage(url: string): Promise<Result> {
    let message = '';
    try {
      // Launch the browser and open a new blank page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate the page to a URL.
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      // Extract text content from the page
      const text_content = await page.evaluate(() => {
        const body = document.querySelector('body');
        return body ? body.innerText : '';
      });

      await browser.close();

      message = `Scraped text for URL: ${url}`;
      this.logger.log(message);

      // Return the scraped text
      return {
        success: true,
        message,
        data: text_content,
      };
    } catch (error) {
      message = `Failed to scrape URL: ${url} : ${error?.message}`;
      this.logger.error(message);
      return {
        success: false,
        message,
        data: null,
      };
    }
  }
}
