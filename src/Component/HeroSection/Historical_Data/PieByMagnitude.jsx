import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#005F73", "#098486", "#EE9B00", "#001219"];

const COLOR_MAP = {
  "4.0 - 4.9": "bg-[#005F73]",
  "5.0 - 5.9": "bg-[#098486]",
  "6.0 - 6.9": "bg-[#EE9B00]",
  "7.0+": "bg-[#001219]",
};

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

  return (
    <div className="w-full h-56 flex flex-col justify-center items-center">
      {/* Pie Chart */}
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="75%"
              labelLine={false}
              label={false}
            >
              {chartData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-1 text-xs font-medium text-gray-700">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-full ${COLOR_MAP[entry.name]}`} />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
