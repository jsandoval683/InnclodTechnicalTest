export interface Login {
    user: string,
    password: string
}

export interface LoginResponse {
    userName: string,
    token: string,
    result: boolean,
    message: string
}