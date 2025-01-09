import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';
const { DATABASE_CONNECTION = '' } = process.env;

@Module({
  imports: [JobsModule, MongooseModule.forRoot(DATABASE_CONNECTION)],
  controllers: [],
  providers: [],
})
export class AppModule {}
