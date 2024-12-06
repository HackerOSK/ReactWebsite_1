import { AlertCircle, X } from 'lucide-react'

export default function AlertPanel({ alerts }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <AlertCircle className="mr-2 text-red-400" />
        Alert Panel
      </h2>
      <div className="space-y-2 overflow-y-auto h-96 pr-2">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-red-900 bg-opacity-50 p-3 rounded-lg flex items-start transform hover:scale-102 transition-all duration-200">
            <AlertCircle className="mr-2 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <p className="text-sm">
                  <span className="text-blue-400">[{alert.exchange}]</span> {alert.message}
                </p>
                <button className="text-gray-400 hover:text-white transition-colors duration-150">
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

