import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CaseCarousel from './CaseCarousel';
import { Progress } from "@/components/ui/progress"
import WelcomeContainer from './WelcomeContainer';

const Dashboard3 = () => {
    const navigate = useNavigate();

    const features = [
        { id: 1, imgSrc: '/auction.png', title: 'Pending Cases', value: '12' },
        { id: 2, imgSrc: '/approve.png', title: 'Completed Cases', value: '50' },
        { id: 3, imgSrc: '/salary.png', title: 'Number of Hearings', value: '14' },

    ]
    const [casesData, setCasesData] = useState([
    ]);

   
    useEffect(
        () => {
            const fetchCases = async () => {
                const response = await axios.get('https://sih-backend-2t3a.onrender.com/cases/all');
                console.log('fetched cases are : ', response.data); 
             
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
        <div className="mt-16 md:mt-0 h-screen font-poppins">
            <main className="p-4 md:p-8 overflow-auto space-y-12 bg-gray-50 text-black">


                <WelcomeContainer/>
                <div className='statisticCardBox grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        features.map(
                            (ele, index) => (
                                <div key={ele.id} className='feature bg-white rounded-lg border border-gray-200 p-6'>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-gray-50 rounded-lg mr-4">
                                                <img 
                                                    src={ele.imgSrc} 
                                                    className='w-6 h-6' 
                                                    alt={ele.title}
                                                />
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium text-gray-600'>{ele.title}</p>
                                                {(ele.id == 1 || ele.id == 2 || ele.id == 3) && (
                                                    <p className='text-2xl font-semibold text-gray-900 mt-1'>{ele.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {(ele.id == 1 || ele.id == 2 || ele.id == 3) && (
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                                <span>Progress</span>
                                                <span>{Math.min(parseInt(ele.value) * 2, 100)}%</span>
                                            </div>
                                            <Progress value={Math.min(parseInt(ele.value) * 2, 100)} className="h-1.5"/>
                                        </div>
                                    )}
                                </div>
                            )
                        )
                    }
                </div>
            
           
                <div className='flex flex-col px-1'>
                    <div className='flex flex-col place-items-center lg:flex-row gap-3 md:flex-row md:justify-between mb-6'>
                        <div>
                            <h1 className='text-xl font-semibold text-gray-900'>Ongoing Cases</h1>
                            <p className="text-sm text-gray-600 mt-1">Cases currently in progress</p>
                        </div>
                        <div className='mt-2 flex gap-3'>
                            <button 
                                className='inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors' 
                                onClick={() => navigate('/user/addCase')}
                            >
                                Add Case
                            </button>
                            <button 
                                className='inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors' 
                                onClick={() => navigate('/user/viewAllopen', { state: { cases: openCases } })}
                            >
                                View all ({openCases.length})
                            </button>
                        </div>
                    </div>
                    <div className='caseCarousel flex'>
                        <div className="bg-white rounded-lg border border-gray-200 w-full">
                            <CaseCarousel cardData={openCases} />
                        </div>
                    </div>
                </div>
                {/* ONGOING CASES END */}

                {/* CLOSED CASES START */}
                <div className='flex flex-col px-1'>
                    <div className='flex flex-col place-items-center lg:flex-row gap-3 md:flex-row md:justify-between mb-6'>
                        <div>
                            <h1 className='text-xl font-semibold text-gray-900'>Closed Cases</h1>
                            <p className="text-sm text-gray-600 mt-1">Successfully resolved matters</p>
                        </div>
                        <div>
                            <button 
                                className='inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors' 
                                onClick={() => navigate('/user/viewAllopen', { state: { cases: closedCases } })}
                            >
                                View all ({closedCases.length})
                            </button>
                        </div>
                    </div>
                    <div className='caseCarousel flex'>
                        <div className="bg-white rounded-lg border border-gray-200 w-full">
                            <CaseCarousel cardData={closedCases} />
                        </div>
                    </div>
                </div>
           
            </main>
        </div>
    )
}

export default Dashboard3