import ProductUsingGif from "../Images/benifits1.gif";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocationSearchingSharpIcon from "@mui/icons-material/LocationSearchingSharp";
import TuneIcon from "@mui/icons-material/Tune";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

function Benefits() {
	return (
		<div className="w-fit md:w-10/12 lg:w-9/12 xl:w-fit mx-auto h-fit bg-acidgreen-dark rounded-lg overflow-hidden flex flex-col md:flex-row p-6 md:p-10 mb-12 gap-6 shadow-lg">
			{/* Left Side: Text Content */}
			<div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
				<div className="flex items-center space-x-4">
					<LoyaltyIcon sx={{ fontSize: 40, md: 50 }} />
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900">
						Benefits
					</h2>
				</div>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 pb-4">
					Lorem ipsum dolor sit amet consectetur.
				</h3>
				<ul className="list-none space-y-4">
					<li className="hover:bg-green-100 transition duration-300 border-b-2 text-lg md:text-xl lg:text-2xl px-6 py-4 rounded-md border-zinc-900 flex items-center">
						<CurrencyBitcoinIcon
							sx={{ fontSize: 30, md: 40 }}
							className="mr-4 text-green-900"
						/>
						Anonymity of cryptocurrencies
					</li>
					<li className="hover:bg-green-100 transition duration-300 border-b-2 text-lg md:text-xl lg:text-2xl px-6 py-4 rounded-md border-zinc-900 flex items-center">
						<TuneIcon
							sx={{ fontSize: 30, md: 40 }}
							className="mr-4 text-green-900"
						/>
						Obfuscation with tumblers and mixers
					</li>
					<li className="hover:bg-green-100 transition duration-300 border-b-2 text-lg md:text-xl lg:text-2xl px-6 py-4 rounded-md border-zinc-900 flex items-center">
						<LocationSearchingSharpIcon
							sx={{ fontSize: 30, md: 40 }}
							className="mr-4 text-green-900"
						/>
						Efficient tracking tools
					</li>
				</ul>
			</div>

			{/* Right Side: Image */}
			<div className="w-full md:w-1/2 flex items-center justify-center">
				<img
					src={ProductUsingGif}
					alt="Feature"
					className="w-full h-auto rounded-md object-cover"
				/>
			</div>
		</div>
	);
}

export default Benefits;
