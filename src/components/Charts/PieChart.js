import { Component } from "react";
import { DataItems } from "./DataItems";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

class PieChart_R extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <PieChart width={730} height={730}>
          <Pie
            data={DataItems}
            dataKey="employee"
            nameKey="employee"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          />
          <Pie
            data={DataItems}
            dataKey="fees"
            nameKey="fees"
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default PieChart_R;
