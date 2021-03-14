import { ImageDataBase } from "../data/ImageDataBase";
import { GenerateData } from "../data/model/ImageModel";
import { Images, inputImageDTo } from "./entities/Image";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/authenticator";
import { IdGenerator } from "./services/idGenerator";

export class ImageBusiness {

    constructor (
        private authenticator: Authenticator,
        private imageDataBase: ImageDataBase,
        private idGenerator: IdGenerator,
        private generateData: GenerateData,        
    ) {}

    public createImage = async(
        image: inputImageDTo,
        authorization: string
    ):Promise<void> =>{
        if (!image.subtitle || !image.author || !image.file || !image.collection){
            throw new CustomError (204, "Please type all values, subtitle, author, file, collection")
        }

        if (!authorization){
            throw new CustomError (204, "You must inform authorization token in headers")
        }

        const verifyToken = await this.authenticator.getTokenData (authorization)
        if (!verifyToken){
            throw new CustomError (404, "You must logged in")
        }

        const imageId = this.idGenerator.generate ()

        const imageData: Images = {
            id: imageId,
            subtitle: image.subtitle,
            author: image.author,
            date: this.generateData.getDate (),
            file: image.file,
            collection: image.collection
        }

        await this.imageDataBase.insertImage (imageData)
    }
}