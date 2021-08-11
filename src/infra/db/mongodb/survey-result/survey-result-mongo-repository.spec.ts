import { Collection } from 'mongodb';
import { AddSurveyModel } from '@/domain/usecases/add-survey';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';
import { SurveyModel } from '@/domain/models/survey';
import { AccountModel } from '@/domain/models/account';
import { AddAccountModel } from '@/domain/usecases/add-account';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

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
  ],
  date: new Date()
});

const makeFakeAddAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
});

const makeFakeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(makeFakeSurveyData());
  return res.ops[0];
};

const makeFakeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(makeFakeAddAccountData());
  return res.ops[0];
};

describe('SurveyResultMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('surveys');
    await surveyResultCollection.deleteMany({});
    surveyCollection = await MongoHelper.getCollection('surveyResults');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository();
  };

  describe('SAVE', () => {
    test('Should add a survey result if it is new', async () => {
      const survey = await makeFakeSurvey();
      const account = await makeFakeAccount();
      const sut = makeSut();
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      });
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });
  });
});
