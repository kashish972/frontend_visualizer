import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { CustomButton } from "../components";
import state from "../store";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import Background3D from "../components/Background";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.current === "home" && (
        <>
         <Background3D />
          {/* ✅ New 3D CSS Pattern Background Layer */}
          <motion.div
            className="home-bg-pattern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />

          <motion.section className="home" {...slideAnimation("left")}>
            <motion.header {...slideAnimation("down")}>
              <img src="./threejs.png" alt="logo" className="w-8 h-8 object-contain" />

              {/* ✅ Login Button (Redirects to Clerk Authentication Project) */}
              {/* <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
              <button className="login-btn">Login</button>
            </a> */}
            </motion.header>

            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-xs font-semibold backdrop-blur-md bg-white/10 text-white border border-white/20 uppercase tracking-widest shadow-lg">
                  ✨ Next-Gen Experience
                </div>
                <h1 className="text-5xl md:text-7xl xl:text-[8rem] font-black leading-[0.9] text-white tracking-tighter mb-4 drop-shadow-xl">
                  3D DESIGNS <br className="xl:block hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-sm">
                    WITH AI
                  </span>
                </h1>
              </motion.div>

              <motion.div {...headContentAnimation} className="flex flex-col gap-7">
                <p className="max-w-md font-normal text-gray-200 text-lg leading-relaxed drop-shadow-md">
                  Create your unique and exclusive models with our brand-new 3D
                  customization tool. <strong>Unleash your imagination</strong> and redefine your style.
                </p>

                <div className="flex flex-wrap gap-4">
                  <CustomButton
                    type="filled"
                    title="Customize T-Shirt"
                    handleClick={() => {
                      state.current = "customizer";
                      state.model = "tshirt";
                    }}
                    customStyles="w-fit px-6 py-3 font-bold text-sm shadow-lg hover:scale-105 transition-all ease-in-out duration-300 ring-2 ring-white/20"
                  />

                  <CustomButton
                    type="outline"
                    title="Customize Box"
                    handleClick={() => {
                      state.current = "customizer";
                      state.model = "box";
                    }}
                    customStyles="w-fit px-6 py-3 font-bold text-sm shadow-md bg-black/20 backdrop-blur-sm hover:bg-black/40 hover:scale-105 transition-all ease-in-out duration-300"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default Home;
