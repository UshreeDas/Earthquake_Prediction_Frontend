// File: src/components/ui/SidebarLayout.jsx
import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaBolt,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function SidebarLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/FinalDashboard",
      icon: <FaChartLine />,
    },
    {
      name: "Prediction",
      path: "/PredictEarthquake",
      icon: <FaBolt />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed) */}
      <div
        className={`bg-black text-white h-screen sticky top-0 transition-all duration-300 ease-in-out ${
          collapsed ? "w-16" : "w-64"
        } shadow-xl flex flex-col justify-between`}
      >
        {/* Top: Header + Nav */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {!collapsed && (
              <h2 className="text-lg font-bold tracking-wide">
                Bhūkamp Sūchak
              </h2>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-300 hover:text-white"
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {/* Navigation */}
          <ul className="px-2 py-4 space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  title={collapsed ? item.name : undefined}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition ${
                    location.pathname === item.path
                      ? "bg-gray-800 text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: Back to Home */}
        <div className="p-4 border-t border-gray-700">
          <Link
            to="/"
            title={collapsed ? "Back to Home" : undefined}
            className={`flex items-center space-x-3 text-sm text-gray-300 hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <FaArrowLeft />
            {!collapsed && <span>Back to Home</span>}
          </Link>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
