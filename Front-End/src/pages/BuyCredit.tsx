import { assets, plans } from "../assets/assets"
import { useAppContext } from "../hooks/useAppContext"

const BuyCredit = () => {

  // const {user} = useContext(AppContext);
  const { user } = useAppContext();

  return (
    <div className="min-h-[80v] text-center pt-14 mb-10">
      <button className="border text-white px-10 py-2 rounded-full mb-6">Our plans</button>
      <h1 className="text-center text-3xl text-gray-400 font-medium mb-6 sm:mb-10">Choose the plans</h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {
          plans.map((item, index) => (
            <div key={index}
              className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 
               hover:drop-shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer"
              >
              <img width={20} src={assets.lock} alt="lock" />
              <p className="mt-3 mb-1 font-semibold">{item.id}</p>
              <p className="text-sm">{item.description}</p>
              <p className="mt-6"> <span className="text-3xl font-medium">${item.price}</span> / {item.credits} credits</p>
              <button className="w-full bg-gray-800 text-white mt-8 text-sm min-w-52 py-2.5 rounded-md">
                {
                  user ? "Purchase" : "Get started"
                }</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BuyCredit