import React, { useContext } from 'react'
import { Tooltip, CartesianGrid, AreaChart, ReferenceLine, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import ChartsContext from '../ChartsContext';

const Areac = () => {
  const {data:{areaData}} = useContext(ChartsContext)
  
  console.log('rendering Areachart')
  return (
    <div className="chart">
      <ResponsiveContainer>
      <AreaChart data={areaData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5  }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
        <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Areac