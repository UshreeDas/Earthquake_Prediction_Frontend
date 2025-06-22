import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

export default function HeatMap({ data }) {
  return (
    <MapContainer center={[22.9734, 78.6569]} zoom={4} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((d, idx) => (
        <CircleMarker
          key={idx}
          center={[d.latitude_eq, d.longitude_eq]}
          radius={4}
          pathOptions={{ color: d.seismic_hazard_fault === "High" ? "red" : "blue" }}
        >
          <Tooltip>
            Magnitude: {d.magnitude_eq}, Depth: {d.depth_eq}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
