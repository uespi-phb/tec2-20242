import { User } from '@/features/auth/domain/user'

describe(User.name, () => {
  it('Should create an valid user account', () => {
    const id = 12345
    const name = 'John Doe'
    const email = 'john.doe@email.com'

    const user = new User(id, name, email)

    expect(user.id).toBe(id)
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
  })
})
