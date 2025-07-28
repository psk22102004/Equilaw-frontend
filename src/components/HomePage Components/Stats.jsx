import React from 'react';

function OrderSelection(props) {
    return (
        <div className="flex flex-col  items-center  shadow-lg px-4 py-7 rounded-2xl gap-1 md:gap-5 bg-white">
            <div className='flex items-center gap-3'>
                <img src={props.img} className='rounded-full' />
                <h1 className="title text-blue-700 text-left font-bold text-lg md:text-xl">{props.name}</h1></div>
            <p className="text-black text-center text-sm md:text-xl">{props.value}</p>

        </div>
    );
}

export default OrderSelection;
