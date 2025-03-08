import React from "react";
import moment from "moment";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface TrainingVolumeData {
  week: string;
  distance: number;
}

export const TrainingVolumeGraph: React.FunctionComponent<{ data: TrainingVolumeData[] }> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
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
          tickFormatter={(value) => `${value} km`}
        />
        <CartesianGrid vertical={false} />
        <Tooltip
          labelFormatter={(week) => `Week of: ${moment(week).format("MMM D, YYYY")}`}
          labelStyle={{ fontSize: 12, color: "gray" }}
          itemStyle={{ color: "rgb(74, 144, 226)" }}
          contentStyle={{ borderRadius: 10 }}
          formatter={(value: number) => [`${value} km`, "Distance"]}
        />
        <Bar
          dataKey="distance"
          fill="rgb(74, 144, 226)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}; 