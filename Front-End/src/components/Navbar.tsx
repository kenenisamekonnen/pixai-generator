import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../hooks/useAppContext";
import { assets } from "../assets/assets";
import { logout } from "../services/authService";

const Navbar = () => {

  const navigate = useNavigate();
  const {user, setShowLogin, setUser, credit} = useAppContext();

  const handleLogout = async () => {
    // Clear user data and navigate to home
    setUser(null);
    logout();
    navigate("/");
  }

  // If user is not logged in, redirect to login page
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);


  return (
    <div className="flex items-center justify-between pt-2">
      {/* logo */}
      <div className=" inline-block px-4 py-2 rounded-lg bg-white/10 backdrop-blur shadow-md hover:scale-105 transition-all duration-700">
        <Link to={"/"} className="flex items-center">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
            PixAi
          </span>
        </Link>
      </div>

      <div>
        {user ? 
          <div className="flex items-center gap-2 ">
            <button onClick={() => navigate("/buy")} className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 
                py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 cursor-pointer">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Credit left: {credit}</p>
            </button>
            <p className="text-gray-200 max-sm:hidden pl-4">
              Hi, {user.fullName}
            </p>
            <div className="relative group cursor-pointer">
              <img src={assets.userImage} className="w-10 drop-shadow cursor-pointer" alt="profile" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-1 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10" onClick={handleLogout}>logout</li>
                </ul>
              </div>
            </div>
          </div>
          :
          <div className="flex items-center gap-2 sm:gap-2">
            <p className="text-blue-200 text-2xl cursor-pointer"
                onClick={ () => navigate("/buy")}
              >
              Pricing
            </p>
            <button onClick={() => setShowLogin(true)} className="bg-gradient-to-b from-red-400 to-blue-500 text-sm text-white px-7 py-2 sm:px-10 
            rounded-full cursor-pointer hover:scale-105 transition-all duration-700 hover:bg-zinc-500">
              login
            </button>
          </div>
        }
        
      </div>
    </div>
    
  )
}

export default Navbar