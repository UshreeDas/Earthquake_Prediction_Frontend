import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";

export default function ResultPanel({ result, history }) {
  return (
    <div className="mt-8 bg-gray-50 p-4 rounded border">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Prediction Result</h3>
      <p><strong>Latitude:</strong> {result.predicted_coordinates.latitude}</p>
      <p><strong>Longitude:</strong> {result.predicted_coordinates.longitude}</p>
      <p><strong>Zone:</strong> {result.predicted_zone}</p>
      <p><strong>Predicted Magnitude:</strong> {result.predicted_magnitude}</p>

      {/* 🔎 You can conditionally render more fields */}
      <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
        <p><strong>Fault Type:</strong> {result.fault_type_fault}</p>
        <p><strong>Rock Type:</strong> {result.rock_type_fault}</p>
        <p><strong>Soil Type:</strong> {result.soil_type_fault}</p>
        <p><strong>Seismic Hazard:</strong> {result.seismic_hazard_fault}</p>
        <p><strong>Zone Mismatch:</strong> {result.zone_mismatch_flag}</p>
      </div>

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
  );
}
