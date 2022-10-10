//socket app
import React, { useState, useEffect, useCallback } from 'react';
import Areac from './components/Areac';
import Linec from './components/Linec';
import './App.css';
import Barc from './components/Barc';
import ChartsContext from './ChartsContext';
import SocketIOClient from 'socket.io-client';

function App() {
  const [data, setData] = useState({ areaData: [], barData: [], lineData: [] })


  const getSocketMessage = useCallback(() => {
    console.log('getSocketMessage')
    const socket = SocketIOClient("http://127.0.0.1:4001/")
    socket.on("chartData", (newData) => {
      console.log('listening data-',newData)
      setData({...data,lineData:newData.lineData,areaData:newData.areaData,barData:newData.barData})
      this.render()
    })
  },[])

  useEffect(() => {
    getSocketMessage()
  }, [getSocketMessage])

  return (
    <div id="container" className="App wrapper">
      <ChartsContext.Provider value={{data,setData}}>
        <section id="charts">
          <Linec />
          <Areac />
          <Barc />
        </section>
      </ChartsContext.Provider>
    </div>
  );
}

export default App
