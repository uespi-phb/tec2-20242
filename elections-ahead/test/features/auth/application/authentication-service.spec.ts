import { AuthenticationService } from '@/features/auth/application/authetication-service'
import { UserAuth } from '@/features/auth/application/contracts/user-auth'

import { mock } from 'jest-mock-extended'

describe('AuthenticationService', () => {
  it('should call UserAuth with correct input', async () => {
    const input = {
      email: 'email@email.com',
      password: 'any_password',
    }

    const userAuthSpy = mock<UserAuth>()
    userAuthSpy.execute.mockResolvedValue({ accessToken: 'any_token' })
    const sut = new AuthenticationService(userAuthSpy)

    await sut.execute(input)

    expect(userAuthSpy.execute).toHaveBeenCalledWith(input)
    expect(userAuthSpy.execute).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if UserAuth returns undefined', async () => {
    const input = {
      email: 'email@email.com',
      password: 'any_password',
    }
    const userAuthSpy = mock<UserAuth>()

    const sut = new AuthenticationService(userAuthSpy)

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(Error)
  })
})
