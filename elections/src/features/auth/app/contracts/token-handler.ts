export interface TokenHandler {
  encrypt(payload: any): string
  decrypt(token: string): any
}
