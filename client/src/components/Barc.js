import React,{useContext} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import ChartsContext from '../ChartsContext';

const Barc = () => {
  const {data:{barData}} = useContext(ChartsContext)
  console.log('rendering Barchart')
  return (
    <div className="chart">
      <ResponsiveContainer>
      <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default Barc