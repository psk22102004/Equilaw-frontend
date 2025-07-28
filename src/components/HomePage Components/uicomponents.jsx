import React from 'react'
function uicomponents(props) {
    return (
        <div className=''>
            <div className=' flex flex-col gap-3  bg-white text-white  p-3 md:p-8'>
                <div className='  text-center text-lg md:text-3xl font-bold text-black'>{props.title}</div>
                <p className='text-black text-center text-sm md:text-lg md:px-11'>{props.info}</p>
                <img src={props.img} className='w-full object-contain' /></div>
        </div>
    );
}
export default uicomponents;