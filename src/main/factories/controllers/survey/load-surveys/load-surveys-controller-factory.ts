import { makeLogControllerDecorator } from '@/main/factories/controllers/decorators/log-controller-decorator-factory';
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-survey/db-load-surveys-factory';
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller';
import { Controller } from '@/presentation/protocols';

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(controller);
};
