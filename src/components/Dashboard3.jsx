import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CaseCarousel from './CaseCarousel';
import { PlusCircle } from 'lucide-react';
import wave from '../img/wave.png'




const Dashboard3 = () => {
    const navigate = useNavigate();

    const features = [
        { id: 1, imgSrc: '/auction.png', title: 'Pending Cases', value: '12' },
        { id: 2, imgSrc: '/approve.png', title: 'Completed Cases', value: '50' },
        { id: 3, imgSrc: '/salary.png', title: 'Number of Hearings', value: '14' },

    ]

    const [casesData, setCasesData] = useState([
    ]);

    //useEffect to fetch all cases data from backend
    useEffect(
        () => {
            const fetchCases = async () => {
                const response = await axios.get('https://sih-backend-2t3a.onrender.com/cases/all');
                console.log('fetched cases are : ', response.data); //cases fetched , now set them in setCasesData
                //response.data is also an array of objects , so you need to spread it , if u want to include the example cases as well. If you directly wanna replace it then just use response.data
                setCasesData(
                    (prev) => {
                        return ([...prev, ...response.data])
                    }
                )
            }
            fetchCases();
        }, []
    )

    const openCases = casesData.filter(caseItem => caseItem.status === true);
    const closedCases = casesData.filter(caseItem => caseItem.status === false)


    return (
        <div className=" mt-16 md:mt-0 h-screen ">
            <main className="p-4 md:p-8 overflow-auto space-y-12 bg-gray-100 text-black">

                {/* WELCOME TITLE STARTS */}
                <div className='welcomeTitle  flex justify-between shadow-2xl  '>
                    <div className='greetingBox  border flex flex-col w-full mx-auto relative space-y-4 p-8  shadow-lg hover:shadow-xl rounded-xl bg-white bg-gradient-to-r from-white to-blue-200 '>
                        <h1 className='text-xl md:text-3xl font-semibold   '>Welcome back!</h1>
                        <div className='flex gap-x-3 items-center'>
                            <h1 className='text-2xl md:text-4xl font-bold  '>John Doe</h1>
                            <img src={wave} />
                        </div>
                        <p className='hidden md:block font-semibold  '>Explore your cases, important updates, and resources to assist you.</p>
                        {/* <img className='h-60 w-60 absolute right-12 bottom-0 ' src='/doctorIllustration.png' /> */}
                        <img className='hidden md:block w-56 absolute right-0 md:right-20 bottom-0  ' src='/justice.png' />
                    </div>
                </div>
                {/* WELCOME TITLE ENDS */}

                {/* STATISTICS CARDS START */}
                <div className='statisticCardBox grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 '>
                    {
                        features.map(
                            (ele, index) => (
                                <div className='feature  shadow-lg hover:shadow-xl shadow-gray-00  bg-white  p-3 md:p-6 flex space-x-5 md:space-x-10 rounded-xl '>
                                    <img src={ele.imgSrc} className='h-12 w-12 md:h-20 md:w-20 rounded-full border border-gray-300  bg-white p-1 ' />
                                    <div className='flex flex-col space-y-3 '>
                                        <p className='text-lg md:text-xl font-semibold'>{ele.title}</p>
                                        {(ele.id == 1 || ele.id == 2 || ele.id == 3) && <h1 className=' text-xl font-bold md:text-3xl'> {ele.value} </h1>}


                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                {/* STATISTICS CARDS END */}


                {/* ONGOING CASES START */}
                <div className='flex flex-col  px-1 '>
                    <div className=' flex flex-col place-items-center lg:flex-row gap-3 md:flex-row md:justify-between'>
                        <h1 className='text-2xl text-center md:text-3xl font-semibold '>Ongoing Cases</h1>
                        <div className=' mt-2 flex gap-3'>
                            <button className=' bg-blue-600 hover:bg-blue-800 active:bg-blue-700 text-white font-semibold px-3 md:px-6 py-2 rounded-lg' onClick={() => navigate('/user/addCase')}>Add Case</button>
                            <button className='bg-blue-600 hover:bg-blue-800 active:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg' onClick={() => navigate('/user/viewAllopen', { state: { cases: openCases } })} >  View all </button></div>
                    </div>
                    <div className='caseCarousel flex '>
                        <CaseCarousel cardData={openCases} />
                    </div>
                </div>
                {/* ONGOING CASES END */}

                {/* CLOSED CASES START */}
                <div className='flex flex-col  px-1 '>
                    <div className='flex flex-col place-items-center lg:flex-row gap-3 md:flex-row md:justify-between'>
                        <h1 className='text-2xl text-center md:text-3xl font-semibold '>Closed Cases</h1>
                        <div>

                            <button className='bg-blue-600 hover:bg-blue-800 active:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg' onClick={() => navigate('/user/viewAllopen', { state: { cases: closedCases } })} >  View all </button></div>
                    </div>
                    <div className='caseCarousel flex '>
                        <CaseCarousel cardData={closedCases} />
                    </div>
                </div>
                {/* CLOSED CASES END */}
            </main >
        </div >
    )
}

export default Dashboard3