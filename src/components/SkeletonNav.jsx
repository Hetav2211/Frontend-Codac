import React from "react";

const SkeletonNav = () => (
  <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md shadow-md dark:bg-gray-800/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>

        <div className="flex items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-md"
            ></div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  </nav>
);

export default SkeletonNav;
