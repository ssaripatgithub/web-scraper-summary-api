import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Job {
  @Prop({ unique: true, required: true })
  url: string;

  @Prop({ required: false })
  status?: string;

  @Prop({ required: false })
  summary?: string;

  @Prop({ required: false })
  error_message?: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
