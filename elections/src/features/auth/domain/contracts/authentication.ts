import { AccessToken, User } from '@/features/auth/domain/entities'

export interface Authentication {
  execute(input: AuthenticationInput): Promise<AccessToken>
}

export type AuthenticationInput = {
  email: string
  password: string
}
