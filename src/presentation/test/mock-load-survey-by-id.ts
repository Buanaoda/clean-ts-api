import { mockSurveyModel } from '@/domain/test';
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id';
import { SurveyModel } from '../controllers/survey/load-surveys/add-survey-controller-protocols';

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdStub();
};
