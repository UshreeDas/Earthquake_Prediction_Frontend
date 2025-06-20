import { Card, CardContent } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import seismicTrends from '../../data/seismicTrends.json';
import majorEvents from '../../data/majorEvents.json';
import riskZones from '../../data/riskZones.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Body() {
  const chartData = {
    labels: seismicTrends.labels,
    datasets: [{
      label: 'Seismic Activity',
      data: seismicTrends.data,
      fill: false,
      borderColor: '#FF5733',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  const getMagnitudeColor = (magnitude) => {
    if (magnitude <= 3) return "bg-green-100 text-green-700";
    if (magnitude <= 5) return "bg-yellow-100 text-yellow-700";
    if (magnitude <= 6) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  const zoneColors = {
    ZoneV: "bg-red-600",
    ZoneIV: "bg-orange-600",
    ZoneIII: "bg-yellow-600"
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Seismic Activity Trends */}
      <Card className="bg-white border-none shadow-[0_0_20px_rgba(0,0,0,0.15)] col-span-2">
        <CardContent>
          <h2 className="font-semibold text-xl mb-4">Seismic Activity Trends</h2>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Major Events */}
      <Card className="bg-white border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]">
        <CardContent>
          <h2 className="font-semibold text-xl mb-4">Major Events</h2>
          {majorEvents.map((event, index) => (
            <div key={index} className="mb-4 flex items-start gap-4">
              {/* Magnitude Circle */}
              <div
                className={`
                  h-12 w-12 flex items-center justify-center rounded-full font-bold text-base leading-none
                  ${getMagnitudeColor(event.magnitude)}
                `}
              >
                {event.magnitude}
              </div>

              {/* Event Details */}
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm">{event.date}</p>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
          <a href="#" target="_blank" className="text-orange-500 mt-2 inline-block">View complete historical data →</a>
        </CardContent>
      </Card>

      {/* Seismic Risk Zones */}
<Card className="bg-white col-span-1 lg:col-span-3 border-none shadow-[0_0_20px_rgba(0,0,0,0.15)]">
  <CardContent>
    {/* Header with Legends */}
    <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
      <h2 className="font-semibold text-xl">Current Seismic Risk Zones in India</h2>

      {/* Legends */}
      <div className="flex items-center gap-4">
        {Object.keys(zoneColors).map((zone, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded ${zoneColors[zone]}`} />
            <span className="text-sm">
              {zone === 'ZoneV'
                ? 'Zone V (Very High)'
                : zone === 'ZoneIV'
                ? 'Zone IV (High)'
                : 'Zone III (Moderate)'}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Zones */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full justify-items-stretch">
  {Object.entries(riskZones).map(([zone, areas], index) => (
    <div key={index} className="w-full"> {/* Now will stretch */}
      <p className="font-semibold mb-2">
        {zone.replace('Zone', 'Zone ')} (
        {zone === 'ZoneV'
          ? 'Very High Risk'
          : zone === 'ZoneIV'
          ? 'High Risk'
          : 'Moderate Risk'}
        )
      </p>
      <ul className="list-none space-y-1 text-sm">
        {areas.map((area, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${zoneColors[zone]}`} />
            {area}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
  </CardContent>
</Card>
    </div>
  );
}