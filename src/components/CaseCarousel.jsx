import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel({ cardData }) {
  const navigate = useNavigate();
 
  const handleClick = (ele) => {
    console.log(ele);
    navigate(`/user/${ele.caseid}`, { state: { _id: ele._id, caseid: ele.caseid } });
  }

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={
          true
        }
        navigation={true}
        modules={[Pagination, Navigation, Mousewheel]}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper py-12 px-8 md:p-12 h-full"
      >
        {cardData.map((ele) => (
          <SwiperSlide
            key={ele.casid}
            className="rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
          >
            <div 
              onClick={() => { handleClick(ele) }} 
              className="flex flex-col cursor-pointer group relative overflow-hidden rounded-2xl"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-t-2xl"></div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="card-content relative z-10 flex flex-col space-y-5 p-6">
                {/* Header section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Issue Date</span>
                    <h1 className="font-semibold text-sm md:text-base text-gray-700">{ele.issue_date}</h1>
                  </div>
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-md">
                    {ele.category}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-base md:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                  {ele.title}
                </h1>
                
                {/* Details section */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500">Next Hearing</span>
                      <span className="font-semibold text-sm text-gray-700">
                        {ele.hearings && ele.hearings.length > 0 ? ele.hearings[0].nextHearingDate : 'No upcoming hearings'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500">Case ID</span>
                      <span className="font-semibold text-sm text-gray-700 font-mono">{ele.caseid}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}