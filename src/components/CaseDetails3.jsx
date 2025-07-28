import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HearingForm from './HearingForm';
import DateCarousel from './DateCarousel';
import TimelineProofBox from './TimelineProofBox';
import { Modal } from "flowbite-react";
//import file saver
import { saveAs } from 'file-saver';


const CaseDetails3 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { _id, caseid } = location.state;

    const [caseTitle, setCaseTitle] = useState("This is an example case title");
    const [caseIssueDate, setCaseIssueDate] = useState("22-10-2004");
    const [caseCategory, setCaseCategory] = useState("Land Issue");
    const [caseDesc, setCaseDesc] = useState("This is an example case description");

    const [judges, setJudges] = useState(['Judge 1', 'Judge 2', 'Judge 3']);

    const [hearings, setHearings] = useState([
        {
            dateOfHearing: '2004-10-22',
            nextHearingDate: '2005-01-16',
            description: 'On October 22, 2004, the court convened to address a complex land dispute involving multiple parties. Testimonies revealed significant discrepancies in the documents presented by the defendant, raising questions about ownership rights. The plaintiff argued that historical evidence strongly supports their claim, while the defense countered with alternative documents that were scrutinized. Witnesses provided compelling accounts that could influence the court’s decision2004, the court convened to address a complex land dispute involving multiple parties. Testimonies revealed significant discrepancies in the documents presented by the defendant, raising questions about ownership rights. The plaintiff argued that historical evidence strongly supports their claim, while the defense countered with alternative documents that were scrutinized. Witnesses provided compelling accounts that could influence the court’s decision2004, the court convened to address a complex land dispute involving multiple parties. Testimonies revealed significant discrepancies in the documents presented by the defendant, raising questions about ownership rights. The plaintiff argued that historical evidence strongly supports their claim, while the defense countered with alternative documents that were scrutinized. Witnesses provided compelling accounts that could influence the court’s decision2004, the court convened to address a complex land dispute involving multiple parties. Testimonies revealed significant discrepancies in the documents presented by the defendant, raising questions about ownership rights. The plaintiff argued that historical evidence strongly supports their claim, while the defense countered with alternative documents that were scrutinized. Witnesses provided compelling accounts that could influence the court’s decision, emphasizing the importance of accuracy in property documentation. The judge decided to adjourn the session to allow further evidence gathering, with the next hearing scheduled for January 16, 2005.',
            transcriptTitle: 'Hearing Transcript - 22nd October 2004',
            transcript: 'transcriptID 1',
            proofs: [
                { name: 'Property Title Deed', description: 'Original title deed for the disputed land', givenBy: 'Person A', fileid: 1 },
                { name: 'Land Survey Report', description: 'Detailed survey conducted by an accredited surveyor', givenBy: 'Person B', fileid: 2 },
                { name: 'Witness Statement', description: 'Statement from a neighbor corroborating the claims', givenBy: 'Person C', fileid: 3 },
                { name: 'Previous Sale Agreement', description: 'Document related to the previous sale of the land', givenBy: 'Person D', fileid: 4 },
            ]
        },
        {
            dateOfHearing: '2005-11-22',
            nextHearingDate: '2006-01-16',
            description: 'The hearing on November 22, 2005, was crucial for the ongoing land case. Both sides presented their closing arguments, with the court reviewing evidence submitted over the preceding months. The judge raised concerns about the authenticity of certain documents, questioning their validity. New witnesses were introduced, providing testimony that could potentially shift the case’s outcome. The judge acknowledged the complexities surrounding the ownership claims and decided to adjourn the session, allowing further investigation into these new testimonies before the next hearing.',
            transcriptTitle: 'Hearing Transcript - 22nd November 2005',
            transcript: 'transcriptID 2',
            proofs: [
                { name: 'Updated Witness Testimony', description: 'New testimony from a previously unavailable witness', givenBy: 'Person E', fileid: 5 }
            ]
        },
        {
            dateOfHearing: '2006-03-15',
            nextHearingDate: '2006-05-10',
            description: 'During the March 15, 2006 hearing, both sides presented final arguments, with expert witnesses discussing land valuation and historical ownership records. The complexities of the land’s history were laid bare, highlighting various transfer irregularities. Expert insights into the land’s current market value were pivotal for the court’s assessment. The judge, recognizing the need for a thorough examination of all evidence, postponed the decision until the next hearing scheduled for May 10, 2006.',
            transcriptTitle: 'Hearing Transcript - 15th March 2006',
            transcript: 'transcriptID 3',
            proofs: [
                { name: 'Expert Valuation Report', description: 'Report by a certified land appraiser detailing the property\'s current market value', givenBy: 'Person F', fileid: 6 },
                { name: 'Historical Ownership Records', description: 'Documents tracing the ownership of the land over the past century', givenBy: 'Person G', fileid: 7 },
            ]
        },
        {
            dateOfHearing: '2006-07-18',
            nextHearingDate: '2006-09-14',
            description: 'The hearing held on July 18, 2006, represented a significant point in the case. The judge reviewed all evidence and testimonies presented thus far, emphasizing the need for a thorough assessment of each piece of evidence regarding the ownership claims. Both parties were allowed to make final pleas, with the plaintiff asserting a strong claim based on historical records. The defendant presented documents they believed validated their ownership. After extensive deliberation, the judge called for additional documentation before making a decision, scheduling the next hearing for September 14, 2006.',
            transcriptTitle: 'Hearing Transcript - 18th July 2006',
            transcript: 'transcriptID 4',
            proofs: [
                { name: 'Final Plea Submission', description: 'Document summarizing the final arguments and requests from both parties', givenBy: 'Person H', fileid: 8 },
                { name: 'Land Use Certificates', description: 'Certificates showing land usage history and compliance with local laws', givenBy: 'Person I', fileid: 9 },
            ]
        },
    ]);


    const [selectedHearingDate, setSelectedHearingDate] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const [proofFileLink, setProofFileLink] = useState();
    const [transcriptFileLink, setTranscriptFileLink] = useState();


    const fetchCaseDetails = async () => {
        const response = await axios.get(`https://sih-backend-2t3a.onrender.com/cases/get_case/${_id}`);
        setCaseTitle(response.data.title);
        setCaseIssueDate(response.data.issue_date);
        setCaseCategory(response.data.category);
        setCaseDesc(response.data.description);
        setJudges(response.data.judges);
        setHearings(response.data.hearings); // hearings is an array of objects
    };

    useEffect(() => {
        fetchCaseDetails();
    }, [caseid]);

    const handleTranscriptClick = async (transcriptId) => {
        try {
            const response = await axios.get(`https://sih-backend-2t3a.onrender.com/cases/download/${transcriptId}`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `transcript_${transcriptId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading transcript:", error);
        }
    };


    const handleProofClick = async (fileid) => {
        try {
            const response = await axios.get(`https://sih-backend-2t3a.onrender.com/cases/download/${fileid}`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `proof_${fileid}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading proof:", error);
        }
    };

    return (
        <div className='mt-16 md:mt-0 h-screen  md:w-full p-6  space-y-6 '>
            <div className='rounded-xl p-6 border-2 shadow-lg  flex flex-col space-y-3 md:space-y-6 bg-white'>
                <div className='flex justify-between space-x-3 md:space-x-6'>
                    <p className='text-gray-600 font-semibold'>Issue Date :  {caseIssueDate} </p>
                    <button onClick={() => {
                        navigate('caseChat', { state: { caseid, caseTitle, _id } });
                    }}
                        className='border border-gray-400 bg-blue-700 hover:bg-blue-800 text-white px-1 py-2 md:px-8 md:py-2 rounded-xl  text-sm md:text-base font-bold  self-start'>AI Analyse</button>
                </div>
                <p className='py-1 px-2 bg-blue-600 text-white font-semibold rounded-2xl self-start'>{caseCategory} </p>
                <h1 className='text-lg md:text-3xl font-poppins font-semibold'>{caseTitle} </h1>
                <p className='font-montserrat'>{caseDesc} </p>

            </div>

            <div className='hearingDetails flex flex-col space-y-6'>
                <div className='space-y-2 md:flex flex-row justify-between font-semibold'>
                    <h1 className='text-lg md:text-3xl'>Hearing Details</h1>
                    <div className='space-y-2  sm:flex-col md:flex-row md:space-x-4 md:gap-2'>
                        {/* Dropdown for filtering by dateOfHearing */}
                        <select
                            className='bg-blue-800 text-white rounded-xl p-3 md:px-6 md:py-2 border-2'
                            onChange={(e) => setSelectedHearingDate(e.target.value)}
                            value={selectedHearingDate || ''}
                        >
                            <option value="" disabled>Select a hearing date</option>
                            {hearings.map((hearing, index) => (
                                <option className='bg-white text-black' key={index} value={hearing.dateOfHearing}>
                                    {hearing.dateOfHearing}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setOpenModal(true)} className='bg-white  text-blue-800 rounded-xl hover:bg-blue-800 hover:text-white px-6 py-2 border-2'>Add Hearing</button>
                    </div>
                </div>

                <div className='w-full mx-auto'>
                    <DateCarousel hearings={hearings} setSelectedHearingDate={setSelectedHearingDate} />
                </div>

                <div className='w-full'>
                    {selectedHearingDate ? (
                        hearings.map((ele, index) => (
                            ele.dateOfHearing === selectedHearingDate && (
                                <div className='w-full grid grid-cols-12 md:space-x-6' key={index}>
                                    <div className='bg-white shadow-xl border-2 rounded-lg p-5 h-min space-y-6 col-span-12 md:col-span-6'>
                                        <div className='flex justify-between'>
                                            <p className='text-xl font-semibold'>Date of Hearing: {ele.dateOfHearing}</p>
                                            <p>Next Hearing Date: {ele.nextHearingDate}</p>
                                        </div>
                                        <div className='flex flex-col col-span-12 md:col-span-6 h-min max-h-[300px] border overflow-auto p-4 rounded-lg'>
                                            <p className='whitespace-pre-wrap break-words'>
                                                Description: {ele.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => { handleTranscriptClick(ele.transcript); }}
                                            className='bg-blue-800 text-white px-6 py-2 self-start rounded-lg'
                                        >
                                            <a href={transcriptFileLink}> {ele.transcriptTitle} </a>
                                        </button>
                                    </div>

                                    <TimelineProofBox handleProofClick={handleProofClick} proofs={ele.proofs} />
                                </div>
                            )
                        ))
                    ) : (
                        <h1 className='text-3xl'>Select a date</h1>
                    )}
                </div>
            </div>

            <Modal className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                dismissible show={openModal} size='2xl'
                onClose={() => setOpenModal(false)}
            >
                <Modal.Body>

                    <HearingForm caseid={caseid} _id={_id} fetchCaseDetails={fetchCaseDetails} closeModal={() => { setOpenModal(false) }} />

                </Modal.Body>

            </Modal>
        </div>
    );
};

export default CaseDetails3;
