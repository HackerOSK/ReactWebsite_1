import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export default function ExchangeMonitor() {
  const [exchangeData, setExchangeData] = useState([]);
  const [prevData, setPrevData] = useState({});
  const [expandedExchange, setExpandedExchange] = useState(null);

  // Fetch exchange data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://4000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/coingecko',
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzk3NTUxMywiZXhwIjoxNzM0MDYxOTEzfQ.bfmnUyyOquDEnIe76XMEunJM7FlyYRqy7YjVIWJcIQzcyDktJaC_luDV5ELX2JyGnaiIZ4-AnStYbt-2ovApiaot_Sr0wwt_3EZpslIEP1T93pubkH-wD_uJqUvdHudS3TVqfQelOsm5A35XiHrQ-pc7T0Hy4IIk5sNlyo0n2T-eJdow3w6rgTxwN-vzniJu8zjCirBrZdOH8wh6sST9GOpcmdf1v6-0X8K2jpXczypI50yjNrP3CX5IlNHyOJsWozRE0cTEFYi0kytV8gbKYaCKpuwMuyZtgG1RXB4p4a_P5tCrdTFuyrrLjColiBQJxos82FBIxdaEzxXOsS0SnA',
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Update `prevData` before updating `exchangeData`
        setPrevData(
          data.reduce((acc, exchange) => {
            acc[exchange.name] = exchange;
            return acc;
          }, {})
        );

        setExchangeData(data);
      } catch (error) {
        console.error('Error fetching exchange data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the fetch runs only once on component mount.

  return (
    <div>
      {exchangeData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ExchangeTable
          exchangeData={exchangeData}
          prevData={prevData}
          expandedExchange={expandedExchange}
          setExpandedExchange={setExpandedExchange}
        />
      )}
    </div>
  );
}

// Split the table component for clarity
function ExchangeTable({ exchangeData, prevData, expandedExchange, setExpandedExchange }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Exchange Monitor</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">Exchange</th>
              <th className="p-2">Volume (BTC Normalized)</th>
              <th className="p-2">Graph</th>
              <th className="p-2">More</th>
            </tr>
          </thead>
          <tbody>
            {exchangeData.map((exchange) => (
              <React.Fragment key={exchange.id}>
                <tr className="border-t border-gray-700 hover:bg-gray-700 transition-colors duration-150 items-center">
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={exchange.image}
                        alt={`${exchange.name} logo`}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      <span>{exchange.name}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <ValueWithTrend
                      current={exchange.trade_volume_24h_btc_normalized}
                      previous={prevData[exchange.name]?.trade_volume_24h_btc_normalized}
                    />
                  </td>
                  <td className="p-2">
                    <VolumeChart
                      data={[exchange.trade_volume_24h_btc_normalized]}
                      trend={prevData[exchange.name]?.trade_volume_24h_btc_normalized}
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        setExpandedExchange(expandedExchange === exchange.id ? null : exchange.id)
                      }
                      className="text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {expandedExchange === exchange.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </td>
                </tr>
                {expandedExchange === exchange.id && (
                  <tr>
                    <td colSpan={4} className="p-4 bg-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Details</h3>
                          <ul>
                            <li><strong>Year Established:</strong> {exchange.year_established}</li>
                            <li><strong>Country:</strong> {exchange.country}</li>
                            <li><strong>Trust Score:</strong> {exchange.trust_score}</li>
                            <li><strong>Description:</strong> {exchange.description}</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">More Information</h3>
                          <a href={exchange.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            Visit Exchange
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// The rest of your helper components like ValueWithTrend and VolumeChart go here...


function ValueWithTrend({ current, previous }) {
  const trend = current > previous ? 'up' : current < previous ? 'down' : 'same';
  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="flex items-center">
      <span className={trendColor}>{current.toLocaleString()}</span>
      {trend === 'up' && <ArrowUpRight className="ml-1 h-4 w-4" />}
      {trend === 'down' && <ArrowDownRight className="ml-1 h-4 w-4" />}
    </div>
  );
}

function VolumeChart({ data, trend }) {
  // Generate random data close to the current trend
  const randomData = Array.from({ length: data.length + 5 }, (_, i) => {
    const baseValue = trend * (1 + (i / data.length - 0.5) * 0.1); // Slight bias for continuity
    return Math.max(
      0,
      baseValue * (1 + (Math.random() - 0.5) * 0.05) // Tighter fluctuation range
    );
  });

  // Determine graph colors based on the trend direction
  const isIncreasing = data[data.length - 1] > trend;
  const chartColor = isIncreasing ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)';
  const borderColor = isIncreasing ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)';
  const backgroundColor = isIncreasing
    ? 'rgba(34, 197, 94, 0.1)'
    : 'rgba(239, 68, 68, 0.1)';

  // Chart data configuration
  const chartData = {
    labels: [...Array(randomData.length).keys()].map((_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Background Data',
        data: randomData,
        backgroundColor: 'rgba(75, 85, 99, 0.1)', // Neutral background data
        borderColor: 'rgba(75, 85, 99, 0.5)',
        borderWidth: 1,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Trade Volume',
        data: [...randomData.slice(0, randomData.length - data.length), ...data],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Compact chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Hide legend
    },
    elements: {
      point: { radius: 0 }, // No visible points
    },
    scales: {
      x: { display: false }, // Hide x-axis
      y: { display: false }, // Hide y-axis
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div style={{ width: '100px', height: '50px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}


