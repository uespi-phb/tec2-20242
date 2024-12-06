import { AuthenticationError } from '@/features/auth/app/errors/authentication-error'
import { AuthenticationService } from '@/features/auth/app/authetication-service'
import { UserAuth } from '@/features/auth/app/contracts/user-auth'
import { mock, MockProxy } from 'jest-mock-extended'
import { TokenHandler } from '@/features/auth/app/contracts/token-handler'
import { LoadUserRepository } from '@/features/auth/app/contracts/load-user-repository'

describe('AuthenticationService', () => {
  let email: string
  let password: string
  let userAuth: MockProxy<UserAuth>
  let loadUserRepo: MockProxy<LoadUserRepository>
  let tokenHandler: MockProxy<TokenHandler>
  let sut: AuthenticationService

  beforeAll(() => {
    email = 'any.email@email.com'
    password = 'any_password'
    userAuth = mock()
    loadUserRepo = mock()
    tokenHandler = mock()
    userAuth.signIn.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new AuthenticationService(userAuth, loadUserRepo, tokenHandler)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call UserAuth.signIn() with correct parameters', () => {
    sut.execute({ email, password })

    expect(userAuth.signIn).toHaveBeenCalledWith({
      username: email,
      password: password,
    })
    expect(userAuth.signIn).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if UserAuth.signIn() fails', () => {
    userAuth.signIn.mockReturnValueOnce(false)

    expect(() => sut.execute({ email, password })).toThrow(AuthenticationError)
  })

  it('should throw AuthenticationError if UserAuth.signIn() throws', () => {
    userAuth.signIn.mockImplementationOnce(() => {
      throw new Error('any_signin_error')
    })

    expect(() => sut.execute({ email, password })).toThrow(AuthenticationError)
  })

  it('should call LoadUserRepository.userByEmail() if UserAuth.signIn() succeeds', async () => {
    const user = await sut.execute({ email, password })

    expect(loadUserRepo.userByEmail).toHaveBeenCalledWith(email)
    expect(loadUserRepo.userByEmail).toHaveBeenCalledTimes(1)
    expect(user.email).toBe(email)
  })
})
