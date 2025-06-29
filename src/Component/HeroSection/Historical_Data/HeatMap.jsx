import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Maximize2, Minimize2 } from "lucide-react";
import axios from "axios";

export default function HeatMap({ data }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [faultLines, setFaultLines] = useState([]);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  useEffect(() => {
    axios.get("http://localhost:8000/fault-lines").then((res) => {
      setFaultLines(res.data.data);
    });
  }, []);

  const mapElement = (
    <MapContainer
      center={[22.9734, 78.6569]}
      zoom={5}
      minZoom={4}
      maxBounds={[
        [6.5, 68.7],
        [37.5, 97.25],
      ]}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((d, idx) => (
        <CircleMarker
          key={idx}
          center={[d.latitude_eq, d.longitude_eq]}
          radius={4}
          pathOptions={{
            color: d.seismic_hazard_fault === "High" ? "#BB3E03" : "#005F73",
            fillColor: d.seismic_hazard_fault === "High" ? "#BB3E03" : "#005F73",
            fillOpacity: 1,
          }}
        >
          <Tooltip>
            Magnitude: {d.magnitude_eq}, Depth: {d.depth_eq}
          </Tooltip>
        </CircleMarker>
      ))}
      {faultLines.map((line, i) => (
        <Polyline
          key={i}
          positions={[
            [line.Start_Lat, line.Start_Lon],
            [line.End_Lat, line.End_Lon],
          ]}
          pathOptions={{ color: "#001219", weight: 2 }}
        />
      ))}
    </MapContainer>
  );

  const legend = (
    <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow text-xs z-[9999] border border-gray-300">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#BB3E03" }}></span>
        <span>High Hazard Zone</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "#005F73" }}></span>
        <span>Other Zones</span>
      </div>
      <div className="mt-1">
        <span className="inline-block w-3 h-1 mr-2 align-middle" style={{ backgroundColor: "#001219" }}></span>
        <span>Fault Line</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Normal Mode */}
      {!isFullScreen && (
        <div className="relative w-full h-[280px] bg-white rounded shadow overflow-hidden">
          <button
            onClick={toggleFullScreen}
            className="absolute top-2 right-2 z-[9999] bg-white border border-gray-300 rounded px-2 py-1 text-sm shadow hover:bg-gray-100 flex items-center gap-1"
          >
            <Maximize2 size={14} />
            Enlarge
          </button>
          {mapElement}
          {legend}
        </div>
      )}

      {/* Fullscreen Mode */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 z-[10000] bg-white border border-gray-300 rounded px-2 py-1 text-sm shadow hover:bg-gray-100 flex items-center gap-1"
          >
            <Minimize2 size={14} />
            Minimize
          </button>
          <div className="w-[90vw] h-[90vh] relative">
            {mapElement}
            {legend}
          </div>
        </div>
      )}
    </>
  );
}
