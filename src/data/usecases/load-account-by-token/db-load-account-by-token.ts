import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { Decrypter } from '../../protocols/criptography/decrypter';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: String, role?: String): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken);
    return new Promise(resolve => resolve(null));
  }
}
