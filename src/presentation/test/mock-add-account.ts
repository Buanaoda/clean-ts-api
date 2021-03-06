import { AccountModel, AddAccount, AddAccountParams } from '../controllers/login/signup/signup-controller-protocols';
import { mockAccountModel } from '@/domain/test';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};
