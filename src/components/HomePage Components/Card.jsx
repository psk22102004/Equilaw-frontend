import React from 'react'



function Card(props) {

    return (
        <div class="flex flex-col  shadow shadow-gray-400 px-4 py-4 md:px-6 md:py-7 rounded-lg w-full h-full gap-2 md:gap-4 bg-white">
            <div className='flex gap-4 items-center  '>
                <img src={props.img} className='rounded-full' />
                <h1 className="title font-bold text-lg md:text-2xl font-poppins">{props.title}</h1></div>
            <p class="text-left text-sm md:text-xl ">{props.info}</p>
        </div>
    );

}
export default Card;