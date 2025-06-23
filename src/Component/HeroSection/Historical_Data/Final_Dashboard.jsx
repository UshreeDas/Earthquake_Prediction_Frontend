import React, { useEffect, useState } from "react";
import axios from "axios";
import KPICards from "./KPICards";
import FilterControls from "./FilterControls";
import BarLineCharts from "./BarLineCharts";
import HeatMap from "./HeatMap";
import PieByMagnitude from "./PieByMagnitude";
import BarByCategory from "./BarByCategory";
import DashboardSection from "../../../components/ui/DashboardSection";

export default function FinalDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/historical-data").then((res) => {
      const allData = res.data.data;
      const years = allData.map((d) => d.year_eq);
      const maxYear = Math.max(...years);
      const lastFiveYearsData = allData.filter(
        (d) => d.year_eq >= maxYear - 4
      );
      setData(allData);
      setFiltered(lastFiveYearsData);
    });
  }, []);

  useEffect(() => {
    let updated = [...data];

    if (selectedYear) {
      updated = updated.filter((d) => d.year_eq === Number(selectedYear));
    } else {
      const years = data.map((d) => d.year_eq);
      const maxYear = Math.max(...years);
      updated = updated.filter((d) => d.year_eq >= maxYear - 4);
    }

    if (selectedCategory === "Moderate") {
      updated = updated.filter((d) => d.magnitude_eq >= 4 && d.magnitude_eq < 5);
    } else if (selectedCategory === "Severe") {
      updated = updated.filter((d) => d.magnitude_eq >= 5 && d.magnitude_eq < 6);
    } else if (selectedCategory === "Strong") {
      updated = updated.filter((d) => d.magnitude_eq >= 6);
    }

    setFiltered(updated);
  }, [selectedYear, selectedCategory, data]);

  const years = [...new Set(data.map((d) => d.year_eq))].sort();

  const handleReset = () => {
    setSelectedYear("");
    setSelectedCategory("");
  };

  return (
    <div className="p-4 space-y-6">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-300 to-blue-500 py-4 mb-4 text-center rounded-md shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-extrabold text-white uppercase tracking-wider">
          Earthquake Data Dashboard
        </h1>
      </div>

      {/* Filters and Reset Button */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 mb-5 items-center">
  {/* Filter by Year */}
<DashboardSection>
  <div className=" gap-2">
    <FilterControls
      years={years}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
    />
  </div>
</DashboardSection>

{/* Magnitude Category */}
<DashboardSection className="bg-yellow-200">
  <div className="flex items-center gap-2"> 
    <span className="font-semibold text-lg">Magnitude Category:</span> {/* Text like Filter by Year */}
    <div className="flex gap-2">
      {["Moderate", "Severe", "Strong"].map((cat) => (
        <button
          key={cat}
          className={`rounded-md py-2 px-4 font-semibold ${
            selectedCategory === cat
              ? "bg-yellow-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() =>
            setSelectedCategory((prev) => (prev === cat ? "" : cat))
          }
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
</DashboardSection>

{/* Reset Button */}
<div className="flex justify-end self-start mt-6">
  <button
    onClick={handleReset}
    className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded shadow-[0_0_10px_rgba(0,0,0,0.2)]"
  >
    Reset Filters
  </button>
</div>
</div>

      {/* KPI Cards */}
      <KPICards data={filtered} />

      {/* Middle Grid: HeatMap and Pie Chart Inline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="shadow-[0_0_20px_rgba(0,0,0,0.15)] p-4 bg-orange-50 rounded-md flex items-center justify-center">
    <DashboardSection title="Seismic HeatMap" className="w-full">
      <div className="w-full aspect-[4/3]">
        <HeatMap data={filtered} />
      </div>
    </DashboardSection>
  </div>

  <div className="shadow-[0_0_20px_rgba(0,0,0,0.15)] p-4 bg-purple-50 rounded-md flex items-center justify-center">
    <DashboardSection title="Distribution by Magnitude" className="w-full">
      <div className="w-full aspect-[4/3]">
        <PieByMagnitude data={filtered} />
      </div>
    </DashboardSection>
  </div>
</div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Total Earthquakes of Last 5 Years */}
  <div className="shadow-[0_0_20px_rgba(0,0,0,0.15)] p-4 bg-green-50 rounded-md flex items-center justify-center">
    <DashboardSection title="Total Earthquakes of Last 5 Years" className="w-full">
      <div className="w-full aspect-[4/3]"> {/* Maintains 4:3 ratio */}
        <BarLineCharts data={filtered} />
      </div>
    </DashboardSection>
  </div>

  {/* Earthquake Counts by Magnitude Range (Last 5 Years) */}
  <div className="shadow-[0_0_20px_rgba(0,0,0,0.15)] p-4 bg-blue-50 rounded-md flex items-center justify-center">
    <DashboardSection title="Earthquake Counts by Magnitude Range (Last 5 Years)" className="w-full">
      <div className="w-full aspect-[4/3]"> {/* Same 4:3 ratio */}
        <BarByCategory data={filtered} />
      </div>
    </DashboardSection>
  </div>
</div>

    </div>
  );
}
