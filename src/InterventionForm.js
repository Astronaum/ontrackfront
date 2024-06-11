import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEquipement } from './EquipementContext';
import { FaHistory, FaUser, FaBuilding, FaPhone, FaFileImage, FaComment } from 'react-icons/fa';

const InterventionForm = () => {
  const { equipmentId } = useEquipement();
  console.log(equipmentId);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    files: [],
    equipment_id: equipmentId,
    commentaire: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedCompany = localStorage.getItem('company');
    const storedPhone = localStorage.getItem('phone');

    if (storedName) setFormData(prev => ({ ...prev, name: storedName }));
    if (storedCompany) setFormData(prev => ({ ...prev, company: storedCompany }));
    if (storedPhone) setFormData(prev => ({ ...prev, phone: storedPhone }));

    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://oncore-preprod-api.cloud.optimiz-network.fr/api/equipement-images/${equipmentId}`);
        if (response.data.length > 0) {
          const sortedImages = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          const latestImageUrl = sortedImages[0].photo_url;
          console.log(latestImageUrl);
          //const latestImageUrl2 = latestImageUrl.replace("172.28.79.16/", 'http://localhost:8000/');
          setImageUrl(latestImageUrl);
        } else {
          console.error('No image found for equipment ID:', equipmentId);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    const fetchInterventions = async () => {
      try {
        const response = await axios.get(`https://oncore-preprod-api.cloud.optimiz-network.fr/api/interventions/${equipmentId}`);
        console.log('Interventions response:', response.data);
        setInterventions(response.data);
      } catch (error) {
        console.error('Error fetching interventions:', error);
      }
    };

    fetchImage();
    fetchInterventions();
  }, [equipmentId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'files') {
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError(false);

    const data = new FormData();
    data.append('equipment_id', equipmentId); // Use equipmentId from context
    Object.keys(formData).forEach(key => {
      if (key === 'files') {
        formData[key].forEach(file => {
          data.append('files[]', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });
    console.log('id:',formData.equipment_id);
    try {
      const response = await axios.post('https://oncore-preprod-api.cloud.optimiz-network.fr/api/interventions', data, {
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
    <main style={styles.main} className="red-hat-display-section">
      {loading && (
        <div style={styles.overlay} onClick={() => setLoading(false)}>
          <dialog open className="bg-white rounded-lg shadow-lg p-6">
            <h2>Chargement...</h2>
          </dialog>
        </div>
      )}
      {success && (
        <div style={styles.overlay} onClick={() => setSuccess(false)}>
          <dialog open className="bg-white rounded-lg shadow-lg p-6">
            <h2>Intervention créée</h2>
            <p>Merci, vous pouvez maintenant fermer cet onglet</p>
          </dialog>
        </div>
      )}
      {error && (
        <div style={styles.overlay} onClick={() => setError(false)}>
          <dialog open className="bg-white rounded-lg shadow-lg p-6">
            <h2>Erreur</h2>
            <p>Merci de réessayer dans quelques minutes</p>
            <button onClick={() => setError(false)}>OK</button>
          </dialog>
        </div>
      )}

      <WelcomeCard equipmentId={equipmentId} />
      <section style={styles.section}>

        {imageUrl && (
          <div style={styles.imageFrame}>
            <div style={styles.imageContainer}>
              <img src={imageUrl} alt="Equipement" style={styles.image} />
              <Link to="/historique" style={styles.iconLink}>
                <FaHistory style={styles.icon} />
              </Link>
            </div>
          </div>
        )}

        <h1 style={styles.heading}>Création d'intervention</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              <FaUser style={styles.icon} /> 
              <span style={styles.labelText}>Nom</span>
            </label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="company" style={styles.label}>
              <FaBuilding style={styles.icon} />
              <span style={styles.labelText}>Entreprise</span>
            </label>
            <input id="company" name="company" type="text" required value={formData.company} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>
              <FaPhone style={styles.icon} />
              <span style={styles.labelText}>Téléphone</span>
            </label>
            <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="files" style={styles.label}>
              <FaFileImage style={styles.icon} />
              <span style={styles.labelText}>Photos</span>
            </label>
            <input id="files" name="files" type="file" multiple required onChange={handleChange} style={styles.inputFile} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="commentaire" style={styles.label}>
              <FaComment style={styles.icon} />
              <span style={styles.labelText}>Commentaire</span>
            </label>
            <textarea id="commentaire" name="commentaire" value={formData.commentaire} onChange={handleChange} style={styles.textarea} />
          </div>
          <button type="submit" style={styles.button}>Enregistrer</button>
        </form>
      </section>
    </main>
  );
};

const WelcomeCard = ({ equipmentId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [day, ...restOfDate] = formattedDate.split(' ');
  const formattedDateWithCapitalDay = [capitalizeFirstLetter(day), ...restOfDate].join(' ');

  return (
    <div style={styles.welcomeCard}>
      <h2>Bienvenue sur l'équipement</h2>
      <p>{equipmentId}</p>
      <p>{formattedDateWithCapitalDay} | {formattedTime}</p>
    </div>
  );
};

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '20px',
  },
  section: {
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  imageFrame: {
    marginBottom: '20px',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  iconLink: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    zIndex: '1',
  },
  icon: {
    fontSize: '20px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '5px',
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
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  inputFile: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#053465',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  welcomeCard: {
    marginBottom: '10px',
    padding: '1px',
    backgroundColor: '#053465',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    marginTop: '10px',
    color: '#fff',
  },
};

export default InterventionForm;

