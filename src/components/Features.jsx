import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
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

const slideUpVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      title: "Intuitive Design",
      description: "Clean and modern interface that puts user experience first",
      icon: "✨",
      color: "bg-purple-100 dark:bg-purple-900/50",
      textColor: "text-purple-600 dark:text-purple-300",
      delay: 0.1,
    },
    {
      title: "Powerful Tools",
      description: "Advanced features to help you achieve your goals faster",
      icon: "⚡",
      color: "bg-blue-100 dark:bg-blue-900/50",
      textColor: "text-blue-600 dark:text-blue-300",
      delay: 0.2,
    },
    {
      title: "Seamless Integration",
      description: "Works perfectly with your existing workflow and tools",
      icon: "🔗",
      color: "bg-green-100 dark:bg-green-900/50",
      textColor: "text-green-600 dark:text-green-300",
      delay: 0.3,
    },
    {
      title: "Real-time Collaboration",
      description: "Work simultaneously with your team in perfect sync",
      icon: "👥",
      color: "bg-orange-100 dark:bg-orange-900/50",
      textColor: "text-orange-600 dark:text-orange-300",
      delay: 0.4,
    },
    {
      title: "Secure & Private",
      description: "Enterprise-grade security for your peace of mind",
      icon: "🔒",
      color: "bg-red-100 dark:bg-red-900/50",
      textColor: "text-red-600 dark:text-red-300",
      delay: 0.5,
    },
    {
      title: "Cross-platform",
      description: "Works seamlessly across all your devices",
      icon: "📱",
      color: "bg-yellow-100 dark:bg-yellow-900/50",
      textColor: "text-yellow-600 dark:text-yellow-300",
      delay: 0.6,
    },
  ];

  const duplicatedFeatures = [...features, ...features, ...features];

  return (
    <motion.section
      id="features"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-gray-100 dark:bg-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-orange-100 text-orange-700 rounded-full dark:bg-orange-800 dark:text-orange-300"
          >
            Features
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-display dark:text-white"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300"
          >
            Our platform provides all the tools and features you need to succeed
          </motion.p>
        </motion.div>

        <div className="relative overflow-x-hidden py-8">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900 z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-100 to-transparent dark:from-gray-900 z-10" />

          <motion.div
            className="flex gap-8 w-max"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedFeatures.map((feature, index) => (
              <motion.div
                key={`${index}-${feature.title}`}
                variants={slideUpVariants}
                custom={feature.delay}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                }}
                className="w-80 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all dark:bg-gray-800 flex-shrink-0"
              >
                <motion.div
                  className={`w-16 h-16 ${feature.color} ${feature.textColor} rounded-full flex items-center justify-center text-2xl mb-6`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
