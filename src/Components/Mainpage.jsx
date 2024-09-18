import ResponsiveAppBar from "./Navbar";
import Hero from "./Hero";
import Need from "./Need";
import Features from "./Features";
import Demo from "./Demo";
import Benefits from "./Benefits";
import Faq from "./Faq";
import Team from "./Team";
import Contact from "./Contact";
import Footer from "./Footer";

function MainPage() {
	return (
		<>
			<div className="overflow-hidden">
				<ResponsiveAppBar />
				<Hero />
				<Need />
				<Features />
				<Demo />
				<Benefits />
				<Faq />
				<Team />
				<Contact />
				<Footer />
			</div>
		</>
	);
}

export default MainPage;
