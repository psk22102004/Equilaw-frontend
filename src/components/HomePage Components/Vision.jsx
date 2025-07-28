import React from 'react'
import vision from '/vision.png'
function Vision(props) {
    return (
        <div className='flex md:mx-5 items-center'>
            <div className="flex flex-col  gap-3 md:gap-6 items-center w-full  md:px-5 py-5 md:max-w-md lg:max-w-xl ">
                <img src={props.img} className='w-14 md:w-24' />
                <h1 className=' text-lg md:text-2xl font-bold font-poppins'>{props.title}</h1>
                <p className='text-sm  text-center md:px-10   '>{props.info} </p>

            </div>
        </div>

    );

}
export default Vision