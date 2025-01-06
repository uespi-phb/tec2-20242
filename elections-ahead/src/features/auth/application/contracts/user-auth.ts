export interface UserAuth {
  signIn(input: UserAuth.Input): Promise<UserAuth.ProviderData | undefined>
}

export namespace UserAuth {
  export type Input = {
    username: string
    password: string
  }

  export enum Provider {
    facebook,
    google,
    instragram,
    linkedin,
    tweeter,
  }

  export type ProviderData = {
    provider: Provider
    id: string
    email: string
    name: string
    picture?: string
  }
}
