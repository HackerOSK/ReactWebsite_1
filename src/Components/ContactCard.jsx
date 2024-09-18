const ContactCard = ({ logo, name, des, link }) => {
	const Logo = logo;
	return (
		<>
			<div className="w-fit h-fit rounded-xl hover:bg-gray-200 p-5 flex flex-col justify-center items-left gap-2">
				<Logo sx={{ fontSize: 50 }} />
				<h2 className="text-2xl font-bold text-black">{name}</h2>
				<p className="text-black">{des}</p>
				<a href={link} target="_blank" className="text-white">
					<button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-300">
						Visit
					</button>
				</a>
			</div>
		</>
	);
};

export default ContactCard;
