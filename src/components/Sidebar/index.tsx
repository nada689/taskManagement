import { 
  
	LogOutOutline, 
	LogInOutline, 
	
   } from "react-ionicons"; 
   import { Link } from "react-router-dom"; 
   const Sidebar = () => { 
	const logout = () => { 
	 // Remove user data from local storage 
	 localStorage.removeItem("user"); 
	}; 
	 
	 
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
	   
	  <div className="w-full border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative"> 
		
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
		  to="/Signup" 
		 > 
		  Sign Up 
		 </Link> 
	
		</div> 
	   )} 
	
	  </div> 
	 </div> 
	); 
   }; 
	
   export default Sidebar;
