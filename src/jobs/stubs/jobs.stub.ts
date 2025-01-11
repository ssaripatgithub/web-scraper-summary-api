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
  created_date: new Date('2025-01-10T05:38:05.386Z'),
  updated_date: new Date('2025-01-10T05:38:05.386Z'),
});
