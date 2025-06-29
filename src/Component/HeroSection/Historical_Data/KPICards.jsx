import {
  Activity,
  TrendingUp,
  ArrowDownCircle,
  AlertTriangle
} from "lucide-react";

export default function KPICards({ data }) {
  const totalEvents = data.length;

  const avgMagnitude = totalEvents
    ? (data.reduce((sum, d) => sum + d.magnitude_eq, 0) / totalEvents).toFixed(2)
    : "0.00";

  const avgDepth = totalEvents
    ? (data.reduce((sum, d) => sum + d.depth_eq, 0) / totalEvents).toFixed(2)
    : "0.00";

  const highRisk = data.filter((d) => d.seismic_hazard_fault === "High").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Total Earthquakes */}
      <div className="bg-[#005F73] text-white p-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg flex justify-between items-center">
        <div>
          <p className="text-sm">Total Earthquakes</p>
          <p className="text-2xl font-bold">{totalEvents}</p>
        </div>
        <Activity className="w-8 h-8" />
      </div>

      {/* Average Magnitude */}
      <div className="bg-[#098486] text-white p-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg flex justify-between items-center">
        <div>
          <p className="text-sm">Average Magnitude</p>
          <p className="text-2xl font-bold">{avgMagnitude}</p>
        </div>
        <TrendingUp className="w-8 h-8" />
      </div>

      {/* Average Depth */}
      <div className="bg-[#94D2BD] text-black p-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg flex justify-between items-center">
        <div>
          <p className="text-sm">Average Depth</p>
          <p className="text-2xl font-bold">{avgDepth}</p>
        </div>
        <ArrowDownCircle className="w-8 h-8" />
      </div>

      {/* High Risk Events */}
      <div className="bg-[#EFE2BE] text-black p-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg flex justify-between items-center">
        <div>
          <p className="text-sm">High Risk Events</p>
          <p className="text-2xl font-bold">{highRisk}</p>
        </div>
        <AlertTriangle className="w-8 h-8" />
      </div>
    </div>
  );
}
