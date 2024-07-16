import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface ChartProps {
  data: any[];
  type: "line" | "bar";
  dataKey: string;
  xAxisDataKey: string;
  name: string;
  color: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  dataKey,
  xAxisDataKey,
  name,
  color,
}) => (
  <ResponsiveContainer width="100%" height={400}>
    {type === "line" ? (
      <LineChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={color} name={name} />
      </LineChart>
    ) : (
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} name={name} />
      </BarChart>
    )}
  </ResponsiveContainer>
);

export default Chart;
