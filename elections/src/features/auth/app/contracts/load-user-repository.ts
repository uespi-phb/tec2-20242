import { UserAccount } from '../../domain/user-account'

export interface LoadUserRepository {
  userByEmail(email: string): Promise<UserAccount>
}
