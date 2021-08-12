import { mockSurveyModels } from '@/domain/test';
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/add-survey-controller-protocols';

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveysStub();
};
