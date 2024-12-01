import React from "react";
import radar from "../Images/radar.webp";

function Loading() {
	return (
		<div className="flex items-center justify-center h-screen bg-black">
			<div className="flex flex-col items-center justify-center space-y-4">
				<img
					src={radar}
					alt="Radar"
					className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
				/>
			</div>
		</div>
	);
}

export default Loading;
