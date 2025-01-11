import { Counter, Histogram } from 'prom-client';
import { PrometheusService } from '../providers/prometheus/prometheus.service';

export function PromMonit() {
  return function (
    target: any,
    property_key: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    // convert camelCase to snake_case
    const metric_name = property_key?.replace(/([A-Z])/g, '_$1')?.toLowerCase();

    descriptor.value = async function (...args: any[]) {
      const prometheusService: PrometheusService = this.prometheusService;

      if (!prometheusService) {
        throw new Error(
          `PrometheusService is not injected into the class. Ensure it is available.`,
        );
      }

      // Create a counter for the job requests
      const counter: Counter<string> = prometheusService.createCounter(
        `${metric_name}_requests_total`,
        `Total number of ${metric_name} requests`,
        ['status'],
      );

      // Create a histogram for processing time
      const histogram: Histogram<string> = prometheusService.createHistogram(
        `${metric_name}_duration_seconds`,
        `Duration of ${metric_name} in seconds`,
        ['status'],
      );

      const start = Date.now();

      try {
        // Execute the original method
        const result = await originalMethod.apply(this, args);

        // Increment the counter for successful jobs
        counter.labels('completed').inc();

        // Record the processing time
        const duration = (Date.now() - start) / 1000;
        histogram.labels('completed').observe(duration);

        return result;
      } catch (error) {
        // Increment the counter for failed jobs
        counter.labels('failed').inc();

        // Record the processing time for failed jobs
        const duration = (Date.now() - start) / 1000;
        histogram.labels('failed').observe(duration);

        throw error; // Re-throw the error after logging
      }
    };

    return descriptor;
  };
}
