import { Component } from "react";
import { DataItems } from "./DataItems";
import {
  RadarChart,
  PolarGrid,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

class RadarChart_R extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <RadarChart outerRadius={90} width={730} height={250} data={DataItems}>
          <PolarGrid />
          <PolarAngleAxis dataKey="CompanyName" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="employee"
            dataKey="employee"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="fees"
            dataKey="fees"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

export default RadarChart_R;
