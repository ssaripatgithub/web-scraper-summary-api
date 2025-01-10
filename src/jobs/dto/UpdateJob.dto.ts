import { IsDate, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateJobDto {
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
  updated_date: Date;
}
