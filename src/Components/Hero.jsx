import backvid from "..//Images//Hero.mp4";

function Hero() {
	return (
		<div className="relative h-screen w-full overflow-hidden">
			{/* Video Background */}
			<video
				className="absolute top-0 left-0 w-full h-full object-cover"
				src={backvid}
				autoPlay
				loop
				muted
			></video>

			{/* Overlay on Left Side */}
			<div className="absolute top-0 left-0 h-full w-1/2 bg-black bg-opacity-50"></div>

			{/* Left-Aligned Content */}
			<div className="relative z-10 h-full flex flex-col justify-center text-left p-12 text-white w-1/2">
				<h1 className="text-7xl font-bold mb-4">
					Track Cryptocurrency Transactions
				</h1>
				<p className="text-2xl mb-4">
					Efficient and secure transaction tracking. Built with cutting-edge
					technology.Identify the end receiver easily.Ensure transparency in the
					blockchain.
				</p>
				<div className="flex space-x-4">
					{/* Hacker Green Button */}
					<button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-300">
						Get Started
					</button>

					{/* Transparent Button */}
					<button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300">
						Learn More
					</button>
				</div>
			</div>
		</div>
	);
}

export default Hero;
