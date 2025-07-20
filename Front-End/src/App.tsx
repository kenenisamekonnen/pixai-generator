
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Navbar from "./components/Navbar"
import BuyCredit from "./pages/BuyCredit"
import LoginForm from "./components/LoginForm"
import { useAppContext } from "./hooks/useAppContext"
import Footer from "./components/Footer"

const App = () => {

  const { showLogin } = useAppContext();

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px:28 min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">

       {/* bg-gradient-to-b from-blue-950 via-teal-800 to-blue-950 */}
       {/* from-fuchsia-800 to-blue-900 */}

      {/* px-4 sm:px-10 md:px-14 lg:px:28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 */}

      <Navbar />
      
      {/* Show login form if showLogin is true */}
      {showLogin && <LoginForm />}
     
     

      {/* Main Routes */}
      {/* <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />}/>
      </Routes>

      <Footer />
    
        
    </div>
  )
}

export default App