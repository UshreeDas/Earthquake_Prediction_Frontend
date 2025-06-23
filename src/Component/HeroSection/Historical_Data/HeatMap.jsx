import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Maximize2, Minimize2 } from "lucide-react";

export default function HeatMap({ data }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

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
            color: d.seismic_hazard_fault === "High" ? "red" : "blue",
            fillColor: d.seismic_hazard_fault === "High" ? "red" : "blue",
            fillOpacity: 1,
          }}
        >
          <Tooltip>
            Magnitude: {d.magnitude_eq}, Depth: {d.depth_eq}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );

  const legend = (
    <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow text-xs z-[9999] border border-gray-300">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
        <span>High Hazard Zone</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
        <span>Other Zones</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Normal Mode */}
      {!isFullScreen && (
        <div className="relative w-full h-[400px] bg-white rounded shadow overflow-hidden">
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