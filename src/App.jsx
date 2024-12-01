import Loading from "./Components/Loading";

import React, { useState, useEffect } from "react";
import MainPage from "./Components/Mainpage";

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
		<div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
		  {isLoading ? <Loading /> : <MainPage />}
		</div>
	  );
	  
};

export default App;
