import { JwtHandler } from '@/features/auth/infra'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe(JwtHandler.name, () => {
  let secret: string
  let token: string
  let expirationInSecs: number
  let payload: any
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtHandler

  beforeAll(() => {
    secret = 'any_jwt_secret'
    token = 'any_json_web_token' 
    expirationInSecs = 60
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => token)
    payload = { key: 'any_key' }
  })

  describe('encrypt', () => {
    beforeEach(()=>{
      sut = new JwtHandler(secret, expirationInSecs)
    })

    it('Should call jwt.sign with correct input/output', () => {
      const result = sut.encrypt(payload)

      expect(fakeJwt.sign).toHaveBeenCalledWith(payload, secret, {expiresIn: expirationInSecs } )
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
      expect(result).toBe(token)
    })

    it('Should throw if jwt.sign throws (same error)', () => {
      const error = new Error('any_jwt_error')
      fakeJwt.sign.mockImplementationOnce(() => { throw error })
      
      expect(() => sut.encrypt(payload)).toThrow(error)
      
      fakeJwt.sign.mockImplementationOnce(() => { throw error })
      try {
        sut.encrypt(payload)
        console.log('>>>>>>>>>>>>>>>>>>')
        fail('Should not reach this point.')
      } catch(jwtError) {
        expect(jwtError).toEqual(error)
      }
    })
  })

  describe('decrypt', () => {
    beforeEach(()=>{
      sut = new JwtHandler(secret, expirationInSecs)
    })

    it('Should call jwt.verify with correct input/output', () => {
      const result = sut.encrypt(payload)

      expect(fakeJwt.sign).toHaveBeenCalledWith(payload, secret, {expiresIn: expirationInSecs } )
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
      expect(result).toBe(token)
    })
  })
})
