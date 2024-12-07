import { User } from '@/features/auth/domain/entities'

export interface LoadUserRepository {
  userByEmail(email: string): Promise<User>
}
