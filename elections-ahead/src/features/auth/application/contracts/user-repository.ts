import { User } from '@/features/auth/domain/entities'
import { UserAuth } from '@/features/auth/application/contracts'

export interface LoadUserRepository {
  userByEmail(email: string): Promise<User | undefined>
}

export interface SaveUserRepository {
  save(providerData: UserAuth.ProviderData): Promise<void>
}

export interface UserRepository extends LoadUserRepository, SaveUserRepository {
  //
}
