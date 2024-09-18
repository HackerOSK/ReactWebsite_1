import AddCircleIcon from "@mui/icons-material/AddCircle";

const FaqCards = ({ question, Answer }) => {
	return (
		<>
			<div className="flex flex-col bg-zinc-800 p-10 text-white rounded-md">
				<div className="flex flex-row justify-between items-center">
					<h2 className="text-3xl font-bold">{question}</h2>
					<AddCircleIcon sx={{ fontSize: 50 }} />
				</div>
				<div className="text-justify w-7/12 text-gray-500 text-lg">
					<p>{Answer}</p>
				</div>
			</div>
		</>
	);
};

export default FaqCards;
