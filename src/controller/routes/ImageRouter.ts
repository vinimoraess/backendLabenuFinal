import express from "express"
import { ImageController } from "../ImageController"

export const imageRouter = express.Router ()
const imageController = new ImageController ()

imageRouter.post ("/create", imageController.createImage)
imageRouter.get ("/", imageController.getAllImages)
imageRouter.get ("/:id", imageController.getImageById)