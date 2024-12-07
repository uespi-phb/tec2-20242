import { AccessToken } from '@/features/auth/domain/entities'

describe('AccessToken', () => {
  it('should create a valid AccessToken entity', () => {
    const token = 'any_access_token'

    const accessToken = new AccessToken(token)

    expect(accessToken.token).toBe(token)
  })
})
