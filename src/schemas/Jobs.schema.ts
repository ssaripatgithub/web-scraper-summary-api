import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Job {
  @Prop({ required: true })
  url: string;

  @Prop({ required: false })
  status?: string;

  @Prop({ required: false })
  summary?: string;

  @Prop({ required: false })
  error_message?: string;

  @Prop({ required: false })
  created_date?: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
