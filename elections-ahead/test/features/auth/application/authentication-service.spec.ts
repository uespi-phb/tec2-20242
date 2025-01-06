import { mock, MockProxy } from 'jest-mock-extended'

import { AuthenticationError } from '@/features/auth/application/errors'
import { AuthenticationService } from '@/features/auth/application/services'
import { UserAuth } from '@/features/auth/application/contracts'
import { User, AccessToken } from '@/features/auth/domain/entities'
import {
  TokenEncrypter,
  UserRepository,
} from '@/features/auth/application/contracts'

describe(AuthenticationService.name, () => {
  let userId: number
  let userName: string
  let userEmail: string
  let userPassword: string
  let userPicture: string
  let providerData: UserAuth.ProviderData
  let fakeUser: User
  let fakeToken: AccessToken
  let userAuth: MockProxy<UserAuth>
  let userRepo: MockProxy<UserRepository>
  let tokenEncrypter: MockProxy<TokenEncrypter>
  let sut: AuthenticationService

  beforeAll(() => {
    userId = 12345
    userName = 'John Doe'
    userEmail = 'john.doe@email.com'
    userPassword = 'any_password'
    userPicture = 'https://any_user_picture_url'
    providerData = {
      provider: UserAuth.Provider.google,
      id: userId.toString(),
      email: userEmail,
      name: userName,
      picture: userPicture,
    }
    fakeUser = new User(userId, userName, userEmail)
    fakeToken = new AccessToken('any_access_token')
    userAuth = mock()
    userAuth.signIn.mockResolvedValue(providerData)
    userRepo = mock()
    userRepo.userByEmail.mockResolvedValue(fakeUser)
    tokenEncrypter = mock()
    tokenEncrypter.encrypt.mockReturnValue('any_access_token')
  })

  beforeEach(() => {
    sut = new AuthenticationService(userAuth, userRepo, tokenEncrypter)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call UserAuth.signIn() with correct parameters', async () => {
    await sut.execute({ email: userEmail, password: userPassword })

    expect(userAuth.signIn).toHaveBeenCalledWith({
      username: userEmail,
      password: userPassword,
    })
    expect(userAuth.signIn).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError if UserAuth.signIn() fails', async () => {
    userAuth.signIn.mockResolvedValueOnce(undefined)

    const promise = sut.execute({ email: userEmail, password: userPassword })

    await expect(promise).rejects.toThrow(AuthenticationError)
  })

  it('should throw AuthenticationError if UserAuth.signIn() throws', async () => {
    userAuth.signIn.mockRejectedValueOnce(new Error('any_signin_error'))

    try {
      await sut.execute({ email: userEmail, password: userPassword })
      fail('Should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(AuthenticationError)
    }
  })

  it('should call UserRepository.userByEmail() if UserAuth.signIn() succeeds', async () => {
    await sut.execute({ email: userEmail, password: userPassword })

    expect(userRepo.userByEmail).toHaveBeenCalledWith(userEmail)
    expect(userRepo.userByEmail).toHaveBeenCalledTimes(1)
  })

  it('should call UserRepository.save() if UserRepository.userByEmail() returns undefined', async () => {
    userRepo.userByEmail.mockResolvedValueOnce(undefined)

    await sut.execute({ email: userEmail, password: userPassword })

    expect(userRepo.save).toHaveBeenCalledWith(providerData)
    expect(userRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should return access token if AuthenticationService succeeds', async () => {
    const token = await sut.execute({
      email: userEmail,
      password: userPassword,
    })

    expect(token).toEqual(fakeToken)
  })

  it('should call TokenEncrypter.encrypt() with correct input if UserRepository.userByEmail returns data', async () => {
    await sut.execute({ email: userEmail, password: userPassword })

    expect(tokenEncrypter.encrypt).toHaveBeenCalledWith({
      id: fakeUser.id,
      email: fakeUser.email,
    })
    expect(tokenEncrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should call TokenEncrypter.encrypt() with correct input if UserRepository.userByEmail returns undefined', async () => {
    userRepo.userByEmail.mockResolvedValueOnce(undefined)

    await sut.execute({ email: userEmail, password: userPassword })

    expect(tokenEncrypter.encrypt).toHaveBeenCalledWith({
      id: providerData.id,
      email: providerData.email,
    })
    expect(tokenEncrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should throw AuthenticationError TokenEncrypter.encrypt() fails', async () => {
    tokenEncrypter.encrypt.mockImplementationOnce(() => {
      throw Error('any_token_encrypter_error')
    })

    const promise = sut.execute({ email: userEmail, password: userPassword })

    await expect(promise).rejects.toThrow(AuthenticationError)
  })
})
