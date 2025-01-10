import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../src/validation/config/config.validate';
import { JobsModule } from '../src/jobs/jobs.module';
import { ScraperModule } from '../src/providers/scraper/scraper/scraper.module';
import { LlmModule } from '../src/providers/llm/llm/llm.module';
import { UtilsModule } from '../src/utils/utils.module';
import { HttpModule } from '@nestjs/axios';

let mongoServer: MongoMemoryServer;
let mongo_uri: string;

const setupMongoDb = async () => {
  // Create an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  mongo_uri = mongoServer.getUri();

  // Connect Mongoose to the in-memory MongoDB
  await mongoose.connect(mongo_uri);
};

const stopMongoDb = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await setupMongoDb();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validate,
        }),
        JobsModule,
        MongooseModule.forRoot(mongo_uri),
        ScraperModule,
        LlmModule,
        UtilsModule,
        HttpModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await stopMongoDb();
    await app.close();
  });

  it('should return 400 for invalid job id', () => {
    return request(app.getHttpServer()).get('/jobs/1').expect(400);
  });
});
