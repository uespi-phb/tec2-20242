import { User } from './user'

export interface Authentication {
  execute(input: AuthenticationInput): Promise<User>
}

export type AuthenticationInput = {
  email: string
  password: string
}
