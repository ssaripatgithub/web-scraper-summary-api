import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/schemas/Jobs.schema';
import { ScrapperModule } from 'src/providers/scraper/scraper/scraper.module';
import { LlmModule } from 'src/providers/llm/llm/llm.module';

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
    ScrapperModule,
    LlmModule,
  ],
})
export class JobsModule {}
