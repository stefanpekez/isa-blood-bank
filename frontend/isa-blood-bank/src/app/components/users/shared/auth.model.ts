export interface LoginCredentials {
    email: string,
    password: string
}

export interface UserTokenState {
    accessToken: string,
    expiresIn: number,
    role: string,
    centerId: number,
    id: number
}