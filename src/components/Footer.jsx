import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MonitorCog } from "lucide-react";

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

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.footer
      id="footer"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gray-900 text-white py-16 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <motion.div whileHover={{ rotate: 360, scale: 1.5 }}>
                <MonitorCog className="text-[#3b82f6]" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold">
                Code<span className="text-[#3b82f6]">Collab</span>
              </h3>
            </div>
            <p className="text-gray-400 dark:text-gray-300 mb-6">
              The ultimate platform for real-time code collaboration and team
              productivity.
            </p>
            <div className="flex gap-4">
              {["twitter", "github", "linkedin", "discord"].map((social, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                >
                  {social === "twitter" && "🐦"}
                  {social === "github" && "💻"}
                  {social === "linkedin" && "🔗"}
                  {social === "discord" && "💬"}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Testimonials", "FAQ"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookie Policy"],
            },
          ].map((column, i) => (
            <motion.div key={i} variants={containerVariants}>
              <motion.h4
                variants={itemVariants}
                className="text-lg font-semibold mb-6"
              >
                {column.title}
              </motion.h4>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <motion.li key={j} variants={itemVariants}>
                    <motion.a
                      whileHover={{
                        x: 5,
                        color: "#f97316",
                        scale: 1.05,
                      }}
                      className="text-gray-400 hover:text-orange-400 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 dark:text-gray-300"
        >
          <p>
            &copy; {new Date().getFullYear()} CodeCollab. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
