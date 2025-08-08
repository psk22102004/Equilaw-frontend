import React, { useRef, useState } from 'react';
import ScrollStack, { ScrollStackItem } from '../../animations/ScrollStack';

export default function Sliderpg() {
    return (
        <div className="">
            {/* Section Header - outside of scroll container */}
            <div className="container mx-auto px-4 md:px-6 pt-16 pb-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-playfair">
                        Comprehensive Case Management
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Streamline your legal workflow with our integrated dashboard
                    </p>
                </div>
            </div>

            {/* ScrollStack Container - needs specific height with hidden scrollbar */}
            <div className="h-screen  w-full overflow-hidden">
                <ScrollStack 
                    className="w-full h-full scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none', /* Firefox */
                        msOverflowStyle: 'none' /* IE and Edge */
                    }}
                    itemDistance={80}
                    itemScale={0.05}
                    itemStackDistance={40}
                >
                    <ScrollStackItem itemClassName="h-full ">
                        <div className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Interactive Dashboard
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                Get a comprehensive overview of all your cases with real-time updates and interactive charts.
                            </p>
                            <div className="flex-1 min-h-0">
                                <img 
                                    src="/new-dashboard.png" 
                                    alt="Interactive Dashboard" 
                                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    </ScrollStackItem>

                    <ScrollStackItem itemClassName="h-full bg-white">
                        <div className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Case Analytics
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                Track case performance with detailed analytics and success rates to optimize your strategy.
                            </p>
                            <div className="flex-1 min-h-0">
                                <img 
                                    src="/case-chat.png" 
                                    alt="Case Analytics" 
                                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    </ScrollStackItem>

                    <ScrollStackItem itemClassName="h-full bg-white">
                        <div className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Smart Automation
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                Automate routine tasks and document processing with AI-powered tools.
                            </p>
                            <div className="flex-1 min-h-0">
                                <img 
                                    src="/dashboard.png" 
                                    alt="Smart Automation" 
                                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    </ScrollStackItem>
                </ScrollStack>
            </div>

            {/* CSS to hide scrollbar for WebKit browsers */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}