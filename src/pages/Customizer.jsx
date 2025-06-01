// import React, { useState } from "react";
// import { useSnapshot } from "valtio";
// import { AnimatePresence, motion } from "framer-motion";

// import state from "../store";
// import { downloadCanvasToImage, reader } from "../config/helpers";
// import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
// import { fadeAnimation, slideAnimation } from "../config/motion";

// import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components";

// const Customizer = () => {
//   const snap = useSnapshot(state);

//   const [file, setFile] = useState("");
//   const [userPrompt, setUserPrompt] = useState("");  // ✅ Fixed useState name
//   const [generatingImg, setGeneratingImg] = useState(false);

//   const [activeEditorTab, setActiveEditorTab] = useState("");
//   const [activeFilterTab, setActiveFilterTab] = useState({
//     logoShirt: true,
//     stylishShirt: true,
//   });

//   const handleTabClick = (tabName) => {
//     setActiveEditorTab((prevTab) => (prevTab === tabName ? null : tabName));
//   };

//   const handleSubmit = async (type) => {
//     if (!userPrompt) {
//       alert("Please enter a prompt before generating an image.");
//       return;
//     }

//     try {
//       setGeneratingImg(true);

//       const CLIPDROP_API_KEY = "77ddff360af349148dc51b9be2614b9e2e2e823debad6c5361253dc4c3967b369510f67b54a5687740e078de4de58b96"; // ✅ Replace with your actual API key

//       console.log("🛠 Sending API Request:", { prompt: userPrompt });

//       const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": CLIPDROP_API_KEY,
//         },
//         body: JSON.stringify({ prompt: userPrompt }) // ✅ Fixed request format
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("❌ API Request Failed. Status:", response.status, errorText);
//         throw new Error(`API request failed: ${response.status} - ${errorText}`);
//       }

//       const blob = await response.blob();  // ✅ Convert response to image blob
//       const imageUrl = URL.createObjectURL(blob);

//       console.log("🧠 Generated Image URL:", imageUrl);
//       handleDecals(type, imageUrl); // ✅ Apply the image to the T-shirt

//     } catch (error) {
//       console.error("⚠️ Error generating image:", error.message);
//       alert(`Error: ${error.message}`);
//     } finally {
//       setGeneratingImg(false);
//     }
//   };

//   const generateTabContent = () => {
//     switch (activeEditorTab) {
//       case "colorpicker":
//         return <ColorPicker />;
//       case "filepicker":
//         return <FilePicker file={file} setFile={setFile} readFile={reader} />;
//       case "aipicker":
//         return (
//           <AIPicker
//             userPrompt={userPrompt}  // ✅ Fixed prop name
//             setPrompt={setUserPrompt}  // ✅ Corrected function name
//             generatingImg={generatingImg}
//             handleSubmit={handleSubmit}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const handleDecals = (type, result) => {
//     const decalType = DecalTypes[type];

//     state[decalType.stateProperty] = result;

//     if (!activeFilterTab[decalType.filterTab]) {
//       handleActiveFilterTab(decalType.filterTab);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {snap.current === "customizer" && (
//         <>
//           {/* ✅ Added Input Field for AI Prompt */}
//           <div className="prompt-container">
//             <input
//               type="text"
//               value={userPrompt}
//               onChange={(e) => setUserPrompt(e.target.value)}
//               placeholder="Enter your prompt here..."
//               className="prompt-input"
//             />
//           </div>

//           <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
//             <div className="flex items-center min-h-screen">
//               <div className="editortabs-container tabs">
//                 {EditorTabs.map((tab) => (
//                   <Tab key={tab.name} tab={tab} handleClick={() => handleTabClick(tab.name)} />
//                 ))}
//                 {generateTabContent()}
//               </div>
//             </div>
//           </motion.div>

//           <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
//             <CustomButton
//               type="filled"
//               title="Go Back"
//               handleClick={() => {
//                 state.current = "home";
//                 state.model = null;
//               }}
//               customStyles="w-fit px-4 py-2.5 font-bold text-sm"
//             />
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Customizer;


import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";

import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [userPrompt, setUserPrompt] = useState("");  // ✅ Fixed state variable
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: true,
  });

  const handleTabClick = (tabName) => {
    setActiveEditorTab((prevTab) => (prevTab === tabName ? null : tabName));
  };

  const handleSubmit = async (type) => {
    if (!userPrompt) {
      alert("Please enter a prompt before generating an image.");
      return;
    }

    try {
      setGeneratingImg(true);

      const CLIPDROP_API_KEY = "77ddff360af349148dc51b9be2614b9e2e2e823debad6c5361253dc4c3967b369510f67b54a5687740e078de4de58b96"; // ✅ Replace with actual API key

      console.log("🛠 Sending API Request:", { prompt: userPrompt });

      const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLIPDROP_API_KEY,
        },
        body: JSON.stringify({ prompt: userPrompt }) // ✅ Fixed request format
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Request Failed. Status:", response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      console.log("🧠 Generated Image URL:", imageUrl);
      handleDecals(type, imageUrl);

    } catch (error) {
      console.error("⚠️ Error generating image:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setGeneratingImg(false);
    }
  };

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={reader} />;
      case "aipicker":
        return (
          <AIPicker
            userPrompt={userPrompt}
            setPrompt={setUserPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  // ✅ Payment Function (Razorpay)
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_mbinFkvUx9Ur9V", // ✅ Use your Razorpay API Key
      amount: 50000, // ₹4609.00 in paise
      currency: "INR",
      name: "3D visualizer",
      description: "Custom T-Shirt Payment",
      image: "https://i.imgur.com/AfFp7pu.png", // ✅ Add your logo URL
      handler: function (response) {
        alert("Payment Successful!");
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
      },
      prefill: {
        name: "Jay Bhardwaj",
        email: "jay.bhardwaj@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  return (
    <AnimatePresence>
      {snap.current === "customizer" && (
        <>
          {/* ✅ Upload Button */}
           <div className="mb-4">
         <FilePicker 
            file={file} 
            setFile={setFile} 
            readFile={reader}
           />
          </div>

          {/* ✅ Download Button */}
          <div className="mb-4">
              <CustomButton 
                type="filled"
                  title="Download Design"
                    handleClick={downloadCanvasToImage}
                   customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                     />
                        </div>

          {/* ✅ Payment Button */}
          <CustomButton 
  type="filled"
  title="Buy Now"
  handleClick={handlePayment} // ✅ Triggers Razorpay payment
  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
/>


          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => handleTabClick(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.current = "home";
                state.model = null;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
