import { makeLogControllerDecorator } from '@/main/factories/controllers/decorators/log-controller-decorator-factory';
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory';
import { makeAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory';
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller';
import { Controller } from '@/presentation/protocols';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeAddAccount(), makeSignUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(signUpController);
};
