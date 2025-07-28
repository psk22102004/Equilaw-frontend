import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from "react-router-dom";


function ViewAll() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cases } = location.state;

    const handleCaseClick = (_id, caseid) => {
        navigate(`/user/${caseid}`, { state: { _id: _id, caseid: caseid } });
    }

    return (
        <div className=" mt-16 md:mt-0 h-screen ">
            <main className=" p-8 overflow-auto h-screen space-y-12 bg-backg text-black">
                <div className='flex flex-col  px-1 '>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl md:text-3xl font-semibold font-poppins'>Cases</h1>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10  '>
                        {cases.map((oncase) => (
                            <div onClick={() => { handleCaseClick(oncase._id, oncase.caseid) }} className=" hover:transition-all card-content flex flex-col justify-between space-y-2   p-6 hover:border border-blue-700 hover:rounded-lg bg-white rounded-lg">
                                <h1 className="text-sm md:text-xl font-bold text-black pb-2">{oncase.title} </h1>
                                <div className="text-sm flex justify-between items-center gap-5"> <h1 className="font-semibold text- text-dgray-600 hover:text-black">Issue Date : {oncase.issue_date}</h1>
                                </div>
                                <h1 className="text-sm font-semibold text- text-dgray-600 hover:text-black">Category : <strong>{oncase.category}</strong></h1>
                                {/*<h1 className="font-semibold text- text-dgray-600 hover:text-black">Status : <strong>{oncase.status}</strong></h1>*/}


                            </div>

                        ))}    </div>



                </div>
            </main >
        </div >
    );

}
export default ViewAll