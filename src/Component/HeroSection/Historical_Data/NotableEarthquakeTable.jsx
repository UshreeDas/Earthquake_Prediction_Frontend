import React from "react";
import dayjs from "dayjs";

export default function NotableEarthquakeTable({ data, isFiltered }) {
  const tableData = isFiltered
    ? data
    : data
        .filter((d) => d.magnitude_eq >= 6.5)
        .sort((a, b) => new Date(b.time_eq) - new Date(a.time_eq));

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col h-full text-xs max-w-[420px]">
      <h2 className="text-[14px] font-semibold text-[#001219] px-3 pt-3 pb-1">
        {isFiltered ? "Filtered Earthquake Events" : "Notable Historical Earthquakes"}
      </h2>

      <div className="overflow-y-auto">
        <table className="w-full table-auto text-left text-gray-700">
          <thead className="bg-gray-100 uppercase font-semibold border-b">
            <tr className="text-[11px]">
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Location</th>
              <th className="px-2 py-2">Lat</th>
              <th className="px-2 py-2">Long</th>
              <th className="px-2 py-2">Mag</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((eq, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-[11px]">
                <td className="px-2 py-2">{dayjs(eq.time_eq).format("MMM D, YYYY")}</td>
                <td className="px-2 py-2 truncate max-w-[120px]">
                  {eq.state_fault
                    ? `${eq.state_fault}, India`
                    : eq.area_fault || "Unknown"}
                </td>
                <td className="px-2 py-2">{eq.latitude_eq.toFixed(2)}</td>
                <td className="px-2 py-2">{eq.longitude_eq.toFixed(2)}</td>
                <td
                  className={`px-2 py-2 font-bold ${
                    eq.magnitude_eq >= 7 ? "text-[#BB3E03]" : "text-[#EE9B00]"
                  }`}
                >
                  {eq.magnitude_eq.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
