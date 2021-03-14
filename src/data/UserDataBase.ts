import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static tablename = "spaceview_users"

    private static toUserModel (user: any): User{
        return new User(
            user.id,
            user.name,
            user.nickname,
            user.email,
            user.password
        )
    }

    public insertUser = async(
        user: User
    ):Promise<void> =>{
        try{
            await BaseDataBase.connection
            .insert ({
                id: user.id,
                name: user.name,
                nickname: user.nickname,
                email: user.email,
                password: user.password
            }).into (UserDataBase.tablename)
        }
        catch(error){
            throw new CustomError(500, "An unexpected error ocurred, type all fields")
        }
    }

    public selectUserByEmail = async(
        email: string
    ):Promise<User> =>{
        try{
            const result = await BaseDataBase.connection
            .select ('*')
            .from (UserDataBase.tablename)
            .where ({email})

            return UserDataBase.toUserModel (result[0])
        }
        catch(error){            
            throw new CustomError (406, "Invalid credentials")
        }
    }

    public selectUserByNickname = async(
        nickname: string
    ):Promise<User> =>{
        try{
            const result = await BaseDataBase.connection
            .select('*')
            .from(UserDataBase.tablename)
            .where({nickname})

            return UserDataBase.toUserModel (result[0])
        }
        catch(error){
            throw new CustomError (406, "Invalid credentials")
        }
    }
}