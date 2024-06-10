import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEquipement } from '../EquipementContext'; 
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Historique = () => {
  const { equipmentId } = useEquipement();
  const [interventions, setInterventions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        const response = await axios.get(`https://oncore-preprod-api.cloud.optimiz-network.fr/api/interventions/${equipmentId}`);
        console.log('Interventions response:', response.data); 
        setInterventions(response.data);
      } catch (error) {
        console.error('Error fetching interventions:', error);
      }
    };

    fetchInterventions();
  }, [equipmentId]);

  const displayedInterventions = showAll ? interventions : interventions.slice(0, 2);

  return (
    <div style={styles.main}>
      <div style={styles.titleContainer}>
        <h1 className="red-hat-display-section" style={styles.title}>Historique</h1>
        <span className="material-symbols-outlined" style={styles.icon}>history</span>
      </div>
      <div style={styles.cardsContainer}>
        {displayedInterventions.map(intervention => (
          <div key={intervention.id} style={styles.card}>
            <div style={styles.cardContent}>
              <h2>{intervention.name}</h2>
              <p>Company: {intervention.company}</p>
              <p>Phone: {intervention.phone}</p>
              <p>Date: {new Date(intervention.created_at).toLocaleDateString()}</p>
              <p>Commentaire: {intervention.commentaire}</p>
            </div>
            <Carousel dynamicHeight={true} showThumbs={false} style={styles.carousel}>
              {intervention.photo_urls.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`Photo ${index}`} style={styles.carouselImage} />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
      {interventions.length > 3 && (
        <div style={styles.showMoreContainer}>
          <button onClick={() => setShowAll(!showAll)} style={styles.showMoreButton}>
            {showAll ? (
              <>
                Voir moins <FaChevronUp />
              </>
            ) : (
              <>
                Voir plus <FaChevronDown />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  main: {
    backgroundColor: '#f4f4f9',
    padding: '20px',
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
    fontSize: '24px',
    color: '#333',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '80%',
    maxWidth: '500px',
    margin: '20px 0',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardContent: {
    textAlign: 'left', 
    marginBottom: '10px',
  },
  carousel: {
    textAlign: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 'auto',
  },
  showMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  showMoreButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#053465',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Historique;
