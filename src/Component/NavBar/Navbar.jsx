
import React from "react";
import Logo from "../../assets/logo.svg"; 

export default function Navbar() {
    return (
        <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white ">
            <div className="max-w-screen-x1 mx-auto px-10 py-4 flex items-center justify-between">
             
                <div className="flex items-center space-x-4">
                    <img src={Logo} alt="Logo" className="w-10 h-10" />
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold leading-tight">Bhūkamp Sūchak</h1>
                        <p className="text-sm md:text-base font-semi-bold leading-tight" style={{ color: '#FFE0B2' }}>
                            India Earthquake Prediction System
                        </p>

                    </div>
                </div>

             
                <nav className="flex space-x-8 text-base font-semibold">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">Prediction</a>
                    <a href="#" className="hover:underline">Historical Data</a>
                    <a href="#" className="hover:underline">About</a>
                </nav>
            </div>
        </header>
    );
}
