export interface UserAuth {
  signIn(input: UserAuth.Input): Promise<UserAuth.Output>
}

export namespace UserAuth {
  export type Input = {
    username: string
    password: string
  }

  export type Output = boolean
}
