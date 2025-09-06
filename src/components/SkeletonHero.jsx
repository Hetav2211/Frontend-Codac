import React from "react";
import { motion } from "framer-motion";

const SkeletonHero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-24 bg-gradient-to-br from-black animate-gradient-x"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.1)_0%,transparent_25%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1)_0%,transparent_25%)]"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
      </div>

      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left content skeleton */}
        <div className="flex-1 text-center lg:text-left space-y-6 animate-pulse">
          {/* Tagline */}
          <div className="inline-block w-60 h-8 bg-white/10 rounded-full"></div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="h-12 sm:h-14 md:h-16 bg-white/10 rounded-lg w-4/5 mx-auto lg:mx-0"></div>
            <div className="h-10 sm:h-12 md:h-14 bg-white/10 rounded-lg w-3/5 mx-auto lg:mx-0"></div>
          </div>

          {/* Paragraph */}
          <div className="h-6 bg-white/10 rounded-lg w-full max-w-2xl mx-auto lg:mx-0"></div>
          <div className="h-6 bg-white/10 rounded-lg w-5/6 mx-auto lg:mx-0"></div>

          {/* Features */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="px-8 py-3 bg-white/10 rounded-full w-40 h-10"
              ></div>
            ))}
          </div>

          {/* Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
            <div className="w-48 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"></div>
          </div>
        </div>

        {/* Right image skeleton */}
        <div className="flex-1 flex justify-center lg:justify-end animate-pulse">
          <div className="relative">
            <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-80 bg-white/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full -z-0"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
      <div className="flex flex-col items-center animate-pulse">
        {/* Mouse shape placeholder */}
        <div className="w-8 h-12 border-2 border-white/10 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/10 rounded-full mt-2"></div>
        </div>

        {/* Chevrons placeholder */}
        <div className="flex flex-col items-center mt-1 gap-1">
          {[1, 2].map((i) => (
            <div key={i} className="w-5 h-5 bg-white/10 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default SkeletonHero;
