import React from "react";

function Hero() {
  return (
    <div className="bg-white py-16 md:py-20 mt-5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-playfair">
              One stop solution for legal{" "}
              <span className="text-blue-600 italic">research!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Simplify legal research, automate document analysis, and digitalize case management with cutting-edge AI tailored for commercial courts.
            </p>

            {/* Search Section */}
            <div className="max-w-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  aria-label="Search for legal cases"
                  placeholder="Search for cases"
                  className="flex-1 py-4 px-6 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-full transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Legal research and documentation"
                className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-lg"
              />
              {/* Optional overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-black bg-opacity-5 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;