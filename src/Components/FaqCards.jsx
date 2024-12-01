import AddCircleIcon from "@mui/icons-material/AddCircle";

const FaqCards = ({ question, Answer }) => {
	return (
		<div className="flex flex-col bg-zinc-800 p-6 md:p-8 lg:p-10 text-white rounded-md w-full md:w-10/12 lg:w-fit mx-auto">
			<div className="flex flex-row justify-between items-center">
				<h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{question}</h2>
				<AddCircleIcon sx={{ fontSize: { xs: 30, md: 40, lg: 50 } }} />
			</div>
			<div className="text-justify text-gray-500 text-sm md:text-base lg:text-lg mt-4">
				<p>{Answer}</p>
			</div>
		</div>
	);
};

export default FaqCards;
