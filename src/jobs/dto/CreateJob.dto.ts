import { IsDate, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsUrl()
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  error_message?: string;

  @IsDate()
  @IsOptional()
  created_date?: Date;
}
