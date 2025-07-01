
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";

const schema = z.object({
  magnitude_eq: z.number().min(0),
  depth_eq: z.number().min(0),
  depth_error_eq: z.number(),
  min_proximity_km: z.number(),
  fault_count_within_50km: z.number().int(),
  slip_rate_mm_per_yr_fault: z.number(),
  fault_density_fault: z.number(),
  rock_factor_scaled_fault: z.number(),
  soil_factor_scaled_fault: z.number(),
  strain_rate_fault: z.number(),
  attenuation_factor_fault: z.number(),
  fault_type_fault: z.number().int(),
  rock_type_fault: z.number().int(),
  soil_type_fault: z.number().int(),
  seismic_hazard_fault: z.number().int(),
  zone_mismatch_flag: z.number().int()
});

const defaultValues = {
  magnitude_eq: 4.5,
  depth_eq: 108.6,
  depth_error_eq: 10.1,
  min_proximity_km: 1613.72,
  fault_count_within_50km: 0,
  slip_rate_mm_per_yr_fault: 0.5,
  fault_density_fault: 0.37,
  rock_factor_scaled_fault: 0.005,
  soil_factor_scaled_fault: 0.007,
  strain_rate_fault: 8.33e-9,
  attenuation_factor_fault: 0.0057,
  fault_type_fault: 2,
  rock_type_fault: 5,
  soil_type_fault: 5,
  seismic_hazard_fault: 2,
  zone_mismatch_flag: 1,
};

export default function PredictEarthquake() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/predict-full", data);
      setResult(res.data);
      toast.success("Prediction successful!");
      const timestamp = new Date().toLocaleTimeString();
      setHistory((prev) => [
        ...prev,
        { timestamp, magnitude: res.data.predicted_magnitude }
      ]);
    } catch (err) {
      console.error(err);
      toast.error("Prediction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Earthquake Prediction</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(defaultValues).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
            <input
              type="number"
              step="any"
              {...register(key, { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors[key] && (
              <span className="text-red-500 text-xs">Invalid value</span>
            )}
          </div>
        ))}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded shadow"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 bg-gray-50 p-4 rounded border">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Prediction Result</h3>
          <p><strong>Latitude:</strong> {result.predicted_coordinates.latitude}</p>
          <p><strong>Longitude:</strong> {result.predicted_coordinates.longitude}</p>
          <p><strong>Zone:</strong> {result.predicted_zone}</p>
          <p><strong>Predicted Magnitude:</strong> {result.predicted_magnitude}</p>

          <div className="my-4">
            <MapContainer center={[result.predicted_coordinates.latitude, result.predicted_coordinates.longitude]} zoom={5} style={{ height: "300px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[result.predicted_coordinates.latitude, result.predicted_coordinates.longitude]}>
                <Popup>Predicted Location</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="my-4">
            <h4 className="text-md font-bold mb-2">Magnitude Trend (This Session)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="magnitude" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
