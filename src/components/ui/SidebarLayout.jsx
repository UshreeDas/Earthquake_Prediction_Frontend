import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import {
  FaChartLine,
  FaBolt,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function SidebarLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const sidebarItems = [
    { name: "Dashboard", path: "/FinalDashboard", icon: <FaChartLine /> },
    { name: "Prediction", path: "/PredictEarthquake", icon: <FaBolt /> },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (window.innerWidth < 768) {
      setCollapsed(true);
    } else if (stored === "true") {
      setCollapsed(true);
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
    window.dispatchEvent(new Event("sidebar-toggled"));
  }, [collapsed]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-50 text-black bg-white p-2 rounded-full shadow-lg"
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`bg-black text-white h-screen fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"} 
        shadow-xl flex flex-col justify-between overflow-hidden`}
      >
        <div>
          {/* Logo + Title + Collapse */}
          <div className="flex flex-col items-center border-b border-gray-700 px-2 py-6 space-y-4">
            {/* Logo */}
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 h-12 ${
                collapsed ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
              style={{ transitionProperty: "transform, opacity" }}
            />

            {/* Centered Title + Collapse */}
            <div className="flex items-center justify-between w-full px-2">
              {!collapsed && (
                <div className="w-full flex justify-center transition-opacity duration-300">
                  <h2 className="text-lg font-bold tracking-wide text-white">
                    Bhūkamp Sūchak
                  </h2>
                </div>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className={`text-gray-300 hover:text-white ${
                  !collapsed ? "ml-2" : "ml-auto"
                }`}
              >
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
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

        {/* Footer */}
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

      {/* Mobile Overlay */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Main content */}
      <main
        className={`transition-all duration-300 min-h-screen ${
          collapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
        } p-4`}
      >
        {children}
      </main>
    </div>
  );
}
