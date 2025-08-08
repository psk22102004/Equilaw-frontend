import { ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from "react-router-dom";

function ViewAll() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cases } = location.state;

    const handleCaseClick = (_id, caseid) => {
        navigate(`/user/${caseid}`, { state: { _id: _id, caseid: caseid } });
    };

    return (
        <div className="mt-16 md:mt-0 min-h-screen bg-backg font-poppins">
            <main className="p-6 md:p-8 space-y-8">
                <div className=" mx-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-2">
                            <ArrowLeft onClick={()=>navigate('/user')} className='w-8 h-8'/>
                            <h1 className="text-3xl md:text-4xl font-semibold font-poppins text-gray-900 ">
                                Cases
                            </h1>
                           
                        </div>
                    </div>

                    {/* Cases Grid */}
                    {cases && cases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {cases.map((oncase, index) => (
                                <div
                                    key={oncase._id || index}
                                    onClick={() => handleCaseClick(oncase._id, oncase.caseid)}
                                    className="rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 cursor-pointer group relative overflow-hidden"
                                >
                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-t-2xl"></div>
                                    
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="card-content relative z-10 flex flex-col space-y-5 p-6">
                                        {/* Header section */}
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Issue Date</span>
                                                <h1 className="font-semibold text-sm md:text-base text-gray-700">{oncase.issue_date}</h1>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-md">
                                                {oncase.category}
                                            </span>
                                        </div>
                                        
                                        {/* Title */}
                                        <h1 className="text-base md:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                                            {oncase.title}
                                        </h1>
                                        
                                        {/* Details section */}
                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-500">Case ID</span>
                                                    <span className="font-semibold text-sm text-gray-700 font-mono">{oncase.caseid}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Uncomment if status is needed */}
                                            {/* <div className="flex items-center space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-500">Status</span>
                                                    <span className="font-semibold text-sm text-gray-700">{oncase.status}</span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cases Found</h3>
                            <p className="text-gray-500 max-w-md">
                                There are no cases to display at the moment. Please check back later or contact support if you believe this is an error.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ViewAll;