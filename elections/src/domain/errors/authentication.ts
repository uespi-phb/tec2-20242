export class AuthenticationError extends Error {
  constructor() {
    super('Authentication failure')
  }
}
