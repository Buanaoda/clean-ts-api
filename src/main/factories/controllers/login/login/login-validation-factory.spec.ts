import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators';
import { Validation } from '@/presentation/protocols/validation';
import { makeLoginValidation } from './login-validation-factory';
import { mockEmailValidator } from '@/validation/test';

jest.mock('@/validation/validators/validation-composite');

describe('LoginValidation Factory', () => {
  test('Should call validation composite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', mockEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
