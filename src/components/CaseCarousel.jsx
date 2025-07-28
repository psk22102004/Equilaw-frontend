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
        className="mySwiper py-12 px-8 md:p-12"
      >
        {cardData.map((ele) => (
          <SwiperSlide
            key={ele.casid}
            className="rounded-xl  border shadow-lg hover:shadow-sm bg-white"
          >
            <div onClick={() => { handleClick(ele) }} className="flex flex-col  ">
              <div className="card-content flex flex-col space-y-4  md:flex md:justify-between  md:space-y-6  p-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2">
                  <h1 className="font-semibold text-sm md:text-lg text-dgray-600">Issue Date : {ele.issue_date}</h1>

                  <h1 className="font-semibold text-center text-sm text-white bg-blue-600 rounded-md px-2 py-1">{ele.category}</h1>
                </div>
                <h1 className="text-sm md:text-lg font-bold text-black ">{ele.title} </h1>
                <h1 className="font-semibold text-sm line-clamp-2">Next Date: {ele.hearings && ele.hearings.length > 0 ? ele.hearings[0].nextHearingDate : 'No upcoming hearings'}</h1>
                <h1 className="font-semibold text-sm line-clamp-2">Case ID :{ele.caseid}</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
