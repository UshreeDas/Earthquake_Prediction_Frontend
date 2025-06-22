import React from "react";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 md:px-10 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">About Bhūkamp Sūchak</h2>
      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
        Our mission is to advance earthquake prediction science and provide accessible information
        to help communities across India prepare for seismic events.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
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

        <div className="bg-red-50 border border-red-100 shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Stay Informed</h3>
          <p className="text-gray-600 text-sm mb-6">
            Subscribe to receive alerts and updates about seismic activity in your region of India.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="tel"
              placeholder="+91 XXXXXXXXXX"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <select className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400">
              <option>Select your state</option>
              <option>West Bengal</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Gujarat</option>
              <option>Tamil Nadu</option>
            </select>
            <div className="flex items-start gap-2">
              <input type="checkbox" />
              <label className="text-sm text-gray-600">
                I agree to receive notifications and accept the privacy policy
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
