import io from 'socket.io-client'
import React from "react";

const socket = io("/")//Coloco dominio

function App() {
  return (
    <div>
      Hola hurones del mundo
    </div>
  )
}

export default App