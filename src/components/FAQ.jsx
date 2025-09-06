import React, { useState, useEffect } from "react";
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

const FAQ = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-yellow-100 text-yellow-700 rounded-full dark:bg-yellow-800 dark:text-yellow-300">
            FAQ
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-4">
          {[
            {
              q: "Is it free to use?",
              a: "Yes, we offer a free tier for all users with basic features. You can upgrade to our Pro or Team plans for additional functionality.",
            },
            {
              q: "Can I invite friends to collaborate?",
              a: "Absolutely! Collaboration is at the core of our platform. You can invite as many collaborators as you need, depending on your plan.",
            },
            {
              q: "Is my code safe and secure?",
              a: "Yes, all sessions are encrypted and secure. We use industry-standard security measures to protect your data and code.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and bank transfers for our paid plans.",
            },
            {
              q: "Can I cancel my subscription anytime?",
              a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={slideUpVariants}
              className="overflow-hidden rounded-lg"
            >
              <motion.button
                onClick={() => toggleFAQ(i)}
                className="w-full text-left p-6 bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all flex justify-between items-center"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.q}
                </h4>
                <motion.div
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  className="ml-4"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </motion.div>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === i ? "auto" : 0,
                  opacity: activeIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-6 bg-white dark:bg-gray-800 overflow-hidden"
              >
                <p className="pb-6 text-gray-700 dark:text-gray-300">
                  {item.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQ;
