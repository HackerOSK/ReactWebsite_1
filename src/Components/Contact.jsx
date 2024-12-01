import CallIcon from "@mui/icons-material/Call";
import ContactCard from "./ContactCard";
import PlaceIcon from "@mui/icons-material/Place";
import { Email, Phone } from "@mui/icons-material";

function Contact() {
	return (
		<div className="flex flex-col px-6 md:px-12 lg:px-20 py-10 space-y-6">
			{/* Header Section */}
			<div className="flex flex-col items-center md:items-start md:ml-10 lg:ml-20 space-y-4">
				<div className="flex items-center space-x-4">
					<CallIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-500">
						Get in Touch
					</h2>
				</div>
				<p className="text-center md:text-left text-base md:text-lg lg:text-xl text-gray-700">
					We'd love to hear from you!
				</p>
			</div>

			{/* Contact Cards Section */}
			<div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
				<ContactCard
					logo={Email}
					name="Email"
					des="Reach out anytime for inquiries or collaborations."
					link="mailto:xyz@gmail.com"
				/>
				<ContactCard
					logo={Phone}
					name="Phone"
					des="Call us for quick support or questions."
					link="tel:8978657781"
				/>
				<ContactCard
					logo={PlaceIcon}
					name="Office"
					des="Visit us for a face-to-face chat. And get a tour of our office."
					link="#"
				/>
			</div>
		</div>
	);
}

export default Contact;
