import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import FaqCards from "./FaqCards";

function Faq() {
	return (
		<>
			<div className="w-screen flex gap-10 p-10">
				<div className="flex-col items-center space-x-4 ml-10 bg-gray-200 p-5 rounded-lg">
					<LiveHelpIcon sx={{ fontSize: 150 }} />
					<h2 className="text-9xl font-bold text-green-600">F</h2>
					<h2 className="text-9xl font-bold text-green-700">A</h2>
					<h2 className="text-9xl font-bold text-green-800">Q</h2>
				</div>
				<div className="flex flex-col gap-3 justify-center items-center even:bg-acidgreen-dark odd:bg-black ">
					<FaqCards
						question="Lorem ipsum dolor sit amet, consectetur adipisicing elit ?"
						Answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a voluptatibus quod tempore sapiente recusandae pariatur sunt sequi beatae id!"
					/>
					<FaqCards
						question="Lorem ipsum dolor sit amet, consectetur adipisicing elit ?"
						Answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a voluptatibus quod tempore sapiente recusandae pariatur sunt sequi beatae id!"
					/>
					<FaqCards
						question="Lorem ipsum dolor sit amet, consectetur adipisicing elit ?"
						Answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a voluptatibus quod tempore sapiente recusandae pariatur sunt sequi beatae id!"
					/>
				</div>
			</div>
		</>
	);
}

export default Faq;
