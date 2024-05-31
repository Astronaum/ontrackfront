import React, { useState } from 'react';
import axios from 'axios';
import { useEquipement } from '../EquipementContext'; // Import useEquipement hook

const Parametres = () => {
  const { equipmentId } = useEquipement(); // Get the equipmentId from the context
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('equipement_id', equipmentId); // Use equipmentId from context
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/equipement-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccessMessage('Equipement image uploaded successfully!');
      setError(null);
    } catch (error) {
      setError('Failed to upload equipement image. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Parametres Page</h1>
      <p>Equipment ID: {equipmentId}</p> {/* Display equipmentId in a label */}
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload Equipement Image</button>
      </form>
    </div>
  );
};

export default Parametres;
