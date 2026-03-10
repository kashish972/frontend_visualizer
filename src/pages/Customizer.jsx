import { useState } from "react";
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
    stylishShirt: false,
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

      const response = await fetch("https://backen-viaulsizer.onrender.com/api/img/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Request Failed. Status:", response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      // The backend returns a base64 encoded string, we need to format it as a valid image URL for three.js
      const imageUrl = `data:image/png;base64,${data.photo}`;

    
      handleDecals(type, imageUrl);

    } catch (error) {
      console.error("⚠️ Error generating image:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setGeneratingImg(false);
    }
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
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

  const handleActiveFilterTab = (tabName) => {
    console.log("🔄 Toggling Filter Tab:", tabName);
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "downloadShirt":
        downloadCanvasToImage();
        break;
      case "purchaseModel":
        handlePayment();
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

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
        name: "Kashish Arora",
        email: "kashish.arora@example.com",
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

          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
