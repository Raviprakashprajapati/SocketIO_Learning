import { useEffect, useState } from 'react'
import './App.css'
import io from "socket.io-client";

function App() {

  const [message,setMessage] =useState("")
  const [chat,setChat] = useState([])

  const socket = io("http://localhost:5000")
  
  useEffect(()=>{

    socket.on("chat", (payload)=>{
      setChat((data)=>[...data,payload])
    })

  },[])

  function handleSubmit(e){
    e.preventDefault()

    socket.emit("chat",{message})
    setMessage("")

  }

  



  return (
    <>
    <h1>Hello Socket.io</h1>
    <br />
    <form onSubmit={handleSubmit}  >
      <input type="text" placeholder='send text' value={message} onChange={(e)=>setMessage(e.target.value)}  />
      <button type='submit' >Send</button>
    </form>
    <br />
    {
      chat.map((i,index)=>(
        <p key={index} >{i.message}</p>
      ))
    }


    </>
  )
}

export default App
