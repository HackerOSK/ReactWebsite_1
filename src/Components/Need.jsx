import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

function Need() {
	return (
		<section className="p-6 md:p-12 bg-gray-100 pt-20 md:pt-36">
			{/* Need Section */}
			<div className="flex flex-col md:flex-row items-center mb-10 gap-7">
				<ReportProblemIcon sx={{ fontSize: 50 }} color="green" />
				<h1 className="text-3xl md:text-5xl text-green-500 font-bold text-center md:text-left">
					Challenge
				</h1>
			</div>

			{/* Problem Description Section */}
			<div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
				{/* Main Problem Description */}
				<div className="w-full md:w-1/2 mb-8 md:mb-0">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
						The Critical Need for Effective Cryptocurrency Tracking
					</h2>
				</div>

				{/* List of Key Problems */}
				<div className="w-full md:w-1/2 space-y-4">
					<ul className="list-none pl-6 space-y-2">
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">$1B </span>
							Anonymity of cryptocurrencies
						</li>
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">$7B </span>
							Obfuscation with tumblers and mixers
						</li>
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">$5T </span>
							Inefficient tracking tools
						</li>
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">$8B </span>
							Complex transaction paths
						</li>
					</ul>
				</div>
			</div>

			{/* Solution Section */}
			<div className="flex flex-col md:flex-row items-center mb-10 gap-4">
				<EmojiObjectsIcon sx={{ fontSize: 55 }} color="green" />
				<h1 className="text-3xl md:text-5xl text-green-500 font-medium text-center md:text-left">
					Our Solution
				</h1>
			</div>

			{/* Solution Description Section */}
			<div className="flex flex-col md:flex-row justify-between items-start">
				{/* Main Solution Description */}
				<div className="w-full md:w-1/2 mb-8 md:mb-0">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
						How Our Software Solves the
					</h2>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
						Problem
					</h2>
				</div>

				{/* List of Key Solutions */}
				<div className="w-full md:w-1/2 space-y-4">
					<ul className="list-none pl-6 space-y-2">
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">99% </span>
							Trace entire transaction trails
						</li>
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">90% </span>
							Identify real recipients effectively
						</li>
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">$5B </span>
							Real-time monitoring and alerts
						</li>
						<li className="hover:bg-green-400 transition duration-300 border-b-1 text-lg md:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-md w-full border-b-2 border-zinc-400">
							<span className="font-bold text-3xl md:text-5xl mr-4">$7T </span>
							Seamless integration with tools
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}

export default Need;
