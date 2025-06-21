import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">Bhūkamp Sūchak</h2>
          <p className="text-sm text-gray-400">
            Advanced earthquake prediction and monitoring for a safer India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><a href="#">Home</a></li>
            <li><a href="#">Prediction</a></li>
            <li><a href="#">Historical Data</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><a href="#">Research Papers</a></li>
            <li><a href="#">Safety Guidelines</a></li>
            <li><a href="#">Methodology</a></li>
            <li><a href="#">API Access</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <div className="flex space-x-4 mb-2">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
          <p className="text-sm text-gray-400">Email: info@bhukampsuchak.org</p>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>© 2025 Bhūkamp Sūchak. All rights reserved.</p>
        <p className="mt-1">
          Disclaimer: Earthquake prediction is an evolving science. Our predictions are based on probability models and should not be considered definitive. Always follow official government advisories.
        </p>
      </div>
    </footer>
  );
}