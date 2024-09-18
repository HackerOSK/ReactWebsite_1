import {
	FaTwitter,
	FaLinkedin,
	FaGithub,
	FaFacebook,
	FaInstagram,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-zinc-900 text-white py-10 px-4">
			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
				{/* Logo and About */}
				<div className="flex flex-col items-center sm:items-start">
					<h2 className="text-3xl font-bold text-green-500 mb-4">MyLogo</h2>
					<p className="text-center sm:text-left text-gray-400">
						Empowering secure and transparent cryptocurrency transactions. Join
						us in building the future of decentralized finance.
					</p>
				</div>

				{/* Navigation Links */}
				<div className="flex flex-col items-center sm:items-start">
					<h3 className="text-xl font-semibold text-green-500 mb-4">
						Quick Links
					</h3>
					<ul className="space-y-2">
						<li>
							<a href="/" className="hover:text-green-500 transition-colors">
								Home
							</a>
						</li>
						<li>
							<a
								href="/about"
								className="hover:text-green-500 transition-colors"
							>
								About Us
							</a>
						</li>
						<li>
							<a
								href="/services"
								className="hover:text-green-500 transition-colors"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="/contact"
								className="hover:text-green-500 transition-colors"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>

				{/* Social Media & Newsletter */}
				<div className="flex flex-col items-center sm:items-start">
					<h3 className="text-xl font-semibold text-green-500 mb-4">
						Follow Us
					</h3>
					<div className="flex space-x-4 mb-6">
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noreferrer"
							className="hover:text-green-500"
						>
							<FaTwitter size={28} />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noreferrer"
							className="hover:text-green-500"
						>
							<FaLinkedin size={28} />
						</a>
						<a
							href="https://github.com"
							target="_blank"
							rel="noreferrer"
							className="hover:text-green-500"
						>
							<FaGithub size={28} />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noreferrer"
							className="hover:text-green-500"
						>
							<FaFacebook size={28} />
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noreferrer"
							className="hover:text-green-500"
						>
							<FaInstagram size={28} />
						</a>
					</div>

					<form className="w-full">
						<h3 className="text-xl font-semibold text-green-500 mb-4">
							Newsletter
						</h3>
						<input
							type="email"
							placeholder="Your email"
							className="w-full p-2 rounded-md text-black mb-4"
						/>
						<button className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors">
							Subscribe
						</button>
					</form>
				</div>
			</div>

			<div className="mt-10 border-t border-gray-700 pt-6 text-center">
				<p className="text-gray-400">
					&copy; 2024 YourCompany. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
