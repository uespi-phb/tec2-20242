import { UseCase } from '@/features/shared/domain/usecase'
import { UserAccount } from './user-account'

export interface Authentication
  extends UseCase<Authentication.Input, UserAccount> {
  execute(input: Authentication.Input): Promise<UserAccount>
}

export namespace Authentication {
  export type Input = {
    email: string
    password: string
  }
}
