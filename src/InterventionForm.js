import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEquipement } from './EquipementContext'; // Import useEquipement hook

const InterventionForm = () => {
  const { equipmentId } = useEquipement();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    file: null,
    equipment_id: equipmentId,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedCompany = localStorage.getItem('company');
    const storedPhone = localStorage.getItem('phone');

    if (storedName) setFormData(prev => ({ ...prev, name: storedName }));
    if (storedCompany) setFormData(prev => ({ ...prev, company: storedCompany }));
    if (storedPhone) setFormData(prev => ({ ...prev, phone: storedPhone }));

    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/equipement-images/${equipmentId}`);
        if (response.data.length > 0) {
          // Sort images by created_at in descending order
          const sortedImages = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          // Get the URL of the latest image
          const latestImageUrl = sortedImages[0].photo_url;
          setImageUrl(latestImageUrl);
          console.log('Latest image URL:', latestImageUrl);
        } else {
          console.error('No image found for equipment ID:', equipmentId);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    
    fetchImage();
  }, [equipmentId]);

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
        {imageUrl && (
          <div style={styles.imageContainer}>
            <img src={imageUrl} alt="Equipement" style={styles.image} />
          </div>
        )}
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
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  section: {
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: 0,
    padding: 0,
  },
  imageContainer: {
    margin: '20px',
    marginBottom: '20px',
  },
};

export default InterventionForm;
