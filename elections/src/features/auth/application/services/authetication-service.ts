import { AccessToken, User } from '@/features/auth/domain/entities'
import { AuthenticationError } from '@/features/auth/application/errors'
import { UserAuth } from '@/features/auth/application/contracts'
import { Authentication } from '@/features/auth/domain/contracts'
import {
  UserRepository,
  TokenEncrypter,
} from '@/features/auth/application/contracts'

export class AuthenticationService implements Authentication {
  constructor(
    private readonly userAuth: UserAuth,
    private readonly userRepo: UserRepository,
    private readonly tokenEncrypter: TokenEncrypter,
  ) {}

  async execute(input: AuthenticationService.Input): Promise<AccessToken> {
    try {
      const authData = await this.userAuth.signIn({
        username: input.email,
        password: input.password,
      })
      if (!authData) throw new AuthenticationError()
      const user = await this.userRepo.userByEmail(input.email)
      if (!user) {
        this.userRepo.save(authData)
      }
      const token = this.tokenEncrypter.encrypt({
        id: user?.id ?? parseInt(authData.id),
        email: user?.email ?? authData.email,
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
