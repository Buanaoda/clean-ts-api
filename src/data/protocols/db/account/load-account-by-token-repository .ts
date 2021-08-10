import { AccountModel } from '@/domain/models/account';

export interface LoadAccountByTokenRepository {
  loadByToken (token: String, role?: String): Promise<AccountModel>
}
