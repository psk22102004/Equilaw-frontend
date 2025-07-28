import React from "react";
function Hero() {
    return (
        <div className=" mt-5 py-2 md:py-5 md:mt-0">
            <div className=" flex flex-col md:py-10  gap-5 md:gap-7 w-full">
                <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-playfair font-bold   ">One stop solution for legal <span className="text-elebtn italic">research!</span></h1>
                <p className="text-sm  md:text-lg font-semibold md:px-20 whitespace-normal text-center ">Simplify legal research, automate document analysis, and digitalize case management with cutting-edge AI tailored for commercial courts.</p>
                <div className="flex  justify-center items-center gap-7  ">
                    <input placeholder="Search for cases" className="py-4 px-5  rounded-full shadow shadow-gray-400  w-full max-w-sm md:max-w-md lg:max-w-2xl" />

                    <button className="bg-elebtn active:bg-blue-600 text-white py-2 px-5 font-semibold rounded-full  -ml-32 ">Search</button>
                </div>
            </div>
        </div>
    );

}
export default Hero;