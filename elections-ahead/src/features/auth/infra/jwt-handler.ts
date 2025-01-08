import { TokenDecrypter, TokenEncrypter } from "../application/contracts";
import jwt from 'jsonwebtoken'


export class JwtHandler implements TokenEncrypter, TokenDecrypter {

  constructor(
    private readonly secret: string,
    private readonly expirationInSecs: number,
  ) {}
  
  decrypt(token: string) {
    throw new Error("Method not implemented.");
  }

  encrypt(payload: any): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expirationInSecs })
  }
}
