export interface LoginCredentials {
    email: string,
    password: string
}

export interface UserTokenState {
    accessToken: string,
    expiresIn: number
}