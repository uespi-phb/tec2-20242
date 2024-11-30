import { Authentication } from '../domain/authentication'
import { UserAuth } from './contracts/user-auth'

export class AuthenticationService {
  constructor(private readonly userAuth: UserAuth) {}

  async execute(input: Authentication.Input): Promise<void> {
    const authToken = this.userAuth.execute(input)
    if (authToken == undefined) {
      throw new Error('Authentication error')
    }
  }
}
