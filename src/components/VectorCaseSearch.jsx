import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from "flowbite-react";
import { useLocation } from 'react-router-dom';

const VectorCaseSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [openFirstModal, setOpenFirstModal] = useState(false);
    const [openOtherModal, setOpenOtherModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);

    const location = useLocation();
    const searchTerm = location.state;

    useEffect(() => {
        if (searchTerm) {
            setQuery(searchTerm);
            handleSearch(searchTerm); // Call handleSearch with the searchTerm
        }
    }, [searchTerm]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async (searchQuery = query) => {
        try {
            const response = await axios.post('https://sih-backend-2t3a.onrender.com/vector/query', { search_query: searchQuery });
            if (response.data && Array.isArray(response.data)) {
                setResults(response.data);
            } else {
                setResults([]);
            }
            setError('');
        } catch (error) {
            setError('Error fetching data: ' + error.message);
            console.error('Error:', error);
        }
    };

    const firstResult = results.length > 0 ? results[0] : null;
    const otherResults = results.slice(1);

    const openFirstResultModal = (result) => {
        setSelectedResult(result);
        setOpenFirstModal(true);
    };

    const openOtherResultModal = (result) => {
        setSelectedResult(result);
        setOpenOtherModal(true);
    };

    const convertMarkdownToText = (text) => {
        if (typeof text !== 'string') {
            return '';
        }

        return text
            .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
            .replace(/\*(.*?)\*/g, '$1')     // Italics
            .replace(/`(.*?)`/g, '$1')        // Inline code
            .replace(/\[\w+\]/g, '')          // Remove bracketed text (like [xfed])
            .replace(/[-*] /g, '')            // Remove bullet points
            .replace(/\n/g, ' ');             // Replace new lines with spaces
    };

    return (
        <div className=' mt-16 md:mt-2 relative container px-3 py-10 space-y-8 overflow-auto'>
            <div className="flex md:justify-center items-center gap-7 mb-4 ">
                <input
                    placeholder="Search for cases"
                    className="py-4 px-6 rounded-full shadow shadow-gray-400 w-full max-w-xs md:max-w-md lg:max-w-2xl"
                    value={query}
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={() => handleSearch()} className="bg-elebtn active:bg-blue-600 text-white py-2 px-3 md:px-5 font-semibold rounded-full -ml-28 md:-ml-32">Search</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <div className="card-container space-y-8">
                {firstResult && (
                    <div onClick={() => openFirstResultModal(firstResult)} className="border border-gray-100 card p-4 my-2 mx-2 rounded-xl border-2 border-green-400 shadow-md hover:shadow-lg hover:bg-gray-100 shadow-gray-300">
                        <h3 className='text-xl font-semibold mb-2'>{firstResult['case title']}</h3>
                        <p><strong>Judges:</strong> {firstResult['judges']}</p>
                        <p><strong>Date of Judgment:</strong> {firstResult['date of judgment']}</p>
                        <p><strong>Issues:</strong> {firstResult['issues']}</p>
                    </div>
                )}
                {otherResults.length > 0 ? (
                    otherResults.map((item, index) => (
                        <div onClick={() => openOtherResultModal(item)} className="card border border-gray-100 p-4 my-4 mx-2 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 shadow-gray-300" key={index}>
                            <h3 className='text-xl font-semibold mb-2'>{item['case title']}</h3>
                            <p><strong>Judges:</strong> {item['judges']}</p>
                            <p><strong>Date of Judgment:</strong> {item['date of judgment']}</p>
                            <p><strong>Issues:</strong> {item['issues']}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-center'>No other results found.</p>
                )}
            </div>

            {/* Modal for the first result */}
            <Modal
                show={openFirstModal}
                onClose={() => setOpenFirstModal(false)}
                dismissible
                size='2xl'
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
                <Modal.Header>{selectedResult?.['case title']}</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col space-y-5  overflow-y-auto max-h-96">
                        <p><strong>Judges:</strong> {convertMarkdownToText(selectedResult?.['judges'])}</p>
                        <p><strong>Date of Judgment:</strong> {convertMarkdownToText(selectedResult?.['date of judgment'])}</p>
                        <p><strong>Issues:</strong> {convertMarkdownToText(selectedResult?.['issues'])}</p>
                        <p><strong>Document ID:</strong> {convertMarkdownToText(selectedResult?.['document_id'])}</p>
                        <p><strong>Citation:</strong> {convertMarkdownToText(selectedResult?.['citation'])}</p>
                        <p><strong>Cited Cases:</strong> {convertMarkdownToText(selectedResult?.['cited cases'])}</p>
                        <p><strong>All Text:</strong> {convertMarkdownToText(selectedResult?.['all_text'])}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setOpenFirstModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>

            {/* Modal for other results */}
            <Modal
                show={openOtherModal}
                onClose={() => setOpenOtherModal(false)}
                dismissible
                size='2xl'
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
                <Modal.Header>{selectedResult?.['case title']}</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col overflow-y-auto max-h-96">
                        <p><strong>Judges:</strong> {convertMarkdownToText(selectedResult?.['judges'])}</p>
                        <p><strong>Date of Judgment:</strong> {convertMarkdownToText(selectedResult?.['date of judgment'])}</p>
                        <p><strong>Issues:</strong> {convertMarkdownToText(selectedResult?.['issues'])}</p>
                        <p><strong>Document ID:</strong> {convertMarkdownToText(selectedResult?.['document_id'])}</p>
                        <p><strong>Citation:</strong> {convertMarkdownToText(selectedResult?.['citation'])}</p>
                        <p><strong>Cited Cases:</strong> {convertMarkdownToText(selectedResult?.['cited cases'])}</p>
                        <p><strong>All Text:</strong> {convertMarkdownToText(selectedResult?.['all_text'])}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setOpenOtherModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VectorCaseSearch;
