import request from 'supertest';
import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import env from '@/main/config/env';
import { mockSurveyParams } from '@/domain/test';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'Rodrigo@mail.com',
    password: '123',
    role: 'admin'
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  });
  return accessToken;
};

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /survey', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/survey')
        .send(mockSurveyParams())
        .expect(403);
    });

    test('Should return 204 on add survey with valid token', async () => {
      const accessToken = await makeAccessToken();
      await request(app)
        .post('/api/survey')
        .set('x-access-token', accessToken)
        .send(mockSurveyParams())
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403);
    });
  });

  test('Should return 200 on load surveys with valid accessToken', async () => {
    await surveyCollection.insertMany([mockSurveyParams(), mockSurveyParams()]);
    const accessToken = await makeAccessToken();
    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(200);
  });
});
