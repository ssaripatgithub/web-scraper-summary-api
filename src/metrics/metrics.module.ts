import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { PrometheusModule } from '../providers/prometheus/prometheus.module';

@Module({
  imports: [PrometheusModule],
  controllers: [MetricsController],
  providers: [],
})
export class MetricsModule {}
