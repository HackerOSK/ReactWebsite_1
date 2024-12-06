import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react';



export default function ExchangeMonitor({ exchangeData }) {
  const [prevData, setPrevData] = useState({});
  const [expandedExchange, setExpandedExchange] = useState(null);

  useEffect(() => {
    setPrevData(
      exchangeData.reduce((acc, exchange) => {
        acc[exchange.name] = exchange;
        return acc;
      }, {})
    );
  }, [exchangeData]);

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Exchange Monitor</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">Exchange</th>
              <th className="p-2">Transactions</th>
              <th className="p-2">Suspicious</th>
              <th className="p-2">Volume (USD)</th>
              <th className="p-2">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {exchangeData.map((exchange) => (
              <React.Fragment key={exchange.name}>
                <tr className="border-t border-gray-700 hover:bg-gray-700 transition-colors duration-150 items-center">
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={`src/Images/UserInteraction/${exchange.name.toLowerCase()}.svg`}
                        alt={`${exchange.name} logo`}
                        width={24}
                        height={24}
                      />
                      <span>{exchange.name}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <ValueWithTrend
                      current={exchange.transactions}
                      previous={prevData[exchange.name]?.transactions}
                    />
                  </td>
                  <td className="p-2">
                    <ValueWithTrend
                      current={exchange.suspicious}
                      previous={prevData[exchange.name]?.suspicious}
                    />
                  </td>
                  <td className="p-2">
                    <ValueWithTrend
                      current={exchange.volume}
                      previous={prevData[exchange.name]?.volume}
                      prefix="$"
                    />
                  </td>
                  <td className={`p-2 ${exchange.status === 'Alert' ? 'text-red-400' : 'text-green-400'}`}>
                    {exchange.status}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        setExpandedExchange(expandedExchange === exchange.name ? null : exchange.name)
                      }
                      className="text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {expandedExchange === exchange.name ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </td>
                </tr>
                {expandedExchange === exchange.name && (
                  <tr>
                    <td colSpan={6} className="p-4 bg-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Top Wallets</h3>
                          <ul>
                            <li>0x1234...5678</li>
                            <li>0x9876...5432</li>
                            <li>0xabcd...efgh</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Recent Alerts</h3>
                          <ul>
                            <li>Unusual transaction volume detected</li>
                            <li>Multiple high-value transfers</li>
                          </ul>
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

function ValueWithTrend({ current, previous, prefix = '' }) {
  const trend = current > previous ? 'up' : current < previous ? 'down' : 'same';
  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="flex items-center">
      <span>
        {prefix}
        {current.toLocaleString()}
      </span>
      {trend === 'up' && <ArrowUpRight className={`ml-1 h-4 w-4 ${trendColor}`} />}
      {trend === 'down' && <ArrowDownRight className={`ml-1 h-4 w-4 ${trendColor}`} />}
    </div>
  );
}
