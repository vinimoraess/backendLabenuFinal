import { Request, Response} from "express"
import { inputImageDTo } from "../business/entities/Image";
import { ImageBusiness } from "../business/ImageBusiness";
import { Authenticator } from "../business/services/authenticator";
import { IdGenerator } from "../business/services/idGenerator";
import { ImageDataBase } from "../data/ImageDataBase";
import { GenerateData } from "../data/model/ImageModel";

const imageBusiness = new ImageBusiness (

    new Authenticator,
    new ImageDataBase,
    new IdGenerator,
    new GenerateData
)

export class ImageController {

    public createImage = async(
        req: Request,
        res: Response
    ):Promise<void> => {
        try{
            const { authorization } = req.headers
            const { subtitle, author, file, collection } = req.body

            const input: inputImageDTo = {
                subtitle,
                author,
                file,
                collection
            }

            await imageBusiness.createImage (input, authorization as string)

            res.status (200) .send ({
                message: "Image created successfully"
            })
        }
        catch(error){
            res.status (error.statusCode) .send({
                error: error.message
            })
        }
    }
}