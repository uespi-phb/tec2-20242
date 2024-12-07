import { User } from '@/features/auth/domain/entities'

export interface Authentication {
  execute(input: AuthenticationInput): Promise<User>
}

export type AuthenticationInput = {
  email: string
  password: string
}
