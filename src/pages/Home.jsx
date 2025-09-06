import { useState, useEffect } from "react";  
import { Toaster, } from "react-hot-toast";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Pricing from "../components/pricing";
import FAQ from "../components/FAQ";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import AdComponent from "../components/AdComponent";
import SkeletonNav from "../components/SkeletonNav";
import SkeletonHero from "../components/SkeletonHero";

// ------------------------ Home ------------------------
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPlan, setUserPlan] = useState("Free"); // Default to Free

  useEffect(() => {
    // Check if user is logged in and their plan
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserPlan(user.plan || "Free");
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="overflow-x-hidden">
        <SkeletonNav />
        <SkeletonHero />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Pricing />
      <FAQ />
      <FeedbackForm />
      <Footer />
      <AdComponent />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
