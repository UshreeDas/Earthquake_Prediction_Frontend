import React from "react";
import Image from "../../assets/img.svg"; 

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
      
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Predict Earthquakes Across India
          </h1>
          <p className="text-lg text-white/90 mb-10">
            Our advanced AI model analyzes seismic patterns, geological data, and historical records to predict potential earthquake events in the Indian subcontinent.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="border-2 border-white px-6 py-3 rounded-lg text-white font-semibold hover:bg-white hover:text-red-600 transition">
              <a href="#" >Make a Prediction</a>
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg text-white font-semibold hover:bg-white hover:text-red-600 transition">
              <a href="#" >View Historical Data</a>
            </button>
          </div>
        </div>

      
        <div className="mt-12 md:mt-0 md:max-w-md w-full">
          <img src={Image} alt="Earthquake chart" className="w-full" />
        </div>
      </div>
    </section>
  );
}
