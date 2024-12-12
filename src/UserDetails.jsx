// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Info, User, Calendar, Flag, MapPin } from 'lucide-react';

export const Card = ({ children, className }) => (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );

export const Badge = ({ children, className }) => (
    <span className={`px-2 py-1 text-xs font-semibold bg-green-500 text-black rounded-md ${className}`}>
      {children}
    </span>
  );

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
};

const users = [
  {
    lat: "45.3658443",
    location: "Croatia 🇭🇷",
    lon: "15.6575209",
    name: "cdb_main 🖌🌟🚀",
    profile_image_url_https: "https://pbs.twimg.com/profile_images/1823673257616400384/6AUX1FjN_normal.jpg",
  },
  {
    lat: "43.207178",
    location: "Concord",
    lon: "-71.537476",
    name: "Ki Kain",
    profile_image_url_https: "https://pbs.twimg.com/profile_images/1635023807302844420/IJyadmWe_normal.jpg",
  },
  {
    lat: "17.509599",
    location: "Quảng Bình, Vietnam",
    lon: "106.4004452",
    name: "Anh Sỹ",
    profile_image_url_https: "https://pbs.twimg.com/profile_images/1805424918412279809/mcca6OIN_normal.jpg",
  },
];

export default function InvestigativeInterface() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    setSelectedUser(randomUser);
  }, []);

  if (!selectedUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8 font-sans">
      {/* Header */}
      <motion.header
        className="border-b border-gray-700 pb-4 mb-8"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400">
          Trailfinders BioData
        </h1>
      </motion.header>

      {/* Main Content */}
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Left Column - Photo and Basic Info */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={slideIn}
        >
          <Card className="bg-gray-800 border border-gray-700 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-0">
              <motion.img
                src={selectedUser.profile_image_url_https}
                alt="Subject photograph"
                className="w-full h-[400px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Card>

          <Card className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-4">
              <motion.div className="space-y-4" variants={fadeIn}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Name</span>
                  <span className="text-blue-200">{selectedUser.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <Badge className="bg-red-500 text-white text-sm py-1 px-2 rounded-full">
                    HIGH RISK
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Location</span>
                  <span className="text-green-300">{selectedUser.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Latitude</span>
                  <span className="text-yellow-300">{selectedUser.lat}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Longitude</span>
                  <span className="text-yellow-300">{selectedUser.lon}</span>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={slideIn}
        >
          <Card className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Case Details
              </h2>
              <motion.div className="grid gap-6" variants={fadeIn}>
                <div className="grid grid-cols-[120px_1fr] gap-4">
                  <span className="text-gray-400 flex items-center">
                    <User className="w-5 h-5 mr-2" /> Full Name
                  </span>
                  <span className="text-blue-200">{selectedUser.name}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4">
                  <span className="text-gray-400 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" /> Location
                  </span>
                  <span className="text-yellow-300">{selectedUser.location}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4">
                  <span className="text-gray-400 flex items-center">
                    <Flag className="w-5 h-5 mr-2" /> Latitude
                  </span>
                  <span className="text-green-300">{selectedUser.lat}</span>
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-4">
                  <span className="text-gray-400 flex items-center">
                    <Flag className="w-5 h-5 mr-2" /> Longitude
                  </span>
                  <span className="text-purple-300">{selectedUser.lon}</span>
                </div>
              </motion.div>
            </div>
          </Card>

          <Card className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">
                Investigation Notes
              </h2>
              <motion.div
                className="text-sm space-y-4 text-gray-300"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                <p>Subject currently under investigation for multiple violations of federal law.</p>
                <p>Multiple witnesses have provided corroborating testimony.</p>
                <p>Electronic surveillance authorized under warrant #45-B-2024.</p>
              </motion.div>
            </div>
          </Card>

          <Card className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                <Fingerprint className="w-5 h-5" />
                Media Data
              </h2>
              <motion.div
                className="grid grid-cols-5 gap-4"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
              >
                {[1, 2, 3, 4, 5].map((index) => (
                  <motion.div
                    key={index}
                    className="aspect-square bg-gray-900 border border-gray-700 rounded-lg p-2 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05, borderColor: "#60a5fa" }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt={`Fingerprint ${index}`} 
                      className="w-full h-full object-contain opacity-50"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
