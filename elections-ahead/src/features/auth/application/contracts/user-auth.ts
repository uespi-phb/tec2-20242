export interface UserAuth {
  execute(input: UserAuth.Input): Promise<UserAuth.Output>
}

export namespace UserAuth {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    accessToken: string
  }
}
