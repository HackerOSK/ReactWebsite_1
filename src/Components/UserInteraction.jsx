'use client'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ExchangeMonitor from './components/ExchangeMonitor'
import TransactionLog from './components/TransactionLog'
import AlertPanel from './components/AlertPanel'
import BackgroundEffect from './components/BackgroundEffect'

export default function BlockchainSecurityDashboard() {
  const [exchangeData, setExchangeData] = useState([])
  const [transactions, setTransactions] = useState([])
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Simulate real-time exchange data
    const exchangeInterval = setInterval(() => {
      const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin']
      const newExchangeData = exchanges.map(exchange => ({
        name: exchange,
        transactions: Math.floor(Math.random() * 10000),
        suspicious: Math.floor(Math.random() * 100),
        volume: Math.floor(Math.random() * 1000000),
        status: Math.random() > 0.9 ? 'Alert' : 'Normal'
      }))
      setExchangeData(newExchangeData)
    }, 5000)

    // Simulate real-time transactions
    const transactionInterval = setInterval(() => {
      const newTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        exchange: ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'][Math.floor(Math.random() * 5)],
        from: `0x${Math.random().toString(36).substr(2, 8)}`,
        to: `0x${Math.random().toString(36).substr(2, 8)}`,
        amount: Math.random() * 10,
        timestamp: new Date().toISOString(),
      }
      setTransactions(prev => [...prev.slice(-49), newTransaction])
    }, 2000)

    // Simulate alerts
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Math.random().toString(36).substr(2, 9),
          exchange: ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'][Math.floor(Math.random() * 5)],
          message: `Suspicious activity detected on ${['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'][Math.floor(Math.random() * 5)]}`,
          timestamp: new Date().toISOString(),
        }
        setAlerts(prev => [...prev.slice(-9), newAlert])
      }
    }, 5000)

    return () => {
      clearInterval(exchangeInterval)
      clearInterval(transactionInterval)
      clearInterval(alertInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundEffect />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Dashboard exchangeData={exchangeData} />
          <div className="mt-8">
            <ExchangeMonitor exchangeData={exchangeData} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <TransactionLog transactions={transactions} />
            <AlertPanel alerts={alerts} />
          </div>
        </main>
      </div>
    </div>
  )
}

