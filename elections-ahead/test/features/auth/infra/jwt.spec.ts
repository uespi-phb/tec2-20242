import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'any_token')
}))

it('sign', () => {
  const payload = { key: 'any_key' }

  const token = jwt.sign(payload, 'any_secret')
  console.log(token)
})