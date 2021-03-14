import { Request, Response} from "express"
import { LoginInput, signupInputDTO } from "../business/entities/User";
import { Authenticator } from "../business/services/authenticator";
import { HashManager } from "../business/services/hashManager";
import { IdGenerator } from "../business/services/idGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";

const userBusiness = new UserBusiness(
    new IdGenerator,
    new HashManager,
    new Authenticator,
    new UserDataBase
)

export class UserController {
    
    public signup = async(
        req: Request,
        res: Response
    ):Promise<void> =>{
        try{
            const input: signupInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.createUser (input)
            res.status (200).send ({
                message: "User created successfully !",
                token
            })
        }
        catch(error){
            res.status (error.statusCode || 400).send ({
                error: error.message
            })
        }
    }

    public login = async(
        req: Request,
        res: Response
    ):Promise<void> =>{
        try{
            const loginData: LoginInput={
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await userBusiness.getUser (loginData)
            
            res.status (200).send ({
                message: "User logged in",
                token
            })
        }
        catch(error){
            res.status (error.statusCode).send ({
                error: error.message
            })
        }
    }
}
