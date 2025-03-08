import React from "react";
import moment from "moment";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

interface VelocityData {
  week: string;
  velocity: number;
}

export const AverageVelocityGraph: React.FunctionComponent<{ data: VelocityData[] }> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis
          axisLine={false}
          dataKey="week"
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(date) => moment(date).format("MMM D")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value} km/h`}
        />
        <CartesianGrid vertical={false} />
        <Tooltip
          labelFormatter={(week) => `Week of: ${moment(week).format("MMM D, YYYY")}`}
          labelStyle={{ fontSize: 12, color: "gray" }}
          itemStyle={{ color: "rgb(74, 144, 226)" }}
          contentStyle={{ borderRadius: 10 }}
          formatter={(value: number) => [`${value} km/h`, "Average Velocity"]}
        />
        <Line
          type="monotone"
          dataKey="velocity"
          stroke="rgb(74, 144, 226)"
          strokeWidth={3}
          dot={{ stroke: "rgb(74, 144, 226)", fill: "white", strokeWidth: 2, r: 4 }}
          activeDot={{ stroke: "rgb(74, 144, 226)", fill: "rgb(74, 144, 226)", strokeWidth: 2, r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}; 