import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import SignUp from "../Signup/index.js";
import Login from "../Login/index.js";
///////////routeObject من اسمها بيسهل عمليه الstructure
const routes: RouteObject[] = [
	
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				children: [
					{
						path: "",
						element: <Boards />,
					},
					{
						path: "/SignUp",
						element: <SignUp />,
						
					},
					{
						path: "/Login",
						element: <Login />,
						
					},
				],
			},
		],
	},
	
];

export default routes;
