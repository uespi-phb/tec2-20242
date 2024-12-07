export interface TokenEncrypter {
  encrypt(payload: any): string
}

export interface TokenDecrypter {
  decrypt(token: string): any
}
