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
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function FinalDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [leftOffset, setLeftOffset] = useState(getSidebarOffset());

  // 🔧 Determine sidebar offset
  function getSidebarOffset() {
    if (window.innerWidth < 768) return "left-0 right-0";
    const isCollapsed = localStorage.getItem("sidebar-collapsed") === "true";
    return isCollapsed ? "left-16 right-0" : "left-64 right-0";
  }

  // 🔁 Listen to sidebar toggles or window resizes
  useEffect(() => {
    const handleResizeOrSidebarChange = () => {
      setLeftOffset(getSidebarOffset());
    };

    window.addEventListener("resize", handleResizeOrSidebarChange);
    window.addEventListener("sidebar-toggled", handleResizeOrSidebarChange);

    return () => {
      window.removeEventListener("resize", handleResizeOrSidebarChange);
      window.removeEventListener("sidebar-toggled", handleResizeOrSidebarChange);
    };
  }, []);

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
    <div className="relative">
      {/* ─── Fixed Header ───────────────────────────────────────────── */}
      <div
        className={`fixed top-0 z-50 bg-white/90 backdrop-blur-sm border-b-0 px-6 py-4 shadow-md transition-all duration-300 ${leftOffset}`}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Title */}
          <div className="text-2xl font-bold text-gray-800">
            Earthquake Dashboard
          </div>

          {/* Right Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Filter by Year:</span>
              <FilterControls
                years={years}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">Magnitude:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-9 px-4 border rounded-md font-semibold text-black bg-white border-[#005F73] hover:border-[#EE9B00] focus:outline-none"
              >
                <option value="">All</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Strong">Strong</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              style={{ backgroundColor: "#EE9B00" }}
              className="h-9 px-6 text-white font-semibold rounded shadow hover:brightness-110"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content ───────────────────────────────────────────── */}
      <div className="pt-[120px] px-4 space-y-6">
        <KPICards data={(selectedYear || selectedCategory) ? filtered : data} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <DashboardSection
              title="Earthquake Counts by Magnitude Range (Last 5 Years)"
              className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            >
              <BarByCategory data={filtered} />
            </DashboardSection>
          </div>

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

        <DashboardSection
          title="Total Earthquakes of Last 5 Years"
          className="w-full mt-6 border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
        >
          <BarLineCharts data={filtered} />
        </DashboardSection>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2">
            <DashboardSection
              title="Seismic HeatMap"
              className="w-full border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            >
              <HeatMap data={filtered} />
            </DashboardSection>
          </div>

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
    </div>
  );
}
