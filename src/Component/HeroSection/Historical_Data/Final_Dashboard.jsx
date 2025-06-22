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
    <div className="p-4 bg-white">
      {/* Banner */}
      <div className="w-full bg-blue-200 py-4 mb-4 text-center rounded-md shadow">
        <h1 className="text-3xl font-bold text-red-800 uppercase tracking-wide">
          Earthquake Data Dashboard
        </h1>
      </div>

      {/* Filters Under Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
        <DashboardSection title="Filter by Year" className="bg-pink-200">
          <FilterControls
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </DashboardSection>

        <DashboardSection title="Magnitude Category" className="bg-yellow-200">
          <div className="grid grid-cols-3 gap-2">
            {["Moderate", "Severe", "Strong"].map((cat) => (
              <button
                key={cat}
                className={`rounded-md py-2 font-semibold ${
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
        </DashboardSection>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* KPI Cards */}
      <KPICards data={filtered} />

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <DashboardSection title="Seismic HeatMap" className="bg-orange-100">
          <HeatMap data={filtered} />
        </DashboardSection>

        <DashboardSection title="Distribution by Magnitude" className="bg-pink-100">
          <PieByMagnitude data={filtered} />
        </DashboardSection>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardSection title="Total Earthquakes of Last 5 Years" className="bg-green-100">
          <BarLineCharts data={filtered} />
        </DashboardSection>

        <DashboardSection title="Earthquake Counts by Magnitude Range (Last 5 Years)" className="bg-green-100">
          <BarByCategory data={filtered} />
        </DashboardSection>
      </div>
    </div>
  );
}
