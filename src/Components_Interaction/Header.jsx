import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
  <>
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-400 flex items-center">
          <span className="mr-2">🛡️</span>
          BlockchainGuard
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search wallet or transaction..."
              className="bg-gray-700 text-white px-4 py-2 pl-10 pr-4 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
          <button className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors duration-300">
            <Bell className="text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  </>
  );
}
