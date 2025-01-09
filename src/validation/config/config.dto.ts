import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_CONNECTION: string;

  @IsString()
  @IsNotEmpty()
  LLM_API: string;

  @IsString()
  @IsNotEmpty()
  LLM_MODEL: string;

  @IsString()
  @IsNotEmpty()
  LLM_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  LLM_MAX_TOKEN: string;

  @IsString()
  @IsNotEmpty()
  LLM_ROLE: string;

  @IsString()
  @IsNotEmpty()
  SUMMARIZE_PROMPT: string;

  @IsString()
  @IsNotEmpty()
  LLM_MIN_TOKEN: string;
}
