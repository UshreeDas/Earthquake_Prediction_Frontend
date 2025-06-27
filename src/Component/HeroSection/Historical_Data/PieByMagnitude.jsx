import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#60a5fa", "#1e3a8a", "#f97316", "#9333ea"];

export default function PieByMagnitude({ data }) {
  const bins = {
    "4.0 - 4.9": 0,
    "5.0 - 5.9": 0,
    "6.0 - 6.9": 0,
    "7.0+": 0,
  };

  data.forEach((d) => {
    if (d.magnitude_eq >= 7.0) bins["7.0+"]++;
    else if (d.magnitude_eq >= 6.0) bins["6.0 - 6.9"]++;
    else if (d.magnitude_eq >= 5.0) bins["5.0 - 5.9"]++;
    else if (d.magnitude_eq >= 4.0) bins["4.0 - 4.9"]++;
  });

  const chartData = Object.entries(bins)
    .map(([name, value]) => ({ name, value }))
    .filter((d) => d.value > 0);

  const renderCustomLabel = ({ name, percent, x, y }) => {
    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  return (
    <div className="w-full h-96 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="40%"  
            cy="50%"
            outerRadius="85%" // enlarge pie
            labelLine={false}
            label={false}
          >
            {chartData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            verticalAlign="middle" 
            align="right" 
            layout="vertical"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
