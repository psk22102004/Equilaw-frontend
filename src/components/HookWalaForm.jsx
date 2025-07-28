import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hearings = () => {
  const [hearings, setHearings] = useState([]); // Initialize as an empty array
  const [hearingTitle, setHearingTitle] = useState('');
  const [proofs, setProofs] = useState([{ proofTitle: '', proofFile: null }]);

  // Fetch hearings from backend
  useEffect(() => {
    const fetchHearings = async () => {
      try {
        const response = await axios.get('/api/hearings');
        setHearings(response.data.hearings || []); // Ensure we handle undefined properly
      } catch (error) {
        console.error('Error fetching hearings:', error);
      }
    };
    fetchHearings();
  }, []);

  // Handle changes in proof fields
  const handleProofChange = (index, event) => {
    const { name, value, files } = event.target;
    const newProofs = [...proofs];
    if (name === 'proofFile') {
      newProofs[index][name] = files[0];
    } else {
      newProofs[index][name] = value;
    }
    setProofs(newProofs);
  };

  // Add a new proof row
  const addProof = () => {
    setProofs([...proofs, { proofTitle: '', proofFile: null }]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('hearingTitle', hearingTitle);
    proofs.forEach((proof, index) => {
      formData.append(`proof_names`, proof.proofTitle);
      if (proof.proofFile) {
        formData.append(`proofs[proofFile]`, proof.proofFile);
      }
    });

    try {
      await axios.post('/api/hearings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form fields after submission
      setHearingTitle('');
      setProofs([{ proofTitle: '', proofFile: null }]);
      // Fetch updated hearings
      const response = await axios.get('/api/hearings');
      setHearings(response.data.hearings || []);
    } catch (error) {
      console.error('Error adding hearing:', error);
    }
  };

  return (
    <div>
      <h1>Hearings</h1>
      {hearings.length > 0 ? ( // Conditional rendering to check if hearings exist
        hearings.map((hearing, index) => (
          <div key={index}>
            <h2>{hearing.hearingTitle}</h2>
            <h3>Proofs:</h3>
            <ul>
              {hearing.proof.map((p, i) => (
                <li key={i}>
                  {p.proofTitle} - <a href={p.proofFile}>Download</a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No hearings available.</p> // Message if no hearings are found
      )}

      <h2>Add New Hearing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Hearing Title:
            <input
              type="text"
              value={hearingTitle}
              onChange={(e) => setHearingTitle(e.target.value)}
              required
            />
          </label>
        </div>
        {proofs.map((proof, index) => (
          <div key={index}>
            <label>
              Proof Title:
              <input
                type="text"
                name="proofTitle"
                value={proof.proofTitle}
                onChange={(e) => handleProofChange(index, e)}
                required
              />
            </label>
            <label>
              Proof File:
              <input
                type="file"
                name="proofFile"
                onChange={(e) => handleProofChange(index, e)}
                required
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addProof}>
          Add Proof
        </button>
        <button type="submit">Submit Hearing</button>
      </form>
    </div>
  );
};

export default Hearings;
