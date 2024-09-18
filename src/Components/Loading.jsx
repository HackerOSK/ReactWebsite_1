import React from "react";
import radar from "..//Images//radar.webp";

function Loading() {
	return (
		<div className="flex items-center justify-center h-screen bg-black">
			<div className="flex flex-col items-center justify-center space-y-4">
				<img src={radar} alt="Radar" height={200} width={200} />
			</div>
		</div>
	);
}

export default Loading;
