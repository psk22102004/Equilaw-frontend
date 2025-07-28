import React, { useRef, useState } from 'react';
import Uico from './uicomponents'
import homepage from '/homepage.png'
import addcase from '/addc.png'
import gif from '/cmere.gif'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

export default function Sliderpg() {
    return (
        <>
            <Swiper
                direction={'vertical'}
                spaceBetween={0}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                className="mySwiper h-72 md:h-[83vh] shadow shadow-gray-300 mt-7 md:mt-5 rounded-xl md:mx-5   "
            >
                <SwiperSlide><Uico title='Case Management' img='/dashboard.png' info='Interactive Dashboard displaying pending and completed cases along with number of hearings' /></SwiperSlide>
                <SwiperSlide><Uico title='Case Details' img='/casedetails.png' info='Detailed Case overview along with addition of transcripts and proofs according to date of hearing.' /></SwiperSlide>
                <SwiperSlide><Uico title='AI Analysis' img='/Aianalysis.png' info='User can chat with the AI related to the specific case along with that it provides recommendations based on summary and detailed descriptions' /></SwiperSlide>
                <SwiperSlide><Uico title='Advanced Search' img='/vectorsearch.png' info='User can find any case based on related keywords and get the most matching case along with the other recommendations.' /></SwiperSlide>

            </Swiper>
        </>
    );
}
