import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeAddAccount } from '../../usecases/add-account/add-account-factory';
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(signUpController);
};
