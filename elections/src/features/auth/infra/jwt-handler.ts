import { TokenEncrypter } from "../application/contracts";
import jwt from 'jsonwebtoken'


export class JwtHandler implements TokenEncrypter {

  constructor(
    private readonly secret: string,
    private readonly expiresInSecs: number,
  ) {}

  encrypt(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresInSecs })
  }
}