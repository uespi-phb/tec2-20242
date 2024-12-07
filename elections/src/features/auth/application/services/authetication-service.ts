import { AccessToken, User } from '@/features/auth/domain/entities'
import { AuthenticationError } from '@/features/auth/application/errors'
import { UserAuth } from '@/features/auth/application/contracts'
import {
  LoadUserRepository,
  TokenEncrypter,
} from '@/features/auth/application/contracts'

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
