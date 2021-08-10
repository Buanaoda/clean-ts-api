import jwt from 'jsonwebtoken';
import { Encrypter, Decrypter } from '@/data/protocols/criptography';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    const accessToken = await jwt.sign({ id }, this.secret);
    return accessToken;
  }

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret);
    return value;
  }
}
