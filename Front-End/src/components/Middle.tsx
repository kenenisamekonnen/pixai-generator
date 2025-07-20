import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Middle = () => {

    const { user, setShowLogin } = useAppContext();
    const navigate = useNavigate();

    const onClickHandler = () => {
        if (!user) {
            setShowLogin(true);
        } else{
            navigate("/result");
        }
    }
  return (
    <motion.div className="flex flex-col justify-center items-center my-32 px-4"
        initial={{opacity:0.2, y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Want to see Magic, Try now</h1>
        <button
            onClick={onClickHandler}
            className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 hover:scale-105 transition-all duration-500
            flex items-center gap-2 rounded-full cursor-pointer">
            Generate Image
            <img width={50} src={assets.star} alt="" />
        </button>
    </motion.div>
  )
}

export default Middle