import React from 'react';
import { Button } from "./ui/button";
import { Eye, Trash2 } from 'lucide-react';
import axios from 'axios';

const TimelineProofBox = ({ proofs, handleProofClick }) => {
    const deleteProof = async (title) => {
        const response = await axios.post(`https://sih-backend-2t3a.onrender.com/cases/deleteProof/${caseid}`, { title });
        console.log(response.data);
        fetchCaseDetails();
    }

    return (
        <div className='mt-3 md:mt-0  flex flex-col col-span-12 md:col-span-6 h-min max-h-[450px] border border-blue-900 shadow-lg custom-scrollbar overflow-auto p-4 pt-0 px-0  rounded-2xl'>
            <div className='flex justify-between items-center sticky border top-0 bg-white py-3 px-6 z-10'>
                <h1 className='text-2xl font-semibold'>Case Proofs</h1>
            </div>
            <div className='w-full p-6 bg-white'>
                <ol className="relative  border-gray-200">
                    {proofs.map((proof, index) => (
                        <li key={index} className="flex flex-col mb-10 md:ml-4 p-4 rounded-2xl border border-elephant-900 shadow-lg hover:bg-slate-100">
                            <div className="mb-1 text-base font-semibold leading-none text-gray-500">
                                <p>Given By: {proof.givenBy}</p>
                            </div>
                            <div className='flex flex-col md:flex-row'>
                                <div className=' flex flex-col '>
                                    <h3 className="text-xl font-semibold text-black">{proof.name}</h3>
                                    <p className="text-gray-600 w-auto text-sm break-words whitespace-normal">
                                        <strong>Description: </strong>{proof.description}
                                    </p>
                                </div>
                                <div className='flex w-full md:justify-end md:items-center'>
                                    <Button onClick={() => handleProofClick(proof.fileid)} variant="ghost" size="sm">
                                        <a target='_blank' rel="noopener noreferrer">
                                            <Eye className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => deleteProof(proof.name)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default TimelineProofBox;
