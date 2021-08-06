import jwt from 'jsonwebtoken';
import { Encrypter, Decrypter } from '../../../data/protocols/criptography';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    const accessToken = await jwt.sign({ id }, this.secret);
    return accessToken;
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret);
    return null;
  }
}
