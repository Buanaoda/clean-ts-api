import { makeDbAuthentication } from '../../../usecases/authentication/db-authentication-factory';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeAddAccount } from '../../../usecases/account/add-account/db-add-account-factory';
import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(signUpController);
};
