import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	LogInOutline,
	NewspaperOutline,
	NotificationsOutline,
	PeopleOutline,
	PieChartOutline,
} from "react-ionicons";
import { Link } from "react-router-dom";
const Sidebar = () => {
	const logout = () => {
		// Remove user data from local storage
		localStorage.removeItem("user");
	};
	const navLinks = [
		{
			title: "Home",
			icon: (
				<HomeOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Boards",
			icon: (
				<AppsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: true,
		},
		{
			title: "Projects",
			icon: (
				<GridOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Analytics",
			icon: (
				<PieChartOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Workflows",
			icon: (
				<PeopleOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Notifications",
			icon: (
				<NotificationsOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
		{
			title: "Newsletter",
			icon: (
				<NewspaperOutline
					color="#555"
					width="22px"
					height="22px"
				/>
			),
			active: false,
		},
	];
	interface UserData {
		email: string;
		password: string;
		// Add any other fields relevant to your user data
	}

	// Get the user data from localStorage, with null handling
	const user_data: UserData | null = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user") as string)
		: null;
	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
			<div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
				<span className="text-orange-400 font-semibold text-2xl md:block hidden">Logo.</span>
				<span className="text-orange-400 font-semibold text-2xl md:hidden block">L.</span>
			</div>
			<div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
				{navLinks.map((link) => {
					return (
						<div
							key={link.title}
							className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${link.active ? "bg-orange-300" : "bg-transparent"
								}`}
						>
							{link.icon}
							<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
						</div>
					);
				})}
				{/* Conditional rendering for logout */}
				{user_data && user_data.email != "" && user_data.password != "" ? (
					<div onClick={logout} className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
						<LogOutOutline />
						<span className="font-medium text-[15px] md:block hidden" >Log Out</span>
					</div>
				) : (
					<div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
						<LogInOutline />
						<Link
							className="font-medium text-[15px] md:block hidden no-underline text-black"
							to="/Login"
						>
							Log In
						</Link>

					</div>
				)}

			</div>
		</div>
	);
};

export default Sidebar;
