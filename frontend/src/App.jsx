import io from 'socket.io-client'
import React, { useState, useEffect } from 'react';



const socket = io("/")//Coloco dominio

function App() {
  const [message, setMesagge] = useState('');//Creo variable mensaje y variable para actualziar ese mensaje
  //HAcemos un arreglo de mensajes
  const [messages, setMesagges] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();//Evita que se refresque la página
    const newMessage = {
      body: message,
      from: 'Me'
    }
    //console.log(message);
    setMesagges([...messages, newMessage])//Agarro lo que envié y lo guardo, esto sirve para poder ver mi mensaje
    socket.emit('message', message) //socket envia dato
  };

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    }
  }, []);

  const receiveMessage = (message) =>
    setMesagges((state) => [...state, message]);
  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-centers'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2' >chat del Hurón</h1>
        <input
          type='text'
          placeholder='Write your message. . .'
          className='border-2 border-zinc-500 p-2 w-full text-black'
          onChange={(e) => setMesagge(e.target.value)} //Cuando usuario cambie valor recibo información y desde ahí actualizo mi información
        />
        <ul>
          {
            messages.map((message, i) => (
              <li key={i} className={
                `my-2 p-2 table rounded-md ${message.from == 'Me' ?
                  'bg-sky-700 ml-auto' : `bg-black ml-auto`}`
              }
              >
                <span className='text-xs text-slate-300 block'>
                  {message.from}
                </span>
                <span className='text-md' >
                  {message.body}
                </span>
              </li>
            ))
          }
        </ul>
      </form>




    </div >
  )
}

export default App