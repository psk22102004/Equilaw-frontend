import React , {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function DateCarousel({ hearings , setSelectedHearingDate }) {
  const navigate = useNavigate();

  const handleClick = (ele)=>{
    console.log(ele);
//    navigate(`/user/${ele.caseid}`, { state: ele.caseid  });
  }
  return (
    <>
      <Swiper
        slidesPerView='auto'
        spaceBetween={40}
        loop={true}
        pagination={{
          clickable: true,
        }}
        
        navigation={true}
        modules={[Pagination, Navigation]}
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
        className="mySwiper w-full p-10  flex items-center "
      >
        {hearings.map((ele,index) => (
          <SwiperSlide
            key={index}
            className="rounded-lg p-2 w-max  bg-white border border-blue-400  "
          >
            <div onClick={() => { setSelectedHearingDate(ele.dateOfHearing)  }} className="flex flex-col   ">
              <div className="card-content   flex flex-col justify-between  ">
                <h1 className="text-lg font-semibold mx-auto w-max">{ele.dateOfHearing} </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
