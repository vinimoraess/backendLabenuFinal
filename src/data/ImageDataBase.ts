import { Images } from "../business/entities/Image"
import { CustomError } from "../business/error/CustomError"
import { BaseDataBase } from "./BaseDataBase"

export class ImageDataBase extends BaseDataBase {

    private static tablename = "spaceview_image"

    private static toImageModel (image: any): Images{
        return new Images (
            image.id,
            image.subtitle,
            image.author,
            image.date,
            image.file,
            image.collection
        )
    }

    public insertImage = async(
        image: Images
    ):Promise<void> =>{
        try{
            await BaseDataBase.connection
            .insert ({
                id: image.id,
                subtitle: image.subtitle,
                author: image.author,
                date: image.date,
                file: image.file,
                collection: image.collection
            })
            .into (ImageDataBase.tablename)
        }
        catch(error){
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }

    public selectAllImages = async(
        
    ):Promise<Images> =>{
        try{
            const result = await BaseDataBase.connection
            .select('*')
            .from(ImageDataBase.tablename)

            return ImageDataBase.toImageModel (result[0])
        }
        catch(error){
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }

    public selectImageById = async(
        id: string
    ):Promise<Images> =>{
        try{
            const result = await BaseDataBase.connection
            .select('*')
            .from(ImageDataBase.tablename)
            .where({id})

            return ImageDataBase.toImageModel (result[0])
        }
        catch(error){
            throw new CustomError(500, "An unexpected error ocurred")
        }
        
    }
}