import React from 'react';

function Vision({ img, title, info, reverse = false }) {
  return (
    <div className="containerw-full mx-auto px-8 py-20">
      <div
        className={` ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Image + Title */}
        <div className="flex flex-col items-center justify-center lg:items-start space-y-8">
          <div className="w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-blue-600/20 rounded-full p-4">
            <img 
              src={img} 
              alt={title} 
              className="w-full h-full object-contain filter brightness-0 invert opacity-80" 
            />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white text-center lg:text-left leading-tight font-playfair">
            {title}
          </h2>
     

        {/* Info Text */}
        <div className="text-white/80 text-center lg:text-left text-lg lg:text-xl leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
          {info}
        </div>
      </div>
         </div>
    </div>
  );
}

export default Vision;