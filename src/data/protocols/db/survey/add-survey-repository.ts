import { AddSurveyModel } from '../../../../domain/usecases/add-survey';

export class AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    return new Promise(resolve => resolve(null));
  }
}
