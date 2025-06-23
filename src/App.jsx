import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Component/NavBar/Navbar";
import HeroSection from "./Component/HeroSection/HeroSection";
import Body from "./Component/Body/Body.jsx";
import About from "./Component/About/About";
import Footer from "./Component/Footer/Footer";
import FinalDashboard from "./Component/HeroSection/Historical_Data/Final_Dashboard";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home route with all sections */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Body />
              <About />
              <Footer />
            </>
          }
        />

        {/* Separate route for FinalDashboard */}
        <Route path="/FinalDashboard" element={<FinalDashboard />} />
      </Routes>
    </Router>
  );
}
