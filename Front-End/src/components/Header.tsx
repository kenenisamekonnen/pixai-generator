import { useNavigate } from "react-router-dom"
import { useAppContext } from "../hooks/useAppContext";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const {user, setShowLogin, showLogin} = useAppContext();
    const [typedText, setTypedText] = useState('');
    const fullText = 'Type, Click, Create — AI at Work';
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [colorIndex, setColorIndex] = useState(0);

    const pattern = [assets.catFlying, assets.catSnow, assets.catFlying, assets.catSnow];
    const colors = ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-green-400'];

    useEffect(() => {
        const typingSpeed = isDeleting ? 90 : 160;
        const pauseAfterTyping = 2500;
        const pauseAfterDeleting = 800;

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < fullText.length) {
            setTypedText(fullText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
            } else if (!isDeleting && charIndex === fullText.length) {
            setTimeout(() => {
                setIsDeleting(true);
                setColorIndex((prev) => (prev + 1) % colors.length); // next color
            }, pauseAfterTyping);
            } else if (isDeleting && charIndex > 0) {
            setOpacity(0.6);
            setTypedText(fullText.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
            } else if (isDeleting && charIndex === 0) {
            setOpacity(1);
            setTimeout(() => setIsDeleting(false), pauseAfterDeleting);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, colors.length, isDeleting]);

    const onClickHandler = () => {
        if (!user) {
            setShowLogin(true);
        } else{
            navigate("/result");
        }
    }
  return (
    <motion.div className="flex flex-col justify-center items-center  text-center my-20"
        initial={{opacity:0.2, y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once: true}}
        >

        {showLogin === false &&
            <motion.div
                className="relative text-stone-500 inline-flex text-center gap-2 px-6 py-1 rounded-full border border-neutral-500 overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-black opacity-20 blur-lg animate-pulse z-[-1]" />
                <p
                    className={`whitespace-nowrap font-mono tracking-wide transition-opacity duration-300 ${colors[colorIndex]}`}
                    style={{ opacity }}
                >
                    {typedText}
                    <span className="animate-pulse">|</span>
                </p>
            </motion.div>

        }
        <motion.h1 className="mt-4 text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1, duration:0.8}}
            
            >
            Visualize
        </motion.h1>
        <motion.h1 className="text-4xl max-w-[300px] text-white sm:text-7xl sm:max-w-[590px] mx-auto mt-5 text-center"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:0.4, duration:0.8}}
            >
            Turn Text Into Stunning AI <span className="text-blue-600">Image</span>
        </motion.h1>
        <motion.p className="text-center text-white max-w-x1 mx-auto mt-5 max-w-[300px]  sm:max-w-[590px]"
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.6, duration:0.8}}
            >
            "Unleash your creativity with AI. Effortlessly transform 
            imagination into captivating art — simply type, and let 
            the brilliance come alive."
        </motion.p>
        <button
            onClick={onClickHandler}
            className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 hover:scale-105 transition-all duration-500
            flex items-center gap-2 rounded-full cursor-pointer mb-10">
            Generate Image
            <img width={50} src={assets.star} alt="" />
        </button>

        <div className="flex flex-col gap-4 p-4 mt-10 ml-40 justify-center items-center flex-wrap">
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 rounded"
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:1, duration:1}}
                viewport={{once:true}}
                >
                {pattern.map((src, index) => (
                    <motion.img
                    whileHover={{scale:1.05, transitionDuration: 0.1}}
                    key={index}
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                    />
                ))}
            </motion.div>
            <motion.p className="text-gray-400 mr-30 dark:text-gray-300"
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:1.4, duration:1}}
                viewport={{once:true}}
                >
             Generated Image by PixAi
            </motion.p>
        </div>

    </motion.div>
  )
}

export default Header