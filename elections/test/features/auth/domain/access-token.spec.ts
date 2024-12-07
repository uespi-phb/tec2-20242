import { AccessToken } from '@/features/auth/domain/access-token'

describe('AccessToken', () => {
  it('should create an AccessToken', () => {
    const token = 'any_access_token'

    const accessToken = new AccessToken(token)

    expect(accessToken.token).toBe(token)
  })
})
