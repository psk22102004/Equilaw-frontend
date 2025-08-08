import React from 'react';

function OrderSelection(props) {
    return (
        <div className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl p-6 md:p-8">
            {/* Header with icon and title */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <img 
                        src={props.img} 
                        alt={props.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover bg-gray-50 p-2" 
                    />
                </div>
                
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    {props.name}
                </h2>
            </div>

            {/* Main statistic/value */}
            <div className="mb-4">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {props.value}
                </p>
            </div>

            {/* Additional info or percentage */}
            {props.percentage && (
                <div className="pt-4 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            {props.percentage === "which is very concerning" ? "Status" : "Impact"}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            props.percentage === "which is very concerning" 
                                ? "bg-red-50 text-red-700" 
                                : props.percentage === "50%" 
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-gray-50 text-gray-700"
                        }`}>
                            {props.percentage}
                        </span>
                    </div>
                </div>
            )}

            {/* Trend indicator for cases pending */}
            {props.name === "Cases Pending" && (
                <div className="mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-red-600 font-medium">Increasing trend</span>
                </div>
            )}

            {/* Ratio indicator for judges */}
            {props.name === "Judges per Population" && (
                <div className="mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-orange-600 font-medium">Below recommended ratio</span>
                </div>
            )}

            {/* Time indicator for case disposal */}
            {props.name === "Case Disposal Time" && (
                <div className="mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-red-600 font-medium">Significantly delayed</span>
                </div>
            )}

            {/* System indicator for case management */}
            {props.name === "Case Management" && (
                <div className="mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-red-600 font-medium">Needs improvement</span>
                </div>
            )}
        </div>
    );
}

export default OrderSelection;