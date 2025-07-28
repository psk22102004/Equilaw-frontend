import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const HearingForm = ({ caseid, _id, fetchCaseDetails, closeModal }) => {
    const { register, control, handleSubmit, reset } = useForm();
    const { fields: witnessFields, append: appendWitness, remove: removeWitness } = useFieldArray({
        control,
        name: 'witnesses',
    });
    const { fields: proofFields, append: appendProof, remove: removeProof } = useFieldArray({
        control,
        name: 'proofs',
    });

    const [transcriptFile, setTranscriptFile] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('dateOfHearing', data.dateOfHearing);
        formData.append('nextHearingDate', data.nextHearingDate);
        formData.append('description', data.description);
        formData.append('transcript', transcriptFile);
        formData.append('transcriptTitle', data.transcriptTitle);

        // Append witnesses
        data.witnesses.forEach(witness => {
            formData.append('witnesses', witness);
        });

        // Append proof data
        data.proofs.forEach((proof, index) => {
            formData.append('proof_names', proof.name);
            formData.append('proof_descriptions', proof.description);
            formData.append('proof_givenBy', proof.givenBy);
            formData.append('proof_files', proof.file[0]);
        });

        try {
            const response = await axios.post(`https://sih-backend-2t3a.onrender.com/cases/${_id}/hearings`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Hearing added successfully', response.data);
            reset();
            setTranscriptFile(null);
            closeModal();
            fetchCaseDetails();
        } catch (error) {
            console.error('Error adding hearing', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className=" space-y-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800">Add Hearing</h2>

            <div className="flex flex-col space-y-4">
                <label className="text-sm md:text-lg font-semibold">Date of Hearing:</label>
                <input
                    type="date"
                    {...register('dateOfHearing')}
                    required
                    className="border border-gray-300 rounded-lg text-sm md:text-lg  p-1 md:p-2"
                />
            </div>

            <div className="flex flex-col space-y-4">
                <label className="text-sm md:text-lg font-semibold">Next Hearing Date:</label>
                <input
                    type="date"
                    {...register('nextHearingDate')}
                    required
                    className="border border-gray-300 rounded-lg text-sm md:text-lg p-1 md:p-2"
                />
            </div>

            <div className="flex flex-col space-y-4">
                <label className="text-sm md:text-lg font-semibold">Description:</label>
                <textarea
                    {...register('description')}
                    required
                    className="border border-gray-300 rounded-lg p-2"
                />
            </div>
            <div>
                <label className='text-sm md:text-lg'>Transcript Title:</label>  {/* Add transcript title input */}
                <input
                    type="text"
                    {...register('transcriptTitle')}
                    placeholder="Transcript Title"
                    className='text-sm md:text-lg w-full  '
                    required
                />
            </div>

            <div className="flex flex-col space-y-4">
                <label className=" text-sm md:text-lg font-semibold">Transcript File:</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setTranscriptFile(e.target.files[0])}
                    required
                    className="border border-gray-300 text-sm md:text-lg  rounded-lg "
                />
            </div>

            <h3 className="text-sm md:text-lg  font-semibold mt-4">Witnesses</h3>
            {witnessFields.map((field, index) => (
                <div key={field.id} className="flex flex-col space-y-2  md:flex-row justify-between md:space-y-0 md:space-x-2 md:items-center">
                    <input
                        type="text"
                        {...register(`witnesses.${index}`)}
                        placeholder="Witness name"
                        required
                        className="border border-gray-300 rounded-lg text-sm md:text-lg p-1 md:p-2 flex-1"
                    />
                    <button
                        type="button"
                        onClick={() => removeWitness(index)}
                        className="bg-red-600 text-white rounded-lg text-sm md:text-lg px-2 md:px-4 py-2 hover:bg-red-700"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => appendWitness('')}
                className="bg-blue-600 text-white rounded-lg text-sm md:text-lg px-2 md:px-4 py-2 hover:bg-blue-800"
            >
                Add Witness
            </button>

            <h3 className="text-sm md:text-lg font-semibold mt-4">Proofs</h3>
            {proofFields.map((field, index) => (
                <div key={field.id} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        {...register(`proofs.${index}.name`)}
                        placeholder="Proof Name"
                        required
                        className="border border-gray-300 text-sm md:text-lg px-2  rounded-lg p-1 md:p-2"
                    />
                    <textarea
                        {...register(`proofs.${index}.description`)}
                        placeholder="Proof Description"
                        required
                        className="border border-gray-300 text-sm md:text-lg p-1  rounded-lg md:p-2"
                    />
                    <input
                        type="text"
                        {...register(`proofs.${index}.givenBy`)}
                        placeholder="Given By"
                        required
                        className="border border-gray-300 text-sm md:text-lg  p-1 rounded-lg md:p-2"
                    />
                    <div className="flex flex-col space-y-2  md:flex-row justify-between md:space-y-0 md:space-x-2 md:items-center"><input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        {...register(`proofs.${index}.file`)}
                        required
                        className="border border-gray-300 rounded-lg w-full "
                    />
                        <button
                            type="button"
                            onClick={() => removeProof(index)}
                            className="bg-red-600 text-white rounded-lg text-sm md:text-lg px-2  md:px-4 py-2 hover:bg-red-700 "
                        >
                            Remove
                        </button></div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => appendProof({ name: '', description: '', givenBy: '', file: null })}
                className="bg-blue-700 text-white rounded-lg text-sm md:text-lg px-2 md:px-4 py-2 hover:bg-blue-600"
            >
                Add Proof
            </button>

            <div className="mt-6">
                <button type="submit" className="bg-blue-700 text-white text-sm md:text-lg rounded-lg px-3 md:px-6 py-2 hover:bg-blue-600">
                    Submit Hearing
                </button>
            </div>
        </form>
    );
};

export default HearingForm;
