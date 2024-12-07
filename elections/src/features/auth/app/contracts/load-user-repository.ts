import { User } from '../../domain/user'

export interface LoadUserRepository {
  userByEmail(email: string): Promise<User>
}
