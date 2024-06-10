import React, { useState } from 'react';
import axios from 'axios';
import { useEquipement } from '../EquipementContext'; // Import useEquipement hook
import { FaCog } from 'react-icons/fa'; // Utilisation de react-icons

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
      const response = await axios.post('https://oncore-preprod-api.cloud.optimiz-network.fr/api/equipement-images', formData, {
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
    <div style={styles.main}>
      <div className="red-hat-display-section">
        <div style={styles.titleContainer}>
          <h1 className="red-hat-display-section" style={styles.title}>
            Paramètres
          </h1>
          <FaCog style={styles.icon} /> {/* Utilisation de react-icons */}
        </div>
        <div style={styles.container}>
          <p style={styles.equipmentId}>Equipment ID: {equipmentId}</p> {/* Display equipmentId in a label */}
          {error && <p style={styles.error}>{error}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="file" style={styles.label}>File:</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Upload Equipement Image</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  main: {
    backgroundColor: '#f4f4f9',
    minHeight: '100vh', // Ensure it covers the full height of the viewport
    padding: '20px 0', // Add some padding for spacing
  },
  container: {
    maxWidth: '600px',
    margin: '25px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center', // Aligner les éléments sur la même ligne
    marginBottom: '20px',
    padding: '15px',
  },
  title: {
    fontFamily: 'Red Hat Display, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginRight: '10px', // Ajouter de la marge à droite pour séparer le titre de l'icône
  },
  icon: {
    fontSize: '24px', // Taille de l'icône
    color: '#333', // Couleur de l'icône
  },
  equipmentId: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#053465',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
};

export default Parametres;
