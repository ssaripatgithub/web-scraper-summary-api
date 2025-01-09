import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from './config.dto';
import { Logger } from '@nestjs/common';
const logger = new Logger('ConfigValidation');

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    const messages = errors
      .map((error: any) => Object.values(error?.constraints)?.join('\n') ?? '')
      .join('\n');
    logger.error('Error: Invalid configuration');
    logger.error(messages);
    process.exit(0);
  }
  return validatedConfig;
}