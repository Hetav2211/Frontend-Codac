import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

const Pricing = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [couponCodes, setCouponCodes] = useState({}); // { planIndex: code }
  const [discountedPrices, setDiscountedPrices] = useState({}); // { planIndex: price }
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    // On mount, update selectedPlan from user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSelectedPlan(user.plan || "Free");
    }
  }, []);

  const handleCheckout = async (plan) => {
    // Only check login for paid plans
    if (plan === "Pro" || plan === "Team") {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login", { replace: true });
        return;
      }
    }
    setSelectedPlan(plan);

    const storedUser = localStorage.getItem("user");
    let userId = null;
    if (storedUser) {
      const user = JSON.parse(storedUser);
      userId = user._id;
    }

    if (plan === "Free") {
      toast.success("Free plan selected! No payment required.");
      if (userId) {
        // Update plan in DB
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/plan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, plan }),
        });
        // Update local user
        const user = JSON.parse(storedUser);
        user.plan = plan;
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("userPlanUpdated"));
      }
      return;
    }

    // Get discounted price if available
    let priceToPay = null;
    const planIndex = ["Free", "Pro", "Team"].indexOf(plan);
    if (discountedPrices[planIndex] !== undefined) {
      priceToPay = discountedPrices[planIndex] * 100; // Convert rupees to paise
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, price: priceToPay }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await res.json();
      const stripe = await stripePromise;

      // Store the selected plan in sessionStorage for use after redirect
      sessionStorage.setItem("lastSelectedPlan", plan);
      // Update plan in DB after payment success (should be handled on backend webhook ideally)
      if (userId) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/plan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, plan }),
        });
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error("Payment failed: " + error.message);
      setSelectedPlan(null);
    }
  };

  return (
    <motion.section
      id="pricing"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-green-100 text-green-700 rounded-full dark:bg-green-800 dark:text-green-300">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-display dark:text-white">
            Simple & Transparent Pricing (INR)
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 items-end"
        >
          {[ 
            {
              plan: "Free",
              price: 0,
              features: [
                "3 Rooms per Day",
                "Basic Support",
                "Limited Collaboration",
              ],
              description: "Perfect for individuals",
              color:
                "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600",
              textColor: "text-gray-800 dark:text-gray-200",
              delay: 0.1,
            },
            {
              plan: "Pro",
              price: 799,
              features: [
                "Unlimited Rooms",
                "Priority Support",
                "Advanced Tools",
                "Team Collaboration",
              ],
              popular: true,
              description: "For professional developers",
              color:
                "from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800",
              textColor: "text-white",
              delay: 0.2,
            },
            {
              plan: "Team",
              price: 2499,
              features: [
                "Unlimited Rooms",
                "Team Management",
                "In Room Chat",
                "Dedicated Support",
              ],
              description: "Best for teams & organizations",
              color:
                "from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800",
              textColor: "text-white",
              delay: 0.3,
            },
          ].map((tier, i) => {
            // Calculate discounted price if coupon applied
            let displayPrice = tier.price;
            if (discountedPrices[i] !== undefined) {
              displayPrice = discountedPrices[i];
            }
            return (
            <motion.div
              key={i}
              variants={slideUpVariants}
              custom={tier.delay}
              onHoverStart={() => setHoveredPlan(i)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-2xl overflow-hidden shadow-lg transition-all ${
                tier.popular
                  ? "transform md:scale-[1.03] ring-4 ring-blue-400"
                  : ""
              }`}
            >
              {tier.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-xs font-bold uppercase tracking-wide"
                >
                  Most Popular
                </motion.div>
              )}

              <motion.div
                animate={{
                  scale: hoveredPlan === i ? 1.02 : 1,
                }}
                className={`bg-gradient-to-br ${tier.color} p-1`}
              >
                <div
                  className={`bg-white dark:bg-gray-800 p-8 rounded-xl text-gray-900 dark:text-white"`}
                >
                  <h3 className="text-2xl font-semibold mb-2 text-black dark:text-white">{tier.plan}</h3>

                  <div className="mb-6 text-black dark:text-white">
                    <p className="text-4xl font-bold mb-1">
                      ₹{displayPrice.toLocaleString("en-IN")}
                      <span className="text-lg font-normal"> /mo</span>
                    </p>
                    {tier.price > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        GST Included
                      </p>
                    )}
                    {/* Coupon code input for paid plans */}
                    {tier.price > 0 && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCodes[i] || ""}
                          onChange={e => {
                            const code = e.target.value.trim().toUpperCase();
                            setCouponCodes(prev => ({ ...prev, [i]: code }));
                            let discount = null;
                            let message = "";
                            if (code === "SAVE10") {
                              discount = 0.9;
                              message = "Coupon applied! 10% discount.";
                            } else if (code === "TEAM20" && tier.plan === "Team") {
                              discount = 0.8;
                              message = "Coupon applied! 20% off Team plan.";
                            } else if (code === "TEAM20" && tier.plan !== "Team") {
                              discount = null;
                              message = "TEAM20 is only valid for Team plan.";
                            } 

                            if (discount) {
                              setDiscountedPrices(prev => ({ ...prev, [i]: Math.round(tier.price * discount) }));
                              toast.success(message);
                            } else {
                              setDiscountedPrices(prev => {
                                const copy = { ...prev };
                                delete copy[i];
                                return copy;
                              });
                              if (message) toast.error(message);
                            }
                          }}
                          className="border text-black rounded px-2 py-1 text-sm w-36 mr-2"
                        />
                        <span>Enter coupon code for {tier.plan} discount!</span>
                      </div>
                      
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
                    {tier.features.map((f, j) => (
                      <motion.li
                        key={j}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-2"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handleCheckout(tier.plan)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={selectedPlan === tier.plan}
                    className={`w-full py-3 rounded-lg font-medium transition ${
                      tier.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    }`}
                  >
                    {selectedPlan === tier.plan ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block"
                      >
                        ⏳
                      </motion.span>
                    ) : tier.price === 0 ? (
                      "Get Started"
                    ) : (
                      "Subscribe Now"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center text-gray-600 dark:text-gray-300"
        >
          <p>All prices in Indian Rupees (INR). Enterprise plans available.</p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-4">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Need custom solutions?</span>{' '}
              <button
                onClick={() => document.getElementById('Feedback')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-blue-600 hover:underline dark:text-blue-400 font-semibold"
              >
                Contact our sales team
              </button>
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>30-day money-back guarantee</span>
            <span>•</span>
            <span>No credit card required to start</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Pricing;
