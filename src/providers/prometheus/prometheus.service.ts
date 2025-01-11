import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly registry: client.Registry;
  private counters: Record<string, client.Counter> = {};
  private histograms: Record<string, client.Histogram> = {};

  constructor() {
    this.registry = new client.Registry();

    client.collectDefaultMetrics({ register: this.registry });
  }

  createCounter(
    name: string,
    help: string,
    labelNames: string[] = [],
  ): client.Counter {
    if (this.counters[name]) {
      return this.counters[name];
    }
    const counter = new client.Counter({
      name,
      help,
      labelNames,
      registers: [this.registry],
    });
    this.counters[name] = counter;
    this.registry.registerMetric(counter);
    return counter;
  }

  createHistogram(
    name: string,
    help: string,
    labelNames: string[] = [],
  ): client.Histogram {
    if (this.histograms[name]) {
      return this.histograms[name];
    }
    const histogram = new client.Histogram({
      name,
      help,
      labelNames,
      registers: [this.registry],
    });
    this.histograms[name] = histogram;
    this.registry.registerMetric(histogram);
    return histogram;
  }

  getContentType(): string {
    return this.registry.contentType;
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
