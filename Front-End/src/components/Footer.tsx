import { Link } from "react-router-dom"
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex items-center justify-between py-4 ">
        <div className="flex items-center  gap-10 text-gray-400">
            <div className=" inline-block px-4 py-2 rounded-lg bg-white/10 backdrop-blur shadow-md hover:scale-105 transition-all duration-700">
                <Link to={"/"} className="flex items-center">
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
                    PixAi
                </span>
                </Link>
            </div>
            <p>|</p>
            <p className="text-center text-gray-400">
                &copy; {new Date().getFullYear()} PixAi. All rights reserved.
            </p>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
            <a
            href="https://github.com/kenenisamekonnen"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub  className="w-6 h-6 hover:scale-105 transition-all duration-300"/>
          </a>
          <a
            href="https://www.linkedin.com/in/kenenisa-mekonnen-03414b34a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin className="w-6 h-6 hover:scale-105 transition-all duration-300"/>
          </a>
           <a
            href="https://x.com/kenenisa1153"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaTwitter className="w-6 h-6 hover:scale-105 transition-all duration-300"/>
          </a>
           <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram className="w-6 h-6 hover:scale-105 transition-all duration-300"/>
          </a>

        </div>
    </div>
  )
}

export default Footer