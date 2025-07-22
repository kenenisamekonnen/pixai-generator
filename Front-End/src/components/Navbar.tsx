import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../hooks/useAppContext";
import { assets } from "../assets/assets";
import { logout } from "../services/authService";
import { useState } from "react";

const Navbar = () => {

  const navigate = useNavigate();
  const {user, setShowLogin, setUser, credit} = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="hidden md:flex items-center gap-6">
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
        

        {/* mobile menu button */}
        <div
          data-testid="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center">
          <button
            className="p-2 rounded-md text-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer ">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"            >
              {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
            </svg>
          </button>

        </div>
        
      </div>

      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in absolute top-16 right-0 bg-gradient-to-r from-white to-gray-300 shadow-lg rounded-lg p-4 w-48 z-10 cursor-zoom-in">
          {user ? (
            <ul className="list-none m-0 p-0" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer"><p className="text-gray-600">Credit left: {credit}</p></li>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer" onClick={() => navigate("/buy")}>
                Buy Credits
              </li>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          ): (
            <ul>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer" onClick={() => navigate("/buy")}>
                Pricing
              </li>
              <li className="py-2 px-4 hover:bg-fuchsia-200 cursor-pointer" onClick={() => setShowLogin(true)}>
                Login
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
    
  )
}

export default Navbar