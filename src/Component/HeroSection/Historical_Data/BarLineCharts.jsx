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
          <XAxis dataKey="year_eq" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="magnitude_eq" stroke="#f97316" name="Magnitude" />
          <Line type="monotone" dataKey="depth_eq" stroke="#3b82f6" name="Depth" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
