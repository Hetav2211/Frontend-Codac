import React, { useState, useEffect } from "react";
// import lottieGif from "../assets/lottigif.gif";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
import { ArrowRight, Zap, Sparkles } from "lucide-react";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const CTA = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleGetStarted = () => {
    if (user) {
      navigate("/api/create-room");
    } else {
      toast.error("Please log in to continue");
      navigate("/login");
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Floating animated elements */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute top-1/4 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-10 dark:opacity-5"
      />
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          rotate: [0, -25, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute bottom-1/3 right-20 w-24 h-24 bg-purple-400 rounded-full opacity-10 dark:opacity-5"
      />
      <motion.div
        animate={{
          x: [0, 30, 0, -20, 0],
          y: [0, -20, 30, 10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-400 rounded-full opacity-10 dark:opacity-5"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content on the left */}
          <div className="lg:w-1/2 text-left">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-4 py-2 mb-4 text-sm font-semibold bg-white text-orange-600 rounded-full shadow-lg dark:bg-gray-800 dark:text-orange-400"
              >
                <Sparkles className="mr-2 w-4 h-4" />
                Ready to revolutionize your workflow?
              </motion.span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Code Together
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                Build Faster
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg"
            >
              Experience real-time collaboration that feels like magic. Our
              platform helps developers like you ship better code in less time.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={handleGetStarted}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">Start Coding Now</span>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="relative z-10"
                >
                  <ArrowRight size={20} />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>See Premium Features</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-8 h-8 bg-black dark:bg-white rounded-full border-2 border-white dark:border-gray-800"
                    alt="User"
                  />
                ))}
              </div>
              <span>Join 10,000+ developers already collaborating</span>
            </motion.div>
          </div>

          {/* GIF on the right */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-full w-full "
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
              <div className="relative overflow-hidden h-full w-full">
                  <iframe
                    src="https://lottie.host/embed/31791ad8-6d95-44f7-b6a5-90301753a49f/aQADaiEEe3.lottie"
                    title="Lottie Animation"
                    width="600"
                    height="600"
                    className="object-contain rounded-2xl"
                    style={{ border: 'none', display: 'block', margin: '0 auto' }}
                    allowFullScreen
                  />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTA;
