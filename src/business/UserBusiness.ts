import { UserDataBase } from "../data/UserDataBase";
import { signupInputDTO } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/authenticator";
import { HashManager } from "./services/hashManager";
import { IdGenerator } from "./services/idGenerator";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        public authenticator: Authenticator,
        private userDataBase: UserDataBase
    ){}

    public createUser = async(
        user: signupInputDTO
    ):Promise<string> =>{
        if(!user.name || !user.nickname || !user.email || !user.password){
            throw new CustomError(204,"Fill all the fields, name, nickname, email and password correctly !")
        }

        if(!user.email.includes("@")) {
            throw new CustomError(404,"Invalid Email")
        }

        if(user.password.length < 6){
            throw new CustomError(411, "Enter at least 6 characters")            
        }

        const id: string = this.idGenerator.generate()
        const hashPassword = await this.hashManager.hash(user.password)

        const input = {
            id,
            name: user.name,
            nickname: user.nickname,
            email: user.nickname,
            password: hashPassword
        }

        await this.userDataBase.insertUser(input)
        const accessToken = this.authenticator.generateToken({id})

        return accessToken
    }
}