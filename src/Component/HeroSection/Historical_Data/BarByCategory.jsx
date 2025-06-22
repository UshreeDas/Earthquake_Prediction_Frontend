import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BarByCategory({ data }) {
  const bins = {
    "4.0 - 4.9": 0, "5.0 - 5.9": 0, "6.0 - 6.9": 0, "7.0+": 0,
  };
  data.forEach(d => {
    if (d.magnitude_eq >= 7.0) bins["7.0+"]++;
    else if (d.magnitude_eq >= 6.0) bins["6.0 - 6.9"]++;
    else if (d.magnitude_eq >= 5.0) bins["5.0 - 5.9"]++;
    else if (d.magnitude_eq >= 4.0) bins["4.0 - 4.9"]++;
  });

  const formattedData = Object.entries(bins).map(([range, count]) => ({ range, count }));

  return (
    <div className="w-full h-80 mt-6">
      <ResponsiveContainer>
        <BarChart data={formattedData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#a855f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
