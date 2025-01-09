import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapperModule } from './providers/scraper/scraper/scraper.module';
import { LlmModule } from './providers/llm/llm/llm.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validation/config/config.validate';
import { UtilsModule } from './utils/utils.module';
const { DATABASE_CONNECTION = '' } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JobsModule,
    MongooseModule.forRoot(DATABASE_CONNECTION),
    ScrapperModule,
    LlmModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
