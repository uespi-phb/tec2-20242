import { UserAccount } from '@/features/auth/domain/user-account'

describe('UserAccount Entity', () => {
  it('Should create an valid user account', () => {
    const name = 'any_name'
    const email = 'any_email@email.com'

    const userAccount = new UserAccount(name, email)

    expect(userAccount.name).toBe(name)
    expect(userAccount.email).toBe(email)
  })
})
