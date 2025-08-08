import React from 'react'

const WelcomeContainer = () => {
  return (
    <div><div className="mb-8">
                    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl border border-slate-200/60 p-8 relative overflow-hidden shadow-lg">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-transparent to-amber-100/50"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full blur-3xl"></div>
                        
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex-1">
                                <div className="mb-3">
                                    <span className="text-sm font-semibold text-amber-600 tracking-wide uppercase">Good morning</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
                                    John Doe
                                </h2>
                                <p className="text-slate-600 max-w-md leading-relaxed text-base font-medium">
                                    Explore your cases, important updates, and resources to assist you in your legal journey.
                                </p>
                                
                                {/* Subtle accent line */}
                                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-6"></div>
                            </div>
                            
                          
                        </div>
                    </div>
                </div></div>
  )
}

export default WelcomeContainer