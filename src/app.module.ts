import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
