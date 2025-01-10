import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validation/config/config.validate';
import { UtilsModule } from './utils/utils.module';
import { HttpModule } from '@nestjs/axios';
import { ScraperModule } from './providers/scraper/scraper.module';
import { LlmModule } from './providers/llm/llm.module';
const { DATABASE_CONNECTION = '' } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JobsModule,
    MongooseModule.forRoot(DATABASE_CONNECTION),
    ScraperModule,
    LlmModule,
    UtilsModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
