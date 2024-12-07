import { mock, MockProxy } from 'jest-mock-extended'

import { AuthenticationError } from '@/features/auth/application/errors'
import { AuthenticationService } from '@/features/auth/application/services'
import { AccessToken, User } from '@/features/auth/domain/entities'
import {
  UserAuth,
  LoadUserRepository,
  TokenEncrypter,
} from '@/features/auth/application/contracts'

describe(AuthenticationService.name, () => {
  let userId: number
  let userName: string
  let userEmail: string
  let userPassword: string
  let fakeUser: User
  let fakeToken: AccessToken
  let userAuth: MockProxy<UserAuth>
  let loadUserRepo: MockProxy<LoadUserRepository>
  let tokenEncrypter: MockProxy<TokenEncrypter>
  let sut: AuthenticationService

  beforeAll(() => {
    userId = 12345
    userName = 'John Doe'
    userEmail = 'john.doe@email.com'
    userPassword = 'any_password'
    fakeUser = new User(userId, userName, userEmail)
    fakeToken = new AccessToken('any_access_token')
    userAuth = mock()
    userAuth.signIn.mockResolvedValue(true)
    loadUserRepo = mock()
    loadUserRepo.userByEmail.mockResolvedValue(fakeUser)
    tokenEncrypter = mock()
    tokenEncrypter.encrypt.mockReturnValue('any_access_token')
  })

  beforeEach(() => {
    sut = new AuthenticationService(userAuth, loadUserRepo, tokenEncrypter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('UserAuth', () => {
    it('should call signIn() with correct parameters', async () => {
      await sut.execute({ email: userEmail, password: userPassword })

      expect(userAuth.signIn).toHaveBeenCalledWith({
        username: userEmail,
        password: userPassword,
      })
      expect(userAuth.signIn).toHaveBeenCalledTimes(1)
    })

    it('should throw AuthenticationError if signIn() fails', async () => {
      userAuth.signIn.mockResolvedValueOnce(false)

      const promise = sut.execute({ email: userEmail, password: userPassword })

      await expect(promise).rejects.toThrow(AuthenticationError)
    })

    it('should throw AuthenticationError if signIn() throws', async () => {
      // ** Another way to throw exception in sync methods
      // userAuth.signIn.mockImplementationOnce(() => {
      //   throw new Error('any_signin_error')
      // })
      userAuth.signIn.mockRejectedValueOnce(new Error('any_signin_error'))

      try {
        await sut.execute({ email: userEmail, password: userPassword })
        fail('Should not reach this point')
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError)
      }
    })
  })

  describe('LoadUserRepository', () => {
    it('should call userByEmail() if UserAuth succeeds', async () => {
      await sut.execute({ email: userEmail, password: userPassword })

      expect(loadUserRepo.userByEmail).toHaveBeenCalledWith(userEmail)
      expect(loadUserRepo.userByEmail).toHaveBeenCalledTimes(1)
    })

    it('should throw AuthenticationError userByEmail() fails', async () => {
      tokenEncrypter.encrypt.mockImplementationOnce(() => {
        throw Error('any_token_encrypter_error')
      })

      const promise = sut.execute({ email: userEmail, password: userPassword })

      await expect(promise).rejects.toThrow(AuthenticationError)
    })

    it('should return access token if userByEmail() succeeds', async () => {
      const token = await sut.execute({
        email: userEmail,
        password: userPassword,
      })

      expect(token).toEqual(fakeToken)
    })
  })

  describe('TokenEncrypter', () => {
    it('should call encrypt() with correct input', async () => {
      await sut.execute({ email: userEmail, password: userPassword })

      expect(tokenEncrypter.encrypt).toHaveBeenCalledWith({
        id: userId,
        email: userEmail,
      })
      expect(tokenEncrypter.encrypt).toHaveBeenCalledTimes(1)
    })

    it('should throw AuthenticationError encrypt() fails', async () => {
      tokenEncrypter.encrypt.mockImplementationOnce(() => {
        throw Error('any_token_encrypter_error')
      })

      const promise = sut.execute({ email: userEmail, password: userPassword })

      await expect(promise).rejects.toThrow(AuthenticationError)
    })
  })
})
