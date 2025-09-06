import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
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

const Testimonials = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote:
        "This platform has completely transformed how our team collaborates. The real-time features are incredible!",
      name: "Sarah Johnson",
      role: "Lead Developer",
      avatar: "👩‍💻",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      quote:
        "I've tried many collaboration tools, but none come close to the seamless experience this provides.",
      name: "Michael Chen",
      role: "Product Manager",
      avatar: "👨‍💼",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      quote:
        "As a freelancer, this tool helps me work with clients in real-time, making feedback loops much faster.",
      name: "David Wilson",
      role: "UI/UX Designer",
      avatar: "👨‍🎨",
      color: "bg-green-100 dark:bg-green-900",
    },
  ];

  return (
    <motion.section
      id="testimonials"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full dark:bg-blue-800 dark:text-blue-300">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-display dark:text-white">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
            Don't just take our word for it - hear what our users have to say
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative h-96">
          <AnimatePresence mode="wait">
            {testimonials.map(
              (testimonial, i) =>
                activeIndex === i && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className={`absolute inset-0 ${testimonial.color} p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center`}
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl mb-6"
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl text-gray-800 dark:text-gray-200 italic mb-6 max-w-2xl"
                    >
                      "{testimonial.quote}"
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="block font-medium text-gray-900 dark:text-white">
                        {testimonial.name}
                      </span>
                      <span className="block text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </span>
                    </motion.div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex justify-center gap-2 mt-8"
        >
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full ${
                activeIndex === i
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
