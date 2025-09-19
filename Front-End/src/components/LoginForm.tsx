import { useEffect, useState } from "react"
import { useAppContext } from "../hooks/useAppContext";
import type { RegistrationData } from "../types/auth";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginForm = () => {

    const [state, setState] = useState('Login');
    const {setUser, setShowLogin} = useAppContext();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<RegistrationData>({
        fullName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmitRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(form);
            alert("Registration successful");
            navigate("/login");
        } catch (error: unknown) {
            if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
                alert((error as { response: { data: { message: string } } }).response.data.message);
            } else {
                alert("Registration failed");
            }
        }
    }
    const handleGoogleSuccess = (user: any) => {
        try {
            console.log("Google login success:", user);
            navigate('/');
            setUser(user);
            setShowLogin(false);
        } catch (error) {
            console.error("Error handling Google login success:", error);
        }
    };

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await loginUser(form);
            setUser(response.user);
            alert("Login is Successful");
            navigate('/');
        } catch(error: unknown){
            alert((error as { response: { data: { message: string } } }).response.data.message || "Login Failed")
        }
    }      

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        return (() => {
            document.body.style.overflow = 'unset'
        })
    }, [])

  return (
    <div 
        className="fixed flex-col inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center h-screen 
            bg-gradient-to-b from-blue-900/80 to-blue-950/90 shadow-lg w-80">
            {/* absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center */}
        <GoogleLoginButton onSuccess={handleGoogleSuccess} />
        <form 
            onSubmit={state === 'Login' ? handleSubmitLogin : handleSubmitRegistration}
            className="relative  p-10 rounded-xl text-slate-500 flex flex-col ">
            <h1 className="text-center text-2xl text-neutral-400 font-medium">{state}</h1>
            { state === 'Login' ? 
                <p className="text-sm text-sky-100">Wellcome back! Please sign in to continue</p>
                : 
                <p className="text-sm text-sky-100"> Wellcome! please Sign up to start</p>
             }

            {state !== 'Login' &&
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                    <input
                        name="fullName"
                        onChange={handleInputChange}
                        value={form.fullName}
                        className="outline-none text-sm" 
                        type="text" 
                        placeholder="Full Name" 
                        required
                    />
                </div>
            }
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                <input
                    name="email"
                    onChange={handleInputChange}
                    value={form.email}
                    className="outline-none text-sm" 
                    type="email" 
                    placeholder="Email" 
                    required
                />
            </div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                <input
                    name="password"
                    onChange={handleInputChange}
                    value={form.password}
                    className="outline-none text-sm" 
                    type="password" 
                    placeholder="Password" 
                    required
                />
            </div>
            {state === 'Login' &&
                <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot password?</p>
            }
            <button 
                type="submit"
                name="button"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-full 
                cursor-pointer hover:scale-105 transition-all duration-500 mt-4">
                {loading ? "Loading..." : (state === 'Login' ? "Login" : "Create account")}
            </button>

            {state === 'Login' ? 
                <p className="mt-5 text-center text-sky-50">Don't have an account? 
                    <span onClick={() => (setState('Sign up'))} className="text-blue-600 cursor-pointer">Sign up</span>
                </p>
                :
                <p className="mt-5 text-center text-sky-50">Allready have an account? 
                    <span onClick={() => (setState('Login'))} className="text-blue-600 cursor-pointer">Login</span>
                </p>
            }
            <img onClick={() => setShowLogin(false)} src={assets.cancel} alt="cancel" className="absolute top-5 right-5 cursor-pointer bg-blue-200  p-1 bg-clip-padding" />


        </form>
        
    </div>
  )
}

export default LoginForm