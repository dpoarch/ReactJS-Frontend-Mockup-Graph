import { Component } from "react";
import { DataItems } from "./DataItems";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

class LineChart_R extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={DataItems} margin={{ right: 100 }}>
          <CartesianGrid />
          <XAxis dataKey="CompanyName" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="employee" stroke="black" activeDot={{ r: 8 }} />
          <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default LineChart_R;
