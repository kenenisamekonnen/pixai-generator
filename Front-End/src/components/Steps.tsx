import { stepsData } from "../assets/assets"
import { motion } from "motion/react"

const Steps = () => {
  return (
    <motion.div className="flex flex-col justify-center items-center my-32"
        initial={{opacity:0.2, y:100}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}}
        >
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h1>
        <p className="text-lg text-gray-100 mb-8">Transform Words into stuning Images</p>
        <div className="space-y-4 w-full max-w-3xl text-sm">
            {
                stepsData.map((items, index) =>(
                    <div key={index}
                    className="flex items-center gap-4 p-4 px-8 bg-white/20 shadow-md border cursor-pointer
                    hover:scale-[1.05] transition-all duration-300 rounded-lg">
                        <img src={items.icon} alt="tit" />
                        <div>
                            <h2 className="text-xl font-medium">{items.title}</h2>
                            <p className="text-gray-400">{items.description}</p>
                            {/* text-gray-500 */}
                        </div>
                    </div>
                ) )
            }
        </div>
    </motion.div>
  )
}

export default Steps