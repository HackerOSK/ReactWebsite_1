import { Activity, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Dashboard({ exchangeData }) {
  const totalTransactions = exchangeData.reduce((sum, exchange) => sum + exchange.transactions, 0);
  const totalSuspicious = exchangeData.reduce((sum, exchange) => sum + exchange.suspicious, 0);
  const totalVolume = exchangeData.reduce((sum, exchange) => sum + exchange.volume, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Total Transactions"
        value={totalTransactions.toLocaleString()}
        icon={<Activity className="h-8 w-8 text-blue-400" />}
        trend={5.2}
      />
      <DashboardCard
        title="Suspicious Activities"
        value={totalSuspicious.toLocaleString()}
        icon={<AlertTriangle className="h-8 w-8 text-red-400" />}
        trend={-2.1}
      />
      <DashboardCard
        title="Total Volume (USD)"
        value={`$${totalVolume.toLocaleString()}`}
        icon={<DollarSign className="h-8 w-8 text-green-400" />}
        trend={7.8}
      />
      <DashboardCard
        title="Active Exchanges"
        value={exchangeData.length.toString()}
        icon={<TrendingUp className="h-8 w-8 text-purple-400" />}
        trend={0}
      />
    </div>
  );
}

function DashboardCard({ title, value, icon, trend }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <div className={`flex items-center ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend > 0 && '↑'}
        {trend < 0 && '↓'}
        {trend === 0 && '–'}
        <span className="ml-1">{Math.abs(trend)}%</span>
      </div>
    </div>
  );
}
