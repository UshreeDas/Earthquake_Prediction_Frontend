
import "./App.css";
import Navbar from "./Component/NavBar/Navbar";
import HeroSection from "./Component/HeroSection/HeroSection"; 
import Body from './Component/Body/Body.jsx';
import About from './Component/About/About';
import Footer from './Component/Footer/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Body />
      <About />
      <Footer />
    </>
  
  );
}


