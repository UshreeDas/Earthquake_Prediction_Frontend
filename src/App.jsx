import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/NavBar/Navbar";
import HeroSection from "./Component/HeroSection/HeroSection";
import Body from "./Component/Body/Body.jsx";
import About from "./Component/About/About";
import Footer from "./Component/Footer/Footer";
import FinalDashboard from "./Component/HeroSection/Historical_Data/Final_Dashboard";
import PredictEarthquake from "./Component/HeroSection/Predict_Earthquake/PredictEarthquake.jsx";
import SidebarLayout from "./components/ui/SidebarLayout.jsx";

function AppRoutes() {
  const location = useLocation();

  // Show sidebar on these routes
  const isSidebarRoute = ["/FinalDashboard", "/PredictEarthquake"].includes(location.pathname);

  return (
    <>
      {!isSidebarRoute && <Navbar />}

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

        {/* FinalDashboard with Sidebar */}
        <Route
          path="/FinalDashboard"
          element={
            <SidebarLayout>
              <FinalDashboard />
            </SidebarLayout>
          }
        />

        {/* Predict Earthquake with Sidebar */}
        <Route
          path="/PredictEarthquake"
          element={
            <SidebarLayout>
              <PredictEarthquake />
            </SidebarLayout>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      {/* ✅ ToastContainer placed here */}
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </Router>
  );
}
