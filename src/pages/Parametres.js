import React, { useState } from 'react';
import axios from 'axios';
import { useEquipement } from '../EquipementContext';
import { FaCog, FaFile, FaLock } from 'react-icons/fa';

const Parametres = () => {
  const { equipmentId } = useEquipement();
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('equipement_id', equipmentId);
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

  const handleConfirm = () => {
    // Vérification du mot de passe
    if (password === '1234') { // Remplacez '1234' par votre mot de passe réel
      handleSubmit();
    } else {
      setError('Mot de passe incorrect. Veuillez réessayer.');
    }
  };

  return (
    <div style={styles.main}>
      <div className="red-hat-display-section">
        <div style={styles.titleContainer}>
          <h1 className="red-hat-display-section" style={styles.title}>
            Paramètres
          </h1>
          <FaCog style={styles.icon} />
        </div>
        <div style={styles.container}>
          <p style={styles.equipmentId}>Equipment ID: {equipmentId}</p>
          {error && <p style={styles.error}>{error}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}
          <form onSubmit={e => e.preventDefault()} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="file" style={styles.label}>
                <FaFile style={styles.icon} /> <span style={styles.labelText}>Fichier</span>
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                <FaLock style={styles.icon} /> <span style={styles.labelText}>Pin</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="button" onClick={handleConfirm} style={styles.button}>Confirmer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  main: {
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    padding: '20px 0',
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
    alignItems: 'center',
    marginBottom: '20px',
    padding: '15px',
  },
  title: {
    fontFamily: 'Red Hat Display, sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginRight: '10px',
  },
  icon: {
    fontSize: '20px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '5px',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  labelText: {
    marginLeft: '10px',
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
