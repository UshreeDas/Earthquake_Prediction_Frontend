import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarLineCharts({ data }) {
  return (
    <div className="w-full h-96 mb-6">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year_eq" />
          <YAxis
            yAxisId="left"
            label={{
              value: "Depth (km)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { textAnchor: "middle", fill: "#3b82f6" }
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Magnitude",
              angle: -90,
              position: "insideRight",
              offset: 10,
              style: { textAnchor: "middle", fill: "#f97316" }
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="magnitude_eq"
            stroke="#f97316"
            name="Magnitude"
            dot={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="depth_eq"
            stroke="#3b82f6"
            name="Depth"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
