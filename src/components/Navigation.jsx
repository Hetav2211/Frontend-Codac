import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { MonitorCog, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState("Free");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle user plan updates
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserPlan(parsedUser.plan || "Free");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userPlanUpdated", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userPlanUpdated", handleStorageChange);
    };
  }, []);

  // Dark mode handling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getPlanBadgeStyle = (plan) => {
    switch (plan) {
      case "Pro":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      case "Team":
        return "bg-gradient-to-r from-purple-500 to-indigo-600 text-white";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const navLinks = ["features", "pricing", "Feedback"];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 10 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/20 backdrop-blur-xl dark:bg-gray-800/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 360, scale: 1.5 }} whileTap={{ scale: 0.9 }}>
              <MonitorCog onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
               className="text-[#3b82f6]" size={28} />
            </motion.div>
            <motion.h1
              onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              className="text-2xl font-bold font-display text-gray-600 dark:text-white cursor-pointer"
            >
              Code<span className="text-[#3b82f6]">C</span>
            </motion.h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((section) => (
              <motion.li key={section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
                  className="relative text-lg text-gray-600 font-bold dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 text-xs font-bold rounded-full ${getPlanBadgeStyle(userPlan)}`}
                >
                  {userPlan}
                </motion.div>
                <span className="text-gray-600 dark:text-white font-bold">
                  Hi,{" "}
                  <span className="font-semibold text-blue-500">
                    {user.name.split(" ")[0] || user.email?.split("@")[0]}
                  </span>
                </span>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/login" className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gray-900 dark:bg-white font-bold dark:text-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.85 }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? (
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 6.07l-.71-.71M6.34 6.34l-.71-.71m12.02 0l-.71.71M6.34 17.66l-.71.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-800 dark:text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293a8 8 0 01-10.586-10.586 8 8 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg"
          >
            <ul className="flex flex-col items-center gap-6 py-6">
              {navLinks.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                    className="text-lg text-black dark:text-gray-300 hover:text-blue-500"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
              {user ? (
                <motion.button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  Logout
                </motion.button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg text-blue-500">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
