import { Component } from "react";
import { DataItems } from "./DataItems";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

class BarChart_R extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart width={600} height={600} data={DataItems}>
          <Bar dataKey="employee" fill="green" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="employee" />
          <YAxis dataKey="fees" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BarChart_R;
