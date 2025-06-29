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
    <div className="w-full h-70 mb-4">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year_eq" />
          
          {/* Y-axis for Depth (Left) */}
          <YAxis
            yAxisId="left"
            label={{
              value: "Depth (km)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: {
                textAnchor: "middle",
                fill: "#098486", // Teal
              },
            }}
          />

          {/* Y-axis for Magnitude (Right) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Magnitude",
              angle: -90,
              position: "insideRight",
              offset: 10,
              style: {
                textAnchor: "middle",
                fill: "#EE9B00", // Yellow Orange
              },
            }}
          />

          <Tooltip />
          <Legend />

          {/* Line for Magnitude */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="magnitude_eq"
            stroke="#EE9B00" // Yellow Orange
            name="Magnitude"
            dot={false}
          />

          {/* Line for Depth */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="depth_eq"
            stroke="#098486" // Teal
            name="Depth"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
