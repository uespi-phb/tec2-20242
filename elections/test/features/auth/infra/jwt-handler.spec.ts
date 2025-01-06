import { JwtHandler }  from "@/features/auth/infra/jwt-handler"
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe(JwtHandler.name, () => {
  let payload : any
  let secret : string
  let expiresInSecs : number
  let token : string
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtHandler 

  beforeAll(() => {
    payload = { key1: 'any_key1', key2: 'any_key2' }
    secret = 'any_secret'
    expiresInSecs = 3600
    token = 'any_jwt_token' 
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JwtHandler(secret, expiresInSecs)
  })

  it('should call jwt.sign with correct input/output', () => {
    fakeJwt.sign.mockImplementation(() => token)

    const result = sut.encrypt(payload)

    expect(jwt.sign).toHaveBeenCalledWith(payload, secret, { expiresIn: expiresInSecs })
    expect(jwt.sign).toHaveBeenCalledTimes(1)
    expect(result).toBe(token)
  })
})
