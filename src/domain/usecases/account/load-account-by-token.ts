import { AccountModel } from '@/domain/models/account';

export interface LoadAccountByToken {
  load (accessToken: String, role?: String): Promise<AccountModel>
}
