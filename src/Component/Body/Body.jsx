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

// 🔍 Register ChartJS components here (required):
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

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="bg-white">
        <CardContent>
          <h2 className="font-semibold text-xl mb-4">Seismic Activity Trends</h2>
          <div className="h-[300px]"> {/* Important to give canvas height */}
            <Line data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent>
          <h2 className="font-semibold text-xl mb-4">Major Events</h2>
          {majorEvents.map((event, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold text-red-600 text-lg">{event.magnitude}</p>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm">{event.date}</p>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </div>
          ))}
          <a href="#" className="text-orange-500 mt-2 inline-block">View complete historical data →</a>
        </CardContent>
      </Card>

      <Card className="bg-white col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="font-semibold text-xl mb-4">Current Seismic Risk Zones in India</h2>
          <div className="flex justify-between">
            {Object.entries(riskZones).map(([zone, areas], index) => (
              <div key={index}>
                <p className="font-semibold mb-2">
                  {zone.replace('Zone', 'Zone ')} ({zone === 'ZoneV' ? 'Very High Risk' : zone === 'ZoneIV' ? 'High Risk' : 'Moderate Risk'})
                </p>
                <ul className="list-disc list-inside text-sm">
                  {areas.map((area, idx) => <li key={idx}>{area}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}