import { Prop } from '@nestjs/mongoose';
import { Job } from '../../schemas/Jobs.schema';

class JobStub extends Job {
  @Prop({ required: true })
  _id: string;
}

export const jobStub = (): JobStub => ({
  _id: '6780b0cab3ca687624a3de2c',
  url: 'https://example.com',
  status: 'pending',
  summary: '',
  error_message: '',
});
