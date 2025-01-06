import { JwtTokenHandler } from '@/features/auth/infra'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe(JwtTokenHandler.name, () => {
  let payload: any
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtTokenHandler

  beforeEach(()=>{
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => 'any_json_web_token')

    payload = { key: 'any_key' }
    sut = new JwtTokenHandler()
  })

  it('Should call jwt.sign with correct input', () => {
    
  })
})
