import ProductUsingGif from "../Images/Product demo GIF.gif";
import CategoryIcon from "@mui/icons-material/Category";

const Demo = () => {
	return (
		<>
			<div
				className={`w-11/12 md:w-10/12 lg:w-9/12 xl:w-screen mx-auto h-fit gap-7  rounded-lg overflow-hidden flex p-6 mb-12`}
			>
				{/* Left Side: Icon, Heading, and Image */}
				<div className="w-full md:w-1/2 flex flex-col items-start space-y-6 p-6">
					{/* Icon and Heading */}
					<div className="flex items-center space-x-4">
						<CategoryIcon sx={{ fontSize: 50 }} />
						<h2 className="text-5xl font-bold text-green-500">Try Our Demo</h2>
					</div>

					{/* Feature Image */}
					<img
						src={ProductUsingGif}
						alt="Feature"
						className="w-full h-auto rounded-md"
					/>
				</div>

				{/* Right Side: Feature Title and Description */}
				<div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
					<h3 className="text-5xl font-bold text-gray-800 pb-6">
						Lorem ipsum dolor sit amet consectetur.
					</h3>
					<p className="text-gray-600 text-lg ">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
						voluptatibus ducimus necessitatibus sequi veniam ab distinctio eaque
						dicta tempore vero.
					</p>
					<div className="flex space-x-4">
						{/* Hacker Green Button */}
						<button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-300">
							Get Started
						</button>

						{/* Transparent Button */}
						<button className="px-6 py-3 bg-transparent border-2 border-gray-200 text-black font-semibold rounded-lg hover:bg-gray-200 hover:text-black transition duration-300">
							Learn More
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Demo;
