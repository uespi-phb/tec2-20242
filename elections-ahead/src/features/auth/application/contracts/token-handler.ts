export interface TokenEncrypter {
  encrypt(payload: any): string
}

export interface TokenDecrypter {
  decrypt(token: string): any
}

// export interface TokenHandler {
//   encrypt(payload: any): string
//   decrypt(token: string): any
// }

