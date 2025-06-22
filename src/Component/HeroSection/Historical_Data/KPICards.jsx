export default function KPICards({ data }) {
  const totalEvents = data.length;

  const avgMagnitude = totalEvents
    ? (data.reduce((sum, d) => sum + d.magnitude_eq, 0) / totalEvents).toFixed(2)
    : "0.00";

  const avgDepth = totalEvents
    ? (data.reduce((sum, d) => sum + d.depth_eq, 0) / totalEvents).toFixed(2)
    : "0.00";

  const highRisk = data.filter(d => d.seismic_hazard_fault === "High").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-red-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">Total Earthquakes</p>
        <p className="text-2xl font-bold">{totalEvents}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">Average Magnitude</p>
        <p className="text-2xl font-bold">{avgMagnitude}</p>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">Average Depth</p>
        <p className="text-2xl font-bold">{avgDepth}</p>
      </div>

      <div className="bg-green-100 p-4 rounded-xl shadow">
        <p className="text-sm text-gray-600">High Risk Events</p>
        <p className="text-2xl font-bold">{highRisk}</p>
      </div>
    </div>
  );
}
