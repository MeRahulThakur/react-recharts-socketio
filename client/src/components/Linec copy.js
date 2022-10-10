import React,{ useState, useEffect, useCallback } from 'react'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts'
import SocketIOClient from 'socket.io-client';

const Linec = () => {
  const [data, setData] = useState([]);

  const getSocketMessage = useCallback(()=>{
    const socket = SocketIOClient("http://127.0.0.1:4001/")
    socket.on("lineData", (data) => {
      console.log('listening lineData')
      setData(data)
      this.render()
    })
  },[])

  useEffect(() => {
    getSocketMessage()
  }, [getSocketMessage])
  console.log('rendering Linechart')
  return (
    <div className="chart">
      <ResponsiveContainer>
    <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
        </LineChart>
        </ResponsiveContainer>
        </div>
  )
}

export default Linec