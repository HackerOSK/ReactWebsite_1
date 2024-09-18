import ProductUsingGif from "..//Images//benifits1.gif";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocationSearchingSharpIcon from "@mui/icons-material/LocationSearchingSharp";
import TuneIcon from "@mui/icons-material/Tune";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

function Benefits() {
	return (
		<>
			<div
				className={`w-11/12 md:w-10/12 lg:w-9/12 xl:w-screen mx-auto h-fit  bg-acidgreen-dark rounded-lg overflow-hidden flex p-10 mb-12`}
			>
				{/* Left Side: Icon, Heading, and Image */}

				{/* Right Side: Feature Title and Description */}
				<div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
					<div className="flex items-center space-x-4">
						<LoyaltyIcon sx={{ fontSize: 50 }} />
						<h2 className="text-5xl font-bold text-green-900">Benefits </h2>
					</div>
					<h3 className="text-5xl font-bold text-gray-800 pb-6">
						Lorem ipsum dolor sit amet consectetur.
					</h3>
					<div className="w-screen space-y-4">
						<ul className="list-none pl-6">
							<li className="hover:bg-green-100 transition duration-300 border-b-1 text-2xl px-10 py-5 rounded-md w-5/12 border-b-2 border-zinc-900">
								<CurrencyBitcoinIcon sx={{ fontSize: 50 }} className="mr-4" />
								Anonymity of cryptocurrencies
							</li>
							<li className="hover:bg-green-100 transition duration-300 border-b-1 text-2xl px-10 py-5 rounded-md w-5/12 border-b-2 border-zinc-900">
								<TuneIcon sx={{ fontSize: 50 }} className="mr-4" />
								Obfuscation with tumblers and mixers
							</li>
							<li className="hover:bg-green-100 transition duration-300 border-b-1 text-2xl px-10 py-5 rounded-md w-5/12 border-b-2 border-zinc-900">
								<LocationSearchingSharpIcon
									sx={{ fontSize: 50 }}
									className="mr-4"
								/>
								Efficient tracking tools
							</li>
						</ul>
					</div>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-start space-y-6">
					{/* Icon and Heading */}

					{/* Feature Image */}
					<img
						src={ProductUsingGif}
						alt="Feature"
						className="w-full h-auto rounded-md"
					/>
				</div>
			</div>
		</>
	);
}

export default Benefits;
