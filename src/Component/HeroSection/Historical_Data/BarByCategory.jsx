import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";

// Custom bar colors based on ranges
const COLORS = {
  "4.0 - 4.9": "#098486", // Alloy Orange
  "5.0 - 5.9": "#EE9B00",
  "6.0 - 6.9": "#BB3E03", // Midnight Green
  "7.0+": "#BB3E03",
};

export default function BarByCategory({ data }) {
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

  const formattedData = Object.entries(bins).map(([range, count]) => ({
    range,
    count,
  }));

  return (
    <div className="w-full h-56">
      <ResponsiveContainer>
        <BarChart data={formattedData} barSize={40}>
          <XAxis dataKey="range">
            <Label
              value="Magnitude Range"
              position="insideBottom"
              offset={-5}
              style={{ textAnchor: "middle", fill: "#444" }}
            />
          </XAxis>
          <YAxis>
            <Label
              value="No. of Earthquakes"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle", fill: "#444" }}
            />
          </YAxis>
          <Tooltip />
          <Bar
            dataKey="count"
            label={{ position: "top", fill: "#000", fontSize: 12 }}
            isAnimationActive={false}
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.range] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
