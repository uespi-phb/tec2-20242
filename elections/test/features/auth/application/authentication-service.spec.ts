import { UserAccount } from '@/features/auth/domain/user-account'
import { mock } from 'jest-mock-extended'

class AuthenticationService {
  constructor(private readonly userAuth: UserAuth) {}

  execute(input: AuthenticationService.Input): void {
    const authResult = this.userAuth.execute({
      username: input.email,
      password: input.password,
    })
    if (authResult === false) {
      throw Error('Authentication error')
    }
  }
}

namespace AuthenticationService {
  export type Input = {
    email: string
    password: string
  }

  export type Output = UserAccount
}

//////////////////////////////

interface UserAuth {
  execute(input: UserAuth.Input): UserAuth.Output
}

namespace UserAuth {
  export type Input = {
    username: string
    password: string
  }

  export type Output = boolean
}

describe('AuthenticationService', () => {
  it('should call UserAuth.execute with correct parameters', () => {
    const email = 'anyemail@email.com'
    const password = 'any_password'

    const userAuth = mock<UserAuth>()
    userAuth.execute.mockReturnValue(true)
    const sut = new AuthenticationService(userAuth)

    sut.execute({ email, password })

    expect(userAuth.execute).toHaveBeenLastCalledWith({
      username: email,
      password: password,
    })
    expect(userAuth.execute).toHaveBeenCalledTimes(1)
  })

  it('should throw Error if UserAuth.execute returns false', () => {
    const email = 'anyemail@email.com'
    const password = 'any_password'

    const userAuth = mock<UserAuth>()
    userAuth.execute.mockReturnValue(false)
    const sut = new AuthenticationService(userAuth)

    expect(() => sut.execute({ email, password })).toThrow()
  })
})
