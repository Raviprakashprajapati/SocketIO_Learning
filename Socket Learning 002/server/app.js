import express from 'express';
import { Server } from 'socket.io';
import {createServer} from "http";
import cors from "cors"
const port = 3000

const app = express()
const server = createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials:true
    }
});

app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))


app.get("/",(req,res)=>{
    res.send("Welcome ")
})


io.use((socket,next)=>{
    
    next()

})

io.on("connection",(socket)=>{
    console.log("user connected ",socket.id)
    
    socket.on("message",(data)=>{
        console.log(data)
        // io.emit("receive-message",data) emit to all socket
        // socket.broadcast.emit("receive-message",data)  //emit to all socket except parent
        io.to(data.room).emit("receive-message",data)  //for particular room
    })
    //emit
    // socket.emit("welcome emit01",`first emit from server ${socket.id}`)
    //broadcast
    // socket.broadcast.emit("welcome emit01",`first emit from server ${socket.id}`)

    socket.on("join-room",(room)=>{
        socket.join(room)
        console.log("roomname ",room)
    })

    socket.on("disconnect", ()=>{
        console.log("User disconnected ",socket.id)
    })


})





server.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})