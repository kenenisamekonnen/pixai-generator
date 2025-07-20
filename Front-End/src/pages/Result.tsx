import { useState } from "react"
import { assets } from "../assets/assets"
import generateImage from "../services/image";


const Result = () => {

  const [image, setImage] = useState(assets.ghible);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');


  const onSubmitHundler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      if (input) {
        const image = await generateImage(input);

        if (!image) {
          setIsLoading(false);
          setImage(assets.ghible);
          setIsImageLoaded(false);
          alert("Image generation failed. Please try again.");
          return;
        }

        if (image){
          setIsImageLoaded(true);
          setImage(image);
        }

        console.log("generated image", image);
      }
      setIsLoading(false);
  }
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center ">


      <form onSubmit={onSubmitHundler} className="relative z-10 flex flex-col justify-center items-center w-full px-4">
          {/* flex flex-col min-h-[90vh] justify-center items-center */}
        <div>
          <div className="relative">
            <img src={image} alt="ghible style image" className="h-80 rounded" />
            <span className={`absolute bottom-0 left-1 h-1 bg-blue-500 ${isLoading ? "w-full transition-all duration-[10s]" : "w-0"}`} />
          </div>
          <p className={!isLoading ? 'hidden' : ''}>Loading.....</p>
        </div>
        {!isImageLoaded &&
          <div className="flex w-full max-w-xl bg-neutral-500 text-white rounded-full text-sm p-0.5 mt-10">
            <input
              onChange={e => setInput(e.target.value)} value={input}
              type="text" 
              placeholder="Describe what you want to Generate" 
              className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
            />
            <button className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white text-1xl hover:scale-105 transition-all duration-300 cursor-pointer">Generate</button>
          </div>
        }

        {isImageLoaded && 
          <div className="flex flex-wrap gap-2 text-sm p-0.5 mt-10 rounded-full justify-center text-white">
            <p onClick={() => (setIsImageLoaded(false))}
              className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300">
              Generate another
            </p>
            <a href={image} download className="bg-zinc-900 px-8 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300">Download</a>
          </div>
        }
      </form>
    </div>
  )
}

export default Result