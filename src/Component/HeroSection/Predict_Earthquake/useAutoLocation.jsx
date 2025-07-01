import { useEffect, useState } from "react";
import axios from "axios";

export function useAutoLocation() {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await axios.post("http://localhost:8000/api/predict", {
          latitude_input: latitude,
          longitude_input: longitude,
          zone_input: 0
        });

        setLocationData({
          latitude: latitude,
          longitude: longitude,
          zone: res.data.predicted_zone
        });
      } catch (err) {
        console.error("Error fetching zone from coordinates", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return { locationData, loading };
}
