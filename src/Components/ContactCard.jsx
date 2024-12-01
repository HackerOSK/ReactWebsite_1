const ContactCard = ({ logo, name, des, link }) => {
	const Logo = logo;
	return (
		<div className="w-full sm:w-72 h-auto bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col justify-center items-center gap-4 hover:bg-gray-200">
			{/* Logo icon */}
			<Logo sx={{ fontSize: 50 }} />
			{/* Name */}
			<h2 className="text-xl sm:text-2xl font-bold text-black">{name}</h2>
			{/* Description */}
			<p className="text-sm sm:text-base text-gray-700 text-center">{des}</p>
			{/* Visit Button */}
			<a href={link} target="_blank" rel="noopener noreferrer">
				<button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 w-full">
					Visit
				</button>
			</a>
		</div>
	);
};

export default ContactCard;
