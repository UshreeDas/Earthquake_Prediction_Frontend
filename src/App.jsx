import Body from './Component/Body/Body.jsx';
import About from './Component/About/About';
import Footer from './Component/Footer/Footer';

export default function App() {
  return (
    <div className="bg-[#F5F5F5DE] min-h-screen text-black">
      <Body />
      <About />
      <Footer />
    </div>
  );
}