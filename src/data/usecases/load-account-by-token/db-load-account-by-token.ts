import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository ';
import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { Decrypter } from '../../protocols/criptography/decrypter';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: String, role?: String): Promise<AccountModel> {
    const decryptedToken = await this.decrypter.decrypt(accessToken);
    await this.loadAccountByTokenRepository.loadByToken(decryptedToken, role);
    return null;
  }
}
