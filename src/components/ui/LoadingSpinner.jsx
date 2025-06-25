import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ text = "Loading...", size = 24 }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <Loader2 className="animate-spin text-blue-600" size={size} />
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
