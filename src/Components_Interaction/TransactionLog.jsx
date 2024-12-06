import { ArrowRight } from 'lucide-react'

export default function TransactionLog({ transactions }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Transaction Log</h2>
      <div className="overflow-y-auto h-96 pr-2">
        {transactions.map(transaction => (
          <div key={transaction.id} className="mb-2 p-3 bg-gray-700 rounded-lg transform hover:scale-102 transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 font-semibold">[{transaction.exchange}]</span>
              <span className="text-xs text-gray-400">{new Date(transaction.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-400">{transaction.from.slice(0, 6)}...</span>
              <ArrowRight className="mx-2 text-gray-400" />
              <span className="text-green-400">{transaction.to.slice(0, 6)}...</span>
              <span className="ml-auto text-yellow-400">{transaction.amount.toFixed(2)} ETH</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

