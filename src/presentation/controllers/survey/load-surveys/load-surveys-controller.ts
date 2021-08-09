import { LoadSurveys } from '../../../../domain/usecases/load-surveys';
import { Controller, HttpRequest, HttpResponse } from './add-survey-controller-protocols';
import { ok } from '../../../helpers/http/http-helper';

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load();
    return ok(surveys);
  }
}
