import { AddSurveyRepository } from './db-add-survey-protocols';
import { DbAddSurvey } from './db-add-survey';
import MockDate from 'mockdate';
import { throwError, mockSurveyParams } from '@/domain/test';
import { mockAddSurveyRepository } from '@/data/test';

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    await sut.add(mockSurveyParams());
    expect(addSpy).toHaveBeenCalledWith(mockSurveyParams());
  });

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError);
    const promise = sut.add(mockSurveyParams());
    await expect(promise).rejects.toThrow();
  });
});
