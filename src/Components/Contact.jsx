import CallIcon from "@mui/icons-material/Call";
import ContactCard from "./ContactCard";
import PlaceIcon from "@mui/icons-material/Place";
import { Email, Phone } from "@mui/icons-material";

function Contact() {
	return (
		<>
			<div className="flex flex-col p-10">
				<div className="flex items-center space-x-4 ml-20">
					<CallIcon sx={{ fontSize: 50 }} />
					<h2 className="text-5xl font-bold text-green-500">Get in Touch</h2>
				</div>
				<h2 className="ml-24 text-xl pb-10">We had love to hear from you!</h2>
				<div className="flex flex-row justify-center items-center gap-8">
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
						link="phone:8978657781"
					/>
					<ContactCard
						logo={PlaceIcon}
						name="Office"
						des="Visit us for a face-to-face chat.And get a tour of our office."
						link="mailto:xyz@gmail.com"
					/>
				</div>
			</div>
		</>
	);
}

export default Contact;
