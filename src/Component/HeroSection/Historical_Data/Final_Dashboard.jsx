import React, { useEffect, useState } from "react";
import axios from "axios";
import KPICards from "./KPICards";
import FilterControls from "./FilterControls";
import BarLineCharts from "./BarLineCharts";
import HeatMap from "./HeatMap";
import PieByMagnitude from "./PieByMagnitude";
import BarByCategory from "./BarByCategory";
import NotableEarthquakeTable from "./NotableEarthquakeTable";
import DashboardSection from "../../../components/ui/DashboardSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // adjust path if needed

export default function FinalDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/historical-data").then((res) => {
      const allData = res.data.data;
      const years = allData.map((d) => d.year_eq);
      const maxYear = Math.max(...years);
      const lastFiveYearsData = allData.filter((d) => d.year_eq >= maxYear - 4);
      setData(allData);
      setFiltered(lastFiveYearsData);
    }).finally(() => {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner text="Loading Earthquake Dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Banner */}


      {/* Filters */}
      <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-2 mb-5">
        <div className="text-2xl font-bold text-gray-800 mb-4">
          Earthquake Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Filter by Year:</span>
          <FilterControls
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Magnitude Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-9 px-4 border rounded-md font-semibold text-black bg-white border-black-300 hover:border-red-400 focus:outline-none"
          >
            <option value="">All</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Strong">Strong</option>
          </select>
        </div>

        <div className="flex">
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#EE9B00" }}
            className="h-9 px-6 hover:brightness-110 text-white font-semibold rounded shadow-[0_0_10px_rgba(0,0,0,0.2)]"
          >
            Reset Filters
          </button>

        </div>
      </div>

      {/* KPI Cards */}
      <KPICards data={(selectedYear || selectedCategory) ? filtered : data} />

      {/* 2-Column Grid: Bar & Pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="xl:col-span-2">
          <DashboardSection
            title="Earthquake Counts by Magnitude Range (Last 5 Years)"
            className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
          >
            <BarByCategory data={filtered} />
          </DashboardSection>
        </div>

        {/* Pie Chart */}
        <div className="xl:col-span-1">
          <DashboardSection
            title="Distribution by Magnitude"
            className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <PieByMagnitude data={filtered} />
            </div>
          </DashboardSection>
        </div>
      </div>

      {/* Full-width Line Chart */}
      <DashboardSection
        title="Total Earthquakes of Last 5 Years"
        className="w-full mt-6 border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
      >
        <BarLineCharts data={filtered} />
      </DashboardSection>

      {/* Full-width Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* Table */}
        <DashboardSection
          title="Seismic HeatMap"
          className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
        >
          <HeatMap data={filtered} />
        </DashboardSection>

        {/* Heat Map */}
        <DashboardSection

          className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
        >
          <NotableEarthquakeTable
            data={filtered}
            isFiltered={!!(selectedYear || selectedCategory)}
          />
        </DashboardSection>
      </div>
    </div>
  );
}
