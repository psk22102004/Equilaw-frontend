import React, { useState, useEffect } from 'react'

function ViewAllc() {
    const [casesData, setCasesData] = useState([
        { caseid: 1, title: 'The State vs PSK', category: 'Land Dispute', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'open' },
        { caseid: 2, title: 'Liverpool vs Madrid', category: 'Mudrder', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'open' },
        { caseid: 3, title: 'Salah is underrated', category: 'Category 1', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'open' },
        { caseid: 4, title: 'Case 4', category: 'Category 1', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'open' },
        { caseid: 5, title: 'Salah is underrated', category: 'Category 1', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'closed' },
        { caseid: 6, title: 'The State vs PSK', category: 'Land Dispute', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'closed' },
        { caseid: 7, title: 'Case 5', category: 'Category 1', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'closed' },
        { caseid: 8, title: 'Case 5', category: 'Category 1', issue_date: '2021-01-01', next_date: '2021-01-02', status: 'closed' },


    ])

    const openCases = casesData.filter(caseItem => caseItem.status == 'open')
    const closedCases = casesData.filter(caseItem => caseItem.status == 'closed')

    return (
        <div className=" h-screen ">
            <main className=" p-8 overflow-auto h-screen space-y-12 bg-backg text-black">
                <div className='flex flex-col  px-1 '>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl font-semibold'>Completed  Cases</h1>
                    </div>

                    <div className='grid grid-cols-3 gap-5 mt-10 '>
                        {closedCases.map((oncase) => (
                            <div className=" hover:transition-all card-content flex flex-col justify-between space-y-2   p-6 hover:border border-blue-700 hover:rounded-lg bg-white rounded-lg">
                                <h1 className="text-2xl font-bold text-black pb-2">{oncase.title} </h1>
                                <div className="flex justify-between items-center gap-5"> <h1 className="font-semibold text- text-dgray-600 hover:text-black">Issue Date : {oncase.issue_date}</h1>
                                    <h1 className="font-semibold text- text-dgray-600 hover:text-black">Next Date : {oncase.next_date}</h1></div>
                                <h1 className="font-semibold text- text-dgray-600 hover:text-black">Category : <strong>{oncase.category}</strong></h1>
                                <h1 className="font-semibold text- text-dgray-600 hover:text-black">Status : <strong>{oncase.status}</strong></h1>


                            </div>

                        ))}    </div>



                </div>
            </main >
        </div >
    );

}
export default ViewAllc