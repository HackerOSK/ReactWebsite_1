import React from 'react';
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
      className={`w-full max-w-7xl mx-auto h-fit shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 lg:p-12 mb-8 sm:mb-10 md:mb-12 ${color} sticky top-0 ${zIndex}`}
    >
      {/* Left Side: Icon, Heading, and Image */}
      <div className="w-full lg:w-1/2 flex flex-col items-start space-y-4 lg:space-y-6 mb-6 lg:mb-0 lg:pr-6">
        {/* Icon and Heading */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <IconComponent sx={{ fontSize: { xs: 36, sm: 42, md: 50 } }} />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{heading}</h2>
        </div>

        {/* Feature Image */}
        <img src={image} alt="Feature" className="w-full h-auto rounded-md" />
      </div>

      {/* Right Side: Feature Title and Description */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-3 sm:space-y-4 lg:pl-6">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 pb-2 sm:pb-4 md:pb-6">
          {featureTitle}
        </h3>
        <p className="text-gray-600 text-base sm:text-lg">{featureDesc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

