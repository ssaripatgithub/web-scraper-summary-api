import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LlmModule } from '../providers/llm/llm/llm.module';
import { ScraperModule } from '../providers/scraper/scraper/scraper.module';
import { Job, JobSchema } from '../schemas/Jobs.schema';

@Module({
  providers: [JobsService],
  controllers: [JobsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Job.name,
        schema: JobSchema,
      },
    ]),
    ScraperModule,
    LlmModule,
  ],
})
export class JobsModule {}
