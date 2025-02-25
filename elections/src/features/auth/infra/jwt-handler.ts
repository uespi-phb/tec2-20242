import { TokenDecrypter, TokenEncrypter } from "../application/contracts";
import jwt from 'jsonwebtoken'


export class JwtHandler implements TokenEncrypter, TokenDecrypter {

  constructor(
    private readonly secret: string,
    private readonly expiresInSecs: number,
  ) {}

  decrypt(token: string): any {
    const { iat, exp, ...payload } = jwt.verify(token, this.secret) as jwt.JwtPayload
    return payload
  }

  encrypt(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresInSecs })
  }
}
