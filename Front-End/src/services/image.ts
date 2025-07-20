// import apiCLient from "./api";
// import axios from "axios";

// const generateImage = async(prompt: string): Promise<string> => {
//     try {
//         const {data} = await axios.post("http://localhost:5000/api/image/generate-image", {
//             prompt: prompt
//         })
//         if(data.success){
//             return data.resultImage;
//         } else {
//             return "";
//         }
//     } catch (error) {
//         console.error("login faild");
//         throw error;
//     }
// };

// export default generateImage;
// axios.post("http://localhost:5000/api/image/generate-image", {
//   prompt: "apple on the snow"
// });
// apiCLient.post("/image/generate-image", prompt);

import apiClient from "./api";

const generateImage = async (prompt: string): Promise<string> => {
  try {
    const { data } = await apiClient.post("/image/generate-image", { 
        prompt,
    });
    return data.success ? data.resultImage : "";
  } catch (error) {
    console.error("Image generation failed", error);
    throw error;
  }
};

export default generateImage;


