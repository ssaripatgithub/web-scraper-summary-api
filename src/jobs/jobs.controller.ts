import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  constructor() {}

  @Get(':id')
  getJobsById(@Param('id') id: string) {
    return id;
  }

  @Post()
  createJob(@Body() params: any) {
    return params;
  }
}
