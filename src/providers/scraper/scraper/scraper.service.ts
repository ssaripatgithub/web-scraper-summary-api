import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(ScraperService.name);
  }

  async scrapeWebpage(url: string): Promise<string> {
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

    // Return the scraped text
    return text_content;
  }
}
