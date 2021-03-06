import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result';
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols';

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const { accountId } = httpRequest;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (survey) {
        const answers = survey.answers.map(a => a.answer);
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
        const surveyResult = await this.saveSurveyResult.save({
          accountId,
          surveyId,
          answer,
          date: new Date()
        });
        return ok(surveyResult);
      } else {
        return forbidden(new InvalidParamError('survey_id'));
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
