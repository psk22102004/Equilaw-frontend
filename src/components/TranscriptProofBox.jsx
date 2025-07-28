import React, { useEffect, useState, useRef } from 'react'
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Plus, FileText, Trash2, Eye } from 'lucide-react';
import { Modal } from "flowbite-react";
import axios from 'axios';

const TranscriptProofBox = ({ caseid, data, fetchCaseDetails }) => {
    //the 'data' received here is an array of objects
    const [isProof, setIsProof] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const proofInputRef = useRef(null);
    const transcriptRef = useRef(null);


    const [caseProofTitle, setCaseProofTitle] = useState();
    const [caseProofDescription, setCaseProofDescription] = useState();
    const [caseProofGivenBy, setCaseProofGivenBy] = useState();
    const [caseProofDocument, setCaseProofDocument] = useState();

    const [caseTranscriptTitle, setCaseTranscriptTitle] = useState();
    const [caseTranscriptDate, setCaseTranscriptDate] = useState();
    const [caseTranscriptDocument, setCaseTranscriptDocument] = useState();




    //to check if recieved data is proof or transcript
    useEffect(
        () => {
            data.map(
                (ele) => {
                    if (ele.given_by) {
                        setIsProof(true)
                    }
                    else {
                        setIsProof(false)
                    }
                }
            )

        }, [data]
    )

    // Convert base64 string to Blob
    const base64ToBlob = (base64) => {
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handleProofChange = (e) => {
        const file = e.target.files[0];
        setCaseProofDocument(file);
    };
    const handleTranscriptChange = (e) => {
        const file = e.target.files[0];
        setCaseTranscriptDocument(file);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (isProof) {
            formData.append('title', caseProofTitle);
            formData.append('description', caseProofDescription);
            formData.append('given_by', caseProofGivenBy);
            formData.append('document', caseProofDocument)
            const response = await axios.post(`https://sih-backend-2t3a.onrender.com/cases/addProof/${caseid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
        }
        else {
            formData.append('date', caseTranscriptDate);
            formData.append('title', caseTranscriptTitle);
            formData.append('document', caseTranscriptDocument);
            const response = await axios.post(`https://sih-backend-2t3a.onrender.com/cases/addTranscript/${caseid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);

        }
        // After submission, reset the form fields
        setCaseProofTitle("");
        setCaseProofDescription("");
        setCaseProofGivenBy("");
        setCaseProofDocument(null);

        setCaseTranscriptTitle("");
        setCaseTranscriptDate("");
        setCaseTranscriptDocument(null);

        // Close the modal
        setOpenModal(false);

        // Fetch updated case details
        fetchCaseDetails();
        console.log("Form submitted and modal closed!");

    }

    const deleteDocument = async (title) => {
        if (isProof) {
            const response = await axios.post(`https://sih-backend-2t3a.onrender.com/cases/deleteProof/${caseid}`, title);
            console.log(response.data);
            fetchCaseDetails();
        }
        else {
            const response = await axios.post(`https://sih-backend-2t3a.onrender.com/cases/deleteTranscript/${caseid}`, title);
            console.log(response.data);
            fetchCaseDetails();

        }
    }

    return (
        <div className='flex flex-col col-span-12 md:col-span-6  h-min max-h-[450px] border border-elephant-900 shadow-lg custom-scrollbar overflow-auto p-4 pt-0 px-0  rounded-2xl'>
            <div className='flex justify-between items-center sticky border top-0 bg-white py-3 px-6 z-10'>
                <h1 className='text-2xl font-semibold'>{isProof ? 'Case Proof' : 'Case Transcript'} </h1>
                <button onClick={() => setOpenModal(true)} className='border border-black px-4 py-2 rounded-xl bg-elephant-900 font-bold text-white'>Add {isProof ? 'Proof' : 'Transcript'} </button>
            </div>
            <div className='w-full p-6 bg-white'>
                <ol className="relative border-l  border-gray-200 ">
                    {
                        data.map((ele, index) => {

                            const blob = base64ToBlob(ele.document);
                            const url = URL.createObjectURL(blob);
                            return (
                                <li key={index} className="flex flex-col mb-10 ml-4 p-4  rounded-2xl border border-elephant-900 shadow-lg  hover:bg-slate-100">
                                    <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white"></div>

                                    <div className="mb-1 text-base font-semibold leading-none text-gray-500 ">
                                        {/* date or given_by based on proof or transcript */}
                                        <p>{isProof ? `Given By : ${ele.given_by}` : `Issue Date : ${ele.date}`} </p>
                                    </div>
                                    <div className='flex'>
                                        <div className='p-2 flex flex-col gap-'>
                                            <a href={url} target='_blank' className="text-xl basis-1/2 font-semibold text-black">
                                                {ele.title}
                                            </a>
                                            <p className="text-gray-600 w-60 break-words whitespace-normal">
                                                {isProof ? <strong>Description: </strong> : null}
                                                {isProof && <span>{ele.description}</span>}
                                            </p>
                                        </div>
                                        <div className='flex w-full eles-center justify-end'>
                                            <Button variant="ghost" size="sm">
                                                <a href={url} target='_blank' rel="noopener noreferrer">
                                                    <Eye className="h-4 w-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => deleteDocument(ele.title)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        )}
                </ol>
            </div>
            <Modal className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                dismissible show={openModal} size='2xl'
                onClose={() => setOpenModal(false)}
            >
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="bg-white max-w-2xl space-y-6 flex flex-col  text-center justify-center items-center">
                            {isProof ?
                                <div className='flex flex-col space-y-12 w-full'>
                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <h1 className='w-1/3 text-2xl font-semibold'>Proof Title</h1>
                                        <input name='proof-title' className='flex-1 rounded-lg p-2 border-2' onChange={(e) => { setCaseProofTitle(e.target.value) }} placeholder='Enter proof title' />
                                    </div>
                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <h1 className='w-1/3 text-2xl font-semibold'>Proof Description</h1>
                                        <input name='proof-description' className='flex-1 rounded-lg p-2 border-2' onChange={(e) => { setCaseProofDescription(e.target.value) }} placeholder='Enter proof description' />
                                    </div>

                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <h1 className='w-1/3 text-2xl font-semibold'>Proof Given By</h1>
                                        <input name='proof-givenBy' className='flex-1 rounded-lg p-2 border-2' onChange={(e) => { setCaseProofGivenBy(e.target.value) }} placeholder='Enter proof Given by' />
                                    </div>

                                    <input name='proofDocument-input' type='file' className='hidden' ref={proofInputRef} onChange={handleProofChange} required />

                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <button onClick={() => proofInputRef.current.click()} className="border w-1/3 bg-dgray-600 text-white font-bold  px-6 py-2 rounded-lg">
                                            Upload Proof
                                        </button>
                                        {
                                            caseProofDocument ? <h1 className='flex-1 rounded-lg p-2  font-semibold text-start'> {caseProofDocument.name} </h1> : <h1 className='flex-1 rounded-lg p-2  font-semibold text-start'>No file uploaded</h1>
                                        }
                                    </div>

                                    <button type='submit' className='border px-10 py-2 rounded-xl bg-black text-white font-semibold mx-auto'>Submit</button>

                                </div>
                                :
                                <div className='flex flex-col space-y-12 w-full'>
                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <h1 className='w-1/3 text-2xl font-semibold'>Transcript Title</h1>
                                        <input name='transcript-title' className='flex-1 rounded-lg p-2 border-2' onChange={(e) => { setCaseTranscriptTitle(e.target.value) }} placeholder='Enter transcript title' />
                                    </div>
                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <h1 className='w-1/3 text-2xl font-semibold'>Transcript Date</h1>
                                        <input name='transcript-date' className='flex-1 rounded-lg p-2 border-2' onChange={(e) => { setCaseTranscriptDate(e.target.value) }} placeholder='Enter transcript date' />
                                    </div>

                                    <input name='transcriptDocument-input' type='file' className='hidden' ref={transcriptRef} onChange={handleTranscriptChange} required />

                                    <div className='flex justify-center items-center space-x-4 w-full'>
                                        <button onClick={() => transcriptRef.current.click()} className="border w-1/3 bg-dgray-600 text-white font-bold px-6 py-2 rounded-lg">
                                            Upload Transcript
                                        </button>
                                        {
                                            caseTranscriptDocument ? <h1 className='flex-1 rounded-lg p-2 font-semibold text-start'> {caseTranscriptDocument.name} </h1> : <h1 className='flex-1 rounded-lg p-2 font-semibold text-start'>No file uploaded</h1>
                                        }
                                    </div>

                                    <button type='submit' className='border px-10 py-2 rounded-xl bg-black text-white font-semibold mx-auto'>Submit</button>
                                </div>

                            }
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default TranscriptProofBox