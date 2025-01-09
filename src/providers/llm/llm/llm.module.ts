import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  providers: [LlmService],
  exports: [LlmService],
  imports: [HttpModule, UtilsModule],
})
export class LlmModule {}
