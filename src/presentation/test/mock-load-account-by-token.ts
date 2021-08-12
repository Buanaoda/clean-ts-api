import { mockAccountModel } from '@/domain/test';
import { AccountModel, LoadAccountByToken } from '../middlewares/auth-middleware-protocols';

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: String, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
