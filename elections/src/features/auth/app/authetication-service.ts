import { User } from '../domain/user'
import { AuthenticationError } from './errors/authentication-error'
import { UserAuth } from './contracts/user-auth'
import { TokenEncrypter } from './contracts/token-handler'
import { LoadUserRepository } from './contracts/load-user-repository'
import { AccessToken } from '../domain/access-token'

export class AuthenticationService {
  constructor(
    private readonly userAuth: UserAuth,
    private readonly loadUserRepo: LoadUserRepository,
    private readonly tokenEncrypter: TokenEncrypter,
  ) {}

  async execute(input: AuthenticationService.Input): Promise<AccessToken> {
    try {
      const authResult = await this.userAuth.signIn({
        username: input.email,
        password: input.password,
      })
      if (authResult === false) throw new AuthenticationError()
      const user = await this.loadUserRepo.userByEmail(input.email)
      const token = this.tokenEncrypter.encrypt({
        id: user.id,
        email: user.email,
      })
      return new AccessToken(token)
    } catch {
      throw new AuthenticationError()
    }
  }
}

export namespace AuthenticationService {
  export type Input = {
    email: string
    password: string
  }

  export type Output = User
}
