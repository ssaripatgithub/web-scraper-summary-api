import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from '../schemas/Jobs.schema';
import { ScraperModule } from '../providers/scraper/scraper.module';
import { LlmModule } from '../providers/llm/llm.module';
import { PrometheusModule } from '../providers/prometheus/prometheus.module';
import { UtilsModule } from '../utils/utils.module';

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
    PrometheusModule,
    UtilsModule,
  ],
})
export class JobsModule {}
