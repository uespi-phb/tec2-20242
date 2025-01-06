import { TokenEncrypter } from "../application/contracts";

export class JwtTokenHandler implements TokenEncrypter {
  encrypt(payload: any): string {
    throw new Error("Method not implemented.");
  } 
}
