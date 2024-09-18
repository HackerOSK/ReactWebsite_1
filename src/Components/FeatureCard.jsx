import { Icon } from "@mui/material";

const FeatureCard = ({
	logo,
	heading,
	image,
	featureTitle,
	featureDesc,
	color,
	zIndex,
}) => {
	const IconComponent = logo;

	return (
		<div
			className={`w-11/12 md:w-10/12 lg:w-9/12 xl:w-12/12 mx-auto h-fit gap-7 text-6xl shadow-lg rounded-lg overflow-hidden flex p-16 mb-12 ${color} sticky top-0 ${zIndex}`}
		>
			{/* Left Side: Icon, Heading, and Image */}
			<div className="w-full md:w-1/2 flex flex-col items-start space-y-6">
				{/* Icon and Heading */}
				<div className="flex items-center space-x-4">
					<IconComponent sx={{ fontSize: 50 }} />
					<h2 className="text-3xl font-bold text-gray-800">{heading}</h2>
				</div>

				{/* Feature Image */}
				<img src={image} alt="Feature" className="w-full h-auto rounded-md" />
			</div>

			{/* Right Side: Feature Title and Description */}
			<div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
				<h3 className="text-5xl font-bold text-gray-800 pb-6">
					{featureTitle}
				</h3>
				<p className="text-gray-600 text-lg ">{featureDesc}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
