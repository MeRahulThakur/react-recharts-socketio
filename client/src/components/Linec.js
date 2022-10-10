import React,{ useContext } from 'react'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts'
import ChartsContext from '../ChartsContext';

const Linec = () => {
  const {data:{lineData}} = useContext(ChartsContext)
  
  return (
    <div className="chart">
      <ResponsiveContainer>
    <LineChart
          data={lineData}
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