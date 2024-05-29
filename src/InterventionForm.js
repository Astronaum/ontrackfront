import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InterventionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    file: null,
    equipment_id: '1',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedCompany = localStorage.getItem('company');
    const storedPhone = localStorage.getItem('phone');

    if (storedName) setFormData(prev => ({ ...prev, name: storedName }));
    if (storedCompany) setFormData(prev => ({ ...prev, company: storedCompany }));
    if (storedPhone) setFormData(prev => ({ ...prev, phone: storedPhone }));

    const urlParams = new URLSearchParams(window.location.search);
    const equipmentId = urlParams.get('equipment_id');
    if (equipmentId) setFormData(prev => ({ ...prev, equipment_id: equipmentId }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setSuccess(false);
    setError(false);
  
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
  
    try {
      const response = await axios.post('http://localhost:8000/api/interventions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('name', formData.name);
      localStorage.setItem('company', formData.company);
      localStorage.setItem('phone', formData.phone);
      console.log('Response:', response.data);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <main style={styles.main}>
      <section style={styles.section}>
      <div style={styles.imageContainer}>
          <img src="assets/shelter_test.jpg" alt="Equipement" style={styles.image} />
        </div>
        {/*<img className="logo" src="assets/logo.png" alt="Logo of a company named PRIMIZ network" />*/}
        <h1>Création d'intervention</h1>
        <form onSubmit={handleSubmit}>
          <div role="group">
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} />
          </div>
          <div role="group">
            <label htmlFor="company">Entreprise</label>
            <input id="company" name="company" type="text" required value={formData.company} onChange={handleChange} />
          </div>
          <div role="group">
            <label htmlFor="phone">Téléphone</label>
            <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
          </div>
          <div role="group">
            <label htmlFor="file">Photo</label>
            <input id="file" name="file" type="file" capture required onChange={handleChange} />
          </div>
          <button type="submit">Enregistrer</button>
        </form>
        {loading && (
          <dialog open>
            <h2>Chargement...</h2>
          </dialog>
        )}
        {success && (
          <dialog open>
            <h2>Intervention créée</h2>
            <p>Merci, vous pouvez maintenant fermer cet onglet</p>
          </dialog>
        )}
        {error && (
          <dialog open>
            <h2>Erreur</h2>
            <p>Merci de réessayer dans quelques minutes</p>
            <button onClick={() => setError(false)}>OK</button>
          </dialog>
        )}
      </section>
    </main>
  );
};

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column', // Ensure children stack vertically
    alignItems: 'center',
    minHeight: '100vh', // Use minHeight instead of height to ensure the section takes up at least the viewport height
  },
  section: {
    maxWidth: '400px', // Set maximum width for better readability on smaller screens
    width: '90%', // Adjust the width as needed for responsiveness
    textAlign: 'center', // Center the content horizontally
  },
  image: {
    maxWidth: '100%', // Ensure the image fits within its container
    height: 'auto', // Maintain aspect ratio
    margin: 0, // Remove any default margin to eliminate gaps
    padding: 0, // Remove any default padding to eliminate gaps
  },
  imageContainer: {
    margin: '20px',
    marginBottom: '20px', // Add some spacing between the image and the form
  },
  image: {
    maxWidth: '100%', // Ensure the image fits within its container
    height: 'auto', // Maintain aspect ratio
  },
};

export default InterventionForm;

