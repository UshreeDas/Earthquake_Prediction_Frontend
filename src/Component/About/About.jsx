import React from "react";
import { AlertTriangle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 md:px-10 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">About Bhūkamp Sūchak</h2>
      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
        Our mission is to advance earthquake prediction science and provide accessible information
        to help communities across India prepare for seismic events.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
          <p className="text-gray-700 mb-5">
            Bhūkamp Sūchak combines traditional seismological methods with cutting-edge AI and
            machine learning to analyze patterns in seismic data specific to the Indian subcontinent.
          </p>
          <p className="text-gray-700 mb-6">
            We collaborate with leading geological institutions across India to continuously improve
            our prediction models and provide timely information to communities in seismic-prone regions.
          </p>

          <h3 className="text-xl font-semibold mb-3">Data Sources</h3>
          <p className="text-gray-700 mb-3">Our platform aggregates data from multiple trusted sources:</p>
          <ul className="text-gray-700 list-none space-y-2 mb-6">
            <li>🟠 National Centre for Seismology (NCS)</li>
            <li>🟠 India Meteorological Department (IMD)</li>
            <li>🟠 Geological Survey of India (GSI)</li>
            <li>🟠 International seismic monitoring networks</li>
          </ul>

          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold px-5 py-2 rounded">
            Join Our Research Network
          </button>
        </div>

        {/* Right Section - Prediction Methodology */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Prediction Methodology</h3>
           <p className="text-gray-700 mb-4">
        While the technology continues to evolve, this framework represents a significant step
        forward in proactive seismic risk monitoring. We believe that timely insights, even if
        probabilistic, can contribute meaningfully to disaster preparedness and public safety.
      </p>
          <p className="text-gray-700 mb-3">
            Our prediction model combines multiple data sources:
          </p>
          <ul className="text-gray-700 list-none space-y-2 mb-6">
            <li>🟠 Historical seismic data patterns</li>
            <li>🟠 Tectonic plate movement monitoring</li>
            <li>🟠 Ground deformation measurements</li>
            <li>🟠 Changes in groundwater levels</li>
            <li>🟠 Soil and rock types in different zones</li>
            <li>🟠 Machine learning analysis of precursor events</li>
          </ul>
          {/* Warning Box with Background */}
          <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 text-sm rounded flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
            <span>
              Earthquake prediction is still an evolving science. Our models provide probability
              estimates, not certainties.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
