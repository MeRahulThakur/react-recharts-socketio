import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'

const port = 4001;

const app = express()
const httpServer = http.createServer(app)

const server = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
  }
})

let timeChnage
const lineData = [
  { name: 1,x: Math.random() * 10, y: Math.random() * 10 },
  { name: 2,x: Math.random() * 10, y: Math.random() * 10 },
  { name: 3,x: Math.random() * 10, y: Math.random() * 10 },
  { name: 4,x: Math.random() * 10, y: Math.random() * 10 },
  { name: 5,x: Math.random() * 10, y: Math.random() * 10 }
];

const randomIntFromInterval = (min, max) =>  Math.floor(Math.random() * (max - min + 1) + min)

const areaData = [
  {
    "name": "Page 1",
    "uv": randomIntFromInterval(3090,4000),
    "pv": 2400,
    "amt": randomIntFromInterval(2000,2500)
  },
  {
    "name": "Page 2",
    "uv": randomIntFromInterval(2090,3000),
    "pv": 1398,
    "amt": randomIntFromInterval(2000,2500)
  },
  {
    "name": "Page 3",
    "uv": randomIntFromInterval(1090,2000),
    "pv": 9800,
    "amt": randomIntFromInterval(2000,2500)
  },
  {
    "name": "Page 4",
    "uv": randomIntFromInterval(2700,2780),
    "pv": 3908,
    "amt": randomIntFromInterval(2000,2500)
  },
  {
    "name": "Page 5",
    "uv": randomIntFromInterval(1850,1890),
    "pv": 4800,
    "amt": randomIntFromInterval(2000,2500)
  },
  {
    "name": "Page 6",
    "uv": randomIntFromInterval(2380,2390),
    "pv": 3800,
    "amt": randomIntFromInterval(2000,2500)
  },
  {
    "name": "Page 7",
    "uv": randomIntFromInterval(3480,3490),
    "pv": 4300,
    "amt": randomIntFromInterval(2000,2500)
  }
]

server.on("connection", (socket) => {
  if(timeChnage) clearInterval(timeChnage)
  if(lineData.length > 5){
    lineData.reverse().pop()
    lineData.reverse()
  }
  lineData.push({ name: lineData[lineData.length - 1].name+1,x: Math.random() * 10, y: Math.random() * 10 })
  if(areaData.length > 5){
    areaData.reverse().pop()
    areaData.reverse()
  }
  areaData.push({
    "name": "Page "+(parseInt(areaData[areaData.length -1].name.split(" ")[1])+1),
    "uv": randomIntFromInterval(1000,3490),
    "pv": randomIntFromInterval(1000,3500),
    "amt": randomIntFromInterval(3500,5500)
  })
  setInterval(()=>{
    console.log('emiting')
    socket.emit("lineData", lineData) 
    socket.emit("areaData", areaData) 
  },6000)
  
})

httpServer.listen(port)