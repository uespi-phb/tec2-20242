import { UserAccount } from './user-account'

export interface Authentication {
  execute(input: AuthenticationInput): Promise<UserAccount>
}

export type AuthenticationInput = {
  email: string
  password: string
}
