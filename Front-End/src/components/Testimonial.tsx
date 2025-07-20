
import { testimony } from "../assets/assets"
import { motion } from "motion/react"

const Testimonial = () => {
  return (
    <motion.div className="flex flex-col gap-4 justify-center items-center my-32 px-4"
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      >
      <h1 className="text-4xl font-bold text-center">Customer Testimonials</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Here's what our customers have to say:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {testimony.map((item, index) => (
          <div
            key={index}
            className="bg-blue-200 dark:bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-18 h-18 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.role}</p>
            <p className="text-yellow-500 text-lg mb-2">{item.star}</p>
            <p className="text-gray-700 dark:text-gray-300">{item.comment}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonial
