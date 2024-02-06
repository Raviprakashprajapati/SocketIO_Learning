import express from "express"
import {createServer} from "http"
import { Server } from "socket.io";

const app = express()
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})

io.on("connection", (socket) => {

    console.log("What is socket ",socket)
    console.log("socket is active to be conneccted")

    socket.on("chat", (payload) =>{
        console.log("what is payload ",payload)
        
        io.emit("chat",payload)
    })

})

server.listen(5000, ()=>{
    console.log("server is listening on PORT 5000")
})

