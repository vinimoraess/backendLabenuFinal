import express from "express"
import cors from "cors"
import {AddressInfo} from "net"
import { userRouter } from "./controller/routes/UserRouter"
import { imageRouter } from "./controller/routes/ImageRouter"

const app = express ()
app.use (express.json ())
app.use (cors ())

app.use ("/users", userRouter)
app.use ("/images", imageRouter)

const server = app.listen(process.env.PORT || 3003, ()=>{
    if(server){
        const addres = server.address () as AddressInfo
        console.log (`Server is running in http://localhost:${addres.port}`)
    } else {
        console.log ('Failure upon starting server')
    }
})
