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
    console.log('Hurón servidor conectado a hurón cliente')
})

server.listen(4000) //Server es quien está escuchando
console.log('servidor conectado a las patitas de los hurones', 4000)