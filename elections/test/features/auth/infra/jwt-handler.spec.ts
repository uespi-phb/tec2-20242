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
    fakeJwt.sign.mockImplementation(() => token)
    fakeJwt.verify.mockImplementation(() => payload)
  })

  beforeEach(() => {
    sut = new JwtHandler(secret, expiresInSecs)
  })

  
  describe('encrypt', () => {
    it('should call jwt.sign with correct input/output', () => {
    
      const result = sut.encrypt(payload)
      
      expect(jwt.sign).toHaveBeenCalledWith(payload, secret, { expiresIn: expiresInSecs })
      expect(jwt.sign).toHaveBeenCalledTimes(1)
      expect(result).toBe(token)
    })
  
    it('Should throw if jwt.sign throws (same error)', () => {
      const error = new Error('any_jwt_sign_error')
      fakeJwt.sign.mockImplementationOnce(() => { throw error })  
      try {
        sut.encrypt(payload)
      } catch(jwtError) {
        expect(jwtError).toEqual(error)
      }
      
      fakeJwt.sign.mockImplementationOnce(() => { throw error })
      expect(() => sut.encrypt(payload)).toThrow(error)
    })
  })

  describe('decrypt', () => {
    it('should call jwt.verify with correct input/output', () => {
    
      const result = sut.decrypt(token)
      console.log(result)
      
      expect(jwt.verify).toHaveBeenCalledWith(token, secret)
      expect(jwt.verify).toHaveBeenCalledTimes(1)
      expect(result).toEqual(payload)
    })

    it('Should throw if jwt.verify throws (same error)', () => {
      const error = new Error('any_jwt_verify_error')
      fakeJwt.verify.mockImplementationOnce(() => { throw error })  
      
      expect(() => sut.decrypt(token)).toThrow(error)
    })

    it('Should throw TokenExpiredError if token is expired', () => {
      const date = new Date()
      const error = new jwt.TokenExpiredError('Expired token', date)
      fakeJwt.verify.mockImplementationOnce(() => { throw error })  
      
      expect(() => sut.decrypt(token)).toThrow(error)
    })
  })
})
