import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import FaqCards from "./FaqCards";

function Faq() {
	return (
		<div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 p-6 lg:p-10">
			{/* FAQ Icon Section */}
			<div className="flex flex-row lg:flex-col items-center lg:items-start bg-gray-200 p-4 lg:p-6 rounded-lg">
				<LiveHelpIcon sx={{ fontSize: { xs: 80, md: 120, lg: 150 } }} />
				<div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-2">
	<h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-green-600">F</h2>
	<h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-green-700">A</h2>
	<h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-green-800">Q</h2>
</div>

			</div>

			{/* FAQ Cards Section */}
			<div className="flex flex-col gap-4 lg:gap-6 w-full">
				<FaqCards
					question="Lorem ipsum dolor sit amet, consectetur adipisicing elit?"
					Answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a voluptatibus quod tempore sapiente recusandae pariatur sunt sequi beatae id!"
				/>
				<FaqCards
					question="Lorem ipsum dolor sit amet, consectetur adipisicing elit?"
					Answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a voluptatibus quod tempore sapiente recusandae pariatur sunt sequi beatae id!"
				/>
				<FaqCards
					question="Lorem ipsum dolor sit amet, consectetur adipisicing elit?"
					Answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a voluptatibus quod tempore sapiente recusandae pariatur sunt sequi beatae id!"
				/>
			</div>
		</div>
	);
}

export default Faq;
