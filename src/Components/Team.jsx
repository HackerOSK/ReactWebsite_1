import GroupsIcon from "@mui/icons-material/Groups";
import TeamCard from "./TeamCard";
import MyPhoto from "../Images/MyAvatar.avif";
import team1 from "../Images/team1.avif";
import team2 from "../Images/team2.avif";
import team3 from "../Images/team3.avif";
import team4 from "../Images/team4.avif";
import team5 from "../Images/team5.avif";

function Team() {
	return (
		<>
			<div className="bg-zinc-900 h-[100vw]">
				<div className="flex flex-col justify-center items-center mt-20 ">
					<GroupsIcon sx={{ fontSize: 150, color: "white" }} />
					<h1 className="text-6xl font-bold text-center text-green-500 ">
						Our Team
					</h1>
					<p className="text-l pt-5 text-center text-white ">
						Meet the talented individuals behind our projects.
					</p>
				</div>
				<div className="grid grid-rows-3 grid-cols-3 gap-8 p-10">
					<TeamCard
						photo={team1}
						cname="Jone Snow"
						role="Founder & CEO"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor
                    tellus elementum, eget mollis ex placerat."
						github="https://github.com/HackerOSK"
						linkedin="https://www.linkedin.com/omithecoder"
						email="omkarkhanvilkar46gmail.com"
					/>
					<TeamCard
						photo={team2}
						cname="Jone Snow"
						role="Founder & CEO"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor
                    tellus elementum, eget mollis ex placerat."
						github="https://github.com/HackerOSK"
						linkedin="https://www.linkedin.com/omithecoder"
						email="omkarkhanvilkar46gmail.com"
					/>
					<TeamCard
						photo={team3}
						cname="Jone Snow"
						role="Founder & CEO"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor
                    tellus elementum, eget mollis ex placerat."
						github="https://github.com/HackerOSK"
						linkedin="https://www.linkedin.com/omithecoder"
						email="omkarkhanvilkar46gmail.com"
					/>
					<TeamCard
						photo={team4}
						cname="Jone Snow"
						role="Founder & CEO"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor
                    tellus elementum, eget mollis ex placerat."
						github="https://github.com/HackerOSK"
						linkedin="https://www.linkedin.com/omithecoder"
						email="omkarkhanvilkar46gmail.com"
					/>
					<TeamCard
						photo={team5}
						cname="Jone Snow"
						role="Founder & CEO"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor
                    tellus elementum, eget mollis ex placerat."
						github="https://github.com/HackerOSK"
						linkedin="https://www.linkedin.com/omithecoder"
						email="omkarkhanvilkar46gmail.com"
					/>
					<TeamCard
						photo={MyPhoto}
						cname="Jone Snow"
						role="Founder & CEO"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor
                    tellus elementum, eget mollis ex placerat."
						github="https://github.com/HackerOSK"
						linkedin="https://www.linkedin.com/omithecoder"
						email="omkarkhanvilkar46gmail.com"
					/>
				</div>
			</div>
			<p></p>
		</>
	);
}

export default Team;
