import { AddAccount, AddAccountParams, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols';
import { LoadAccountByEmailRepository } from '@/data/protocols/db';

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }));
      return newAccount;
    }
    return null;
  }
}
