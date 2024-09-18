import FeatureCard from "./FeatureCard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Feature1 from "..//Images//feature1.png";
import StarIcon from "@mui/icons-material/Star";

const FeaturesSection = () => {
	return (
		<>
			<div className="w-screen h-[265vh] bg-zinc-900 flex justify-center items-center">
				<div className="absolute ">
					<div className="flex items-center space-x-4 pl-48 mb-10 pt-10">
						<StarIcon sx={{ fontSize: 50, color: "white" }} />
						<h1 className="text-green-500 text-6xl ">Features</h1>
					</div>
					{/* Large height to scroll */}
					<FeatureCard
						logo={AcUnitIcon}
						heading="Feature 1"
						image={Feature1}
						featureTitle="Transaction Tracking"
						featureDesc="Real-time tracking of cryptocurrency transactions."
						color="bg-white"
						zIndex="z-0" // Higher z-index to stack over the next card
					/>
					<FeatureCard
						logo={AcUnitIcon}
						heading="Feature 2"
						image={Feature1}
						featureTitle="Anonymity Bypass"
						featureDesc="Breaking tumblers and mixers to uncover identities."
						color="bg-lime-500"
						zIndex="z-10" // Lower z-index to appear beneath the first card
					/>
					<FeatureCard
						logo={AcUnitIcon}
						heading="Feature 3"
						image={Feature1}
						featureTitle="Security Monitoring"
						featureDesc="Detecting security threats in cryptocurrency."
						color="bg-green-600"
						zIndex="z-20" // Lowest z-index for the last card
					/>
				</div>
			</div>
		</>
	);
};

export default FeaturesSection;
