import { UserAccount } from '../domain/user-account'
import { AuthenticationError } from './errors/authentication-error'
import { UserAuth } from './contracts/user-auth'
import { TokenHandler } from './contracts/token-handler'
import { LoadUserRepository } from './contracts/load-user-repository'

export class AuthenticationService {
  constructor(
    private readonly userAuth: UserAuth,
    private readonly loadUserRepo: LoadUserRepository,
    private readonly tokenHandler: TokenHandler,
  ) {}

  async execute(input: AuthenticationService.Input): Promise<UserAccount> {
    let user: UserAccount
    try {
      const authResult = this.userAuth.signIn({
        username: input.email,
        password: input.password,
      })
      if (authResult === false) throw new AuthenticationError()
      user = await this.loadUserRepo.userByEmail(input.email)
    } catch {
      throw new AuthenticationError()
    }
    return user
  }
}

export namespace AuthenticationService {
  export type Input = {
    email: string
    password: string
  }

  export type Output = UserAccount
}
