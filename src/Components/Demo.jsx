import ProductUsingGif from "../Images/Product demo Gif.gif";
import CategoryIcon from "@mui/icons-material/Category";

const Demo = () => {
	return (
		<div className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-11/12 mx-auto h-fit gap-7 rounded-lg overflow-hidden flex flex-col md:flex-row p-4 md:p-6 mb-12 bg-white shadow-lg">
			{/* Left Side: Icon, Heading, and Image */}
			<div className="w-full md:w-1/2 flex flex-col items-start space-y-4 md:space-y-6">
				{/* Icon and Heading */}
				<div className="flex items-center space-x-3 md:space-x-4">
					<CategoryIcon sx={{ fontSize: 40, md: 50 }} />
					<h2 className="text-3xl md:text-5xl font-bold text-green-500">
						Try Our Demo
					</h2>
				</div>

				{/* Feature Image */}
				<img
					src={ProductUsingGif}
					alt="Feature"
					className="w-full h-auto rounded-md object-cover"
				/>
			</div>

			{/* Right Side: Feature Title and Description */}
			<div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
				<h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 pb-4">
					Lorem ipsum dolor sit amet consectetur.
				</h3>
				<p className="text-gray-600 text-base md:text-lg leading-relaxed">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
					voluptatibus ducimus necessitatibus sequi veniam ab distinctio eaque
					dicta tempore vero.
				</p>
				<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
					{/* Hacker Green Button */}
					<button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300">
						Get Started
					</button>

					{/* Transparent Button */}
					<button className="px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 hover:text-black transition duration-300">
						Learn More
					</button>
				</div>
			</div>
		</div>
	);
};

export default Demo;
