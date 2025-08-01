import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from "flowbite-react";
import { useLocation } from 'react-router-dom';
import { InfoCircledIcon } from '@radix-ui/react-icons';

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
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
               

                {/* Search Section */}
                <div className="p-8">
                    <div className="flex flex-col items-center gap-3 mb-8">
                        <div className="relative w-full max-w-xs md:max-w-md lg:max-w-2xl">
                            <input
                                placeholder="Search for cases"
                                className="w-full py-4 px-6 pr-28 rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={query}
                                onChange={handleChange}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button 
                                onClick={() => handleSearch()} 
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 px-6 font-semibold rounded-full transition-colors shadow-sm"
                            >
                                Search
                            </button>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-full">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6 overflow-auto max-h-[calc(100vh-300px)]">
                        {firstResult && (
                            <div 
                                onClick={() => openFirstResultModal(firstResult)} 
                                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{firstResult['case title']}</h3>
                                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Top Result
                                    </div>
                                </div>
                                <div className="space-y-2 text-gray-600">
                                    <p><span className="font-semibold text-gray-800">Judges:</span> {firstResult['judges']}</p>
                                    <p><span className="font-semibold text-gray-800">Date of Judgment:</span> {firstResult['date of judgment']}</p>
                                    <p><span className="font-semibold text-gray-800">Issues:</span> {firstResult['issues']}</p>
                                </div>
                            </div>
                        )}

                        {otherResults.length > 0 ? (
                            otherResults.map((item, index) => (
                                <div 
                                    onClick={() => openOtherResultModal(item)} 
                                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300" 
                                    key={index}
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">{item['case title']}</h3>
                                    <div className="space-y-2 text-gray-600">
                                        <p><span className="font-semibold text-gray-800">Judges:</span> {item['judges']}</p>
                                        <p><span className="font-semibold text-gray-800">Date of Judgment:</span> {item['date of judgment']}</p>
                                        <p><span className="font-semibold text-gray-800">Issues:</span> {item['issues']}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            results.length === 0 && query && (
                                <div className="flex items-center justify-center h-64">
                                    <div className="bg-blue-100 border border-blue-200 text-blue-700 p-6 rounded-2xl shadow-lg">
                                        <p className="text-center flex items-center gap-2 font-medium">
                                            <InfoCircledIcon className="w-5 h-5"/>
                                            No other results found.
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for the first result */}
            <Modal
                show={openFirstModal}
                onClose={() => setOpenFirstModal(false)}
                dismissible
                size='2xl'
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
                <Modal.Header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
                    {selectedResult?.['case title']}
                </Modal.Header>
                <Modal.Body className="bg-white">
                    <div className="flex flex-col space-y-5 overflow-y-auto max-h-96">
                        <p><strong className="text-gray-800">Judges:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['judges'])}</span></p>
                        <p><strong className="text-gray-800">Date of Judgment:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['date of judgment'])}</span></p>
                        <p><strong className="text-gray-800">Issues:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['issues'])}</span></p>
                        <p><strong className="text-gray-800">Document ID:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['document_id'])}</span></p>
                        <p><strong className="text-gray-800">Citation:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['citation'])}</span></p>
                        <p><strong className="text-gray-800">Cited Cases:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['cited cases'])}</span></p>
                        <p><strong className="text-gray-800">All Text:</strong> <span className="text-gray-600">{convertMarkdownToText(selectedResult?.['all_text'])}</span></p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-gray-50 rounded-b-xl">
                    <button 
                        onClick={() => setOpenOtherModal(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default VectorCaseSearch;