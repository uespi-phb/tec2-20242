import { AccessToken } from "@/domain/models"

export interface Authentication {
  perform: (params: AuthenticationParams) => Promise<AuthenticationResult>
}

export type AuthenticationParams = {
  token: string
}

export type AuthenticationResult = AccessToken
