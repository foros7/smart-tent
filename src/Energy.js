import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Ιαν", energy: 400 },
  { name: "Φεβ", energy: 300 },
  { name: "Μαρ", energy: 500 },
  { name: "Απρ", energy: 400 },
];

const Energy = () => {
  return (
    <div>
      <h2>Κατανάλωση Ενέργειας</h2>
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="energy" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Energy;
