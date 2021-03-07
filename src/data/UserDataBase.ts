import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static tablename = "spaceview_users"

    private static toUserModel(user: any): User{
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
            .insert({
                id: user.id,
                name: user.name,
                nickname: user.nickname,
                email: user.email,
                password: user.password
            }).into(UserDataBase.tablename)
        }
        catch(error){
            throw new CustomError(500, "An unexpected error ocurred, type all fields")
        }
    }
}