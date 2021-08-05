import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import { Collection } from 'mongodb';
import { AddSurveyModel } from '../../domain/usecases/add-survey';

let surveyCollection: Collection;

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'any_image'
    }
  ]
});

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
  });

  describe('POST /survey', () => {
    test('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/survey')
        .send(makeFakeSurveyData())
        .expect(204);
    });
  });
});
