import { DbSaveSurveyResult } from './db-save-survey-result';
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result';
import { SurveyResultModel } from '@/domain/models/survey-result';
import MockDate from 'mockdate';
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result';

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_account_id',
  answer: 'any_answer',
  date: new Date()
});

const makeFakeSurveyResult = (): SurveyResultModel => (
  Object.assign({}, makeFakeSurveyResultData(), { id: 'any_id' })
);

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    await sut.save(makeFakeSurveyResultData());
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData());
  });
});
