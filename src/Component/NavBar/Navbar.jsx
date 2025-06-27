// File: src/Component/NavBar/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import Logo from "../../assets/logo.svg";
import historicalData from "../HeroSection/Historical_Data/Final_Dashboard"
import {
  FaBars,
  FaTimes,
  FaHome,
  FaChartLine,
  FaHistory,
  FaInfoCircle,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">Bhūkamp Sūchak</h1>
              <p
                className="text-sm md:text-base font-semi-bold leading-tight"
                style={{ color: "#FFE0B2" }}
              >
                India Earthquake Prediction System
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-base font-semibold">
            <Link to="/" className="hover:underline">Home</Link>
            <a href="#prediction" className="hover:underline">Prediction</a>
            <Link to="/FinalDashboard" className="hover:underline">Historical Data</Link>
            <a href="#about" className="hover:underline">About</a>
          </nav>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-18 right-0 py-4 flex justify-end z-50">
          <div className="bg-orange-700/90 w-96 shadow-lg p-7 space-y-7 text-lg font-semibold text-white">
            <div className="flex items-center space-x-3">
              <FaHome />
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
            </div>
            <div className="flex items-center space-x-3">
              <FaChartLine />
              <a href="#prediction" onClick={() => setIsOpen(false)} className="hover:underline">Prediction</a>
            </div>
            <div className="flex items-center space-x-3">
              <FaHistory />
              <Link to="/FinalDashboard" onClick={() => setIsOpen(false)} className="hover:underline">Historical Data</Link>
            </div>
            <div className="flex items-center space-x-3">
              <FaInfoCircle />
              <a href="#about" onClick={() => setIsOpen(false)} className="hover:underline">About</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
