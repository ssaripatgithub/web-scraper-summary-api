import { Controller, Get, Response } from '@nestjs/common';
import { PrometheusService } from '../providers/prometheus/prometheus.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get()
  async getMetrics(@Response() res: any) {
    res.set('Content-Type', this.prometheusService.getContentType());
    const result = await this.prometheusService.getMetrics();
    res.end(result);
  }
}
