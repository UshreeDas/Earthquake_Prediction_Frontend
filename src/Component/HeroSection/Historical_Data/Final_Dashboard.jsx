import React, { useEffect, useState } from "react";
import axios from "axios";
import KPICards from "./KPICards";
import FilterControls from "./FilterControls";
import BarLineCharts from "./BarLineCharts";
import HeatMap from "./HeatMap";
import PieByMagnitude from "./PieByMagnitude";
import BarByCategory from "./BarByCategory";
import DashboardSection from "../../../components/ui/DashboardSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // adjust path if needed


export default function FinalDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true); //  loading state

  useEffect(() => {
    axios.get("http://localhost:8000/historical-data").then((res) => {
      const allData = res.data.data;
      const years = allData.map((d) => d.year_eq);
      const maxYear = Math.max(...years);
      const lastFiveYearsData = allData.filter((d) => d.year_eq >= maxYear - 4);
      setData(allData);
      setFiltered(lastFiveYearsData);
    })
      .finally(() => {
        setIsLoading(false); //  disable loading once done
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

  // display loading spinner while data is loading
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
      <div className="w-full  py-4 mb-4 text-center ">
        <h1 className="text-3xl font-extrabold text-red-600 uppercase tracking-wider">

          Earthquake Data Dashboard
        </h1>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-2 mb-5">

        {/* Filter by Year */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Filter by Year:</span>
          <FilterControls
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        {/* Magnitude Category */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Magnitude Category:</span>
          <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="h-9 px-4 border rounded-md font-semibold text-black bg-white border-red-300 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
>
            <option value="">All</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Strong">Strong</option>
          </select>
        </div>



        {/* Reset Button */}
        <div className="flex">
          <button
  onClick={handleReset}
  className="h-9 px-6 bg-red-500 hover:bg-red-400 text-white font-semibold rounded shadow-[0_0_10px_rgba(0,0,0,0.2)]"
>
            Reset Filters
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards data={filtered} />

      {/* Middle Grid: HeatMap and Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <DashboardSection title="Seismic HeatMap" className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <HeatMap data={filtered} />
        </DashboardSection>

        <DashboardSection title="Distribution by Magnitude" className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <PieByMagnitude data={filtered} />
        </DashboardSection>

      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <DashboardSection title="Total Earthquakes of Last 5 Years" className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <BarLineCharts data={filtered} />
        </DashboardSection>

        <DashboardSection title="Earthquake Counts by Magnitude Range (Last 5 Years)" className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <BarByCategory data={filtered} />
        </DashboardSection>

      </div>
    </div>
  );
}
