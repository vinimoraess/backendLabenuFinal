export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly nickname: string,
        public readonly email: string,
        public readonly password: string
    ){}
}

export interface authenticationData {
    id: string
}

export interface LoginInput {
    email?: string,
    nickname?: string,
    password: string
}

export interface signupInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string
}