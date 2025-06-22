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

  useEffect(() => {
    axios.get("http://localhost:8000/historical-data").then((res) => {
      setData(res.data.data);
      setFiltered(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      setFiltered(data.filter((d) => d.year_eq === Number(selectedYear)));
    } else {
      setFiltered(data);
    }
  }, [selectedYear, data]);

  const years = [...new Set(data.map((d) => d.year_eq))].sort();

  return (
    <div className="p-4 bg-white">
      {/* Banner */}
      <div className="w-full bg-blue-200 py-4 mb-4 text-center rounded-md shadow">
        <h1 className="text-3xl font-bold text-red-800 uppercase tracking-wide">
          Earthquake Data Dashboard
        </h1>
      </div>

      <KPICards data={filtered} />

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <DashboardSection title="Seismic HeatMap" className="bg-orange-100">
          <HeatMap data={filtered} />
        </DashboardSection>

        <DashboardSection title="Distribution by Magnitude" className="bg-pink-100">
          <PieByMagnitude data={filtered} />
        </DashboardSection>

        <div className="flex flex-col gap-4">
          <DashboardSection title="Filter by Year" className="bg-pink-200">
            <FilterControls
              years={years}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </DashboardSection>

          <DashboardSection title="Magnitude Category" className="bg-yellow-200">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-md text-center py-2 font-medium">Moderate</div>
              <div className="bg-white rounded-md text-center py-2 font-medium">Severe</div>
              <div className="bg-white rounded-md text-center py-2 font-medium">Strong</div>
            </div>
          </DashboardSection>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardSection title="Total Earthquakes by Date">
          <BarLineCharts data={filtered} />
        </DashboardSection>

        <DashboardSection title="Earthquake Counts by Magnitude Range" className="bg-yellow-100">
          <BarByCategory data={filtered} />
        </DashboardSection>
      </div>
    </div>
  );
}
