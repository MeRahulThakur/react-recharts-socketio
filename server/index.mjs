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

const barData = [
  { name: "Page A", uv: Math.random()*4000, pv: Math.random()*2400, amt: 2400 },
  { name: "Page B", uv: Math.random()*3000, pv: Math.random()*1398, amt: 2210 },
  { name: "Page C", uv: Math.random()*2000, pv: Math.random()*9800, amt: 2290 },
  { name: "Page D", uv: Math.random()*2780, pv: Math.random()*3908, amt: 2000 },
  { name: "Page E", uv: Math.random()*1890, pv: Math.random()*4800, amt: 2181 },
  { name: "Page F", uv: Math.random()*2390, pv: Math.random()*3800, amt: 2500 }
];

function nextLetterInAlphabet(letter) {
  if (letter == "z") {
    return "a";
  } else if (letter == "Z") {
    return "A";
  } else {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
  }
}

server.on("connection", (socket) => {
  if(timeChnage) clearInterval(timeChnage)
  if(lineData.length > 5){
    lineData.reverse().pop()
    lineData.reverse()
  }
  lineData.push({ name: lineData[lineData.length - 1].name+1,x: Math.random() * 10, y: Math.random() * 10 })
  
  if(areaData.length > 7){
    areaData.reverse().pop()
    areaData.reverse()
  }
  areaData.push({
    "name": "Page "+(parseInt(areaData[areaData.length -1].name.split(" ")[1])+1),
    "uv": randomIntFromInterval(1000,3490),
    "pv": randomIntFromInterval(1000,3500),
    "amt": randomIntFromInterval(3500,5500)
  })

  if(barData.length > 6){ 
    barData.reverse().pop()
    barData.reverse()
  }
  barData.push({
    name: "Page "+(nextLetterInAlphabet(barData[barData.length -1].name.split(" ")[1])),
    uv: Math.random()*1890,
    pv: Math.random()*2990,
    amt: Math.random()*5000
  })
  setInterval(()=>{
    console.log('emiting')
    socket.emit("chartData", {lineData,areaData,barData}) 
    //socket.emit("areaData", areaData) 
  },6000)
  
})

httpServer.listen(port)