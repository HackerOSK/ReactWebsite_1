import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FeatureCard from "./FeatureCard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import StarIcon from "@mui/icons-material/Star";
import Feature1 from "../Images/feature1.png";

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function for the animation
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-center sm:justify-start space-x-4 mb-10">
          <StarIcon
            sx={{ fontSize: { xs: 36, sm: 42, md: 50 }, color: "white" }}
          />
          <h1 className="text-green-500 text-4xl sm:text-5xl md:text-6xl font-bold">
            Features
          </h1>
        </div>
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          <div data-aos="fade-up" data-aos-delay="100">
            <FeatureCard
              logo={AcUnitIcon}
              heading="Feature 1"
              image={Feature1}
              featureTitle="Transaction Tracking"
              featureDesc="Real-time tracking of cryptocurrency transactions."
              color="bg-white"
              zIndex="z-20"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <FeatureCard
              logo={AcUnitIcon}
              heading="Feature 2"
              image={Feature1}
              featureTitle="Anonymity Bypass"
              featureDesc="Breaking tumblers and mixers to uncover identities."
              color="bg-lime-500"
              zIndex="z-10"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <FeatureCard
              logo={AcUnitIcon}
              heading="Feature 3"
              image={Feature1}
              featureTitle="Security Monitoring"
              featureDesc="Detecting security threats in cryptocurrency."
              color="bg-green-600"
              zIndex="z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
