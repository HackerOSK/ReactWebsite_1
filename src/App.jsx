import Loading from "./Components/Loading";

import React, { useState, useEffect } from "react";
import MainPage from "./Components/Mainpage";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import BtcVisual from "./BtcVisual"
import EthVisual from "./EthVisual"

const App = () => {
	const [isLoading, setIsLoading] = useState(true); // Loading state

	useEffect(() => {
		// Set a timer for 3 seconds to transition to the main page
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer); // Cleanup the timer
	}, []);

	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
		  {isLoading ? <Loading /> : <MainPage />}
		</div>} />
		<Route path="/dashboard" element={<UserDashboard />} />
		<Route path="/btc" element={<BtcVisual/>}/>
      	<Route path="/eth" element={<EthVisual/>}/>
		</Routes>
		
		</BrowserRouter>
	  );
	  
};

export default App;



