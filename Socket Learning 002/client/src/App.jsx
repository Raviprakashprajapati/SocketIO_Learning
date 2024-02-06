import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() {

  const socket = io("http://localhost:3000")
  const [message,setMessage] = useState("")
  const [room,setRoom] = useState("")
  const [socketId,setSocketId] = useState("")
  const [totalMessages,setTotalMessages] = useState([])
  const [roomName,setRoomName] = useState("")

  useEffect(()=>{

    socket.on("connect", ()=>{
      console.log("connected ",socket.id)
      setSocketId(socket.id)
    })

    socket.on("welcome emit01", (s)=>{
      console.log(s)
    });

    socket.on("receive-message",(data)=>{
      setTotalMessages((totalMessages)=>[...totalMessages, data])

      console.log(data)
    })

    return ()=>{
      socket.disconnect();
    }

  },[])

  console.log("total messages ",totalMessages)


  function handleSubmit(e){
    e.preventDefault()
    socket.emit("message",{message,room})
    setMessage("")
  }  


  function handleJoinRoom(e){
    e.preventDefault()
    socket.emit("join-room",roomName)
    setRoomName("")
  }



  return (
    <div className='bg-black text-white m-auto' >
     
     <br /><br /><br />
      <div className='m-auto bg-slate-700 text-white' >
        welcome to socket.io
      <br />
        {
          socketId
        }

        <form onSubmit={handleSubmit}  >
          <br /><br />
          <input type='text' value={message} 
          onChange={(e)=>setMessage(e.target.value)} placeholder='to everyone'  />
           <br />

          <input type='text' value={room} 
          onChange={(e)=>setRoom(e.target.value)} placeholder='For particular room'   />

          <button type='submit' > submit </button>

        </form>

        <br />
        {
          totalMessages.map((i,index)=>(
            <p key={index} >{i.message}</p>
          ))
        }

        <br /><br />
        <h5>Join ROOM</h5>

        <form onSubmit={handleJoinRoom} >
          <input type="text" value={roomName} onChange={(e)=>setRoomName(e.target.value)} placeholder='Enter join room' />
          <br />
          <button type='submit' >Join</button>
        </form>

      </div>

      
    </div>
  )
}

export default App
