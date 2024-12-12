import { Search, Bell } from 'lucide-react';
import {useState} from 'react';
import {Link} from "react-router-dom";


export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
  <>
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-400 flex items-center">
          <span className="mr-2">🛡️</span>
          BlockchainGuard
        </h1>
        <div className="flex items-center space-x-4">
      
          <Link to="/eth">
          <button className="bg-green-300 p-2 w-56 rounded-full text-black hover:bg-red-400 transition-colors duration-300">
            Investigate Wallet
          </button>
          </Link>
          
        </div>
      </div>
    </header>
  </>
  );
}
