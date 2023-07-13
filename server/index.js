//importo express
import { Socket } from "dgram";
import express from "express";
//Importamos servidor de http
import http from 'http'
//Creamos sockets
import { Server as SocketServer } from 'socket.io'
const app = express()
const server = http.createServer(app) // Servidor para http
const io = new SocketServer(server) // servidor de sockets

io.on('connection', Socket => {
    console.log(Socket.id);
    //Preparo mi servidor para recibir eventos
    Socket.on('message', (body) => {
        console.log(body)
        Socket.broadcast.emit('message', {
            body,
            from: Socket.id.slice(6)
        })//Envio evento al frontend
        //console.log(data)
    }) //Cuando se ejecute el evento message, vamos a reciir datos y a verlos con console log
})

server.listen(4000) //Server es quien está escuchando
console.log('servidor conectado a las patitas de los hurones', 4000)