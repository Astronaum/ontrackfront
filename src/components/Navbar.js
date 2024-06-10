import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SettingsIcon } from '../icons/sett.svg'; // Assurez-vous d'avoir l'icône SVG pour les paramètres
import { ReactComponent as LogoIcon } from '../icons/logo_optimiz.svg'; // En supposant que vous ayez une icône SVG de logo
import { FaCog } from 'react-icons/fa'; // Import the cog icon from react-icons/fa

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <LogoIcon style={styles.icon} />
      </Link>
      <span className="red-hat-display-onTRACK" >OnTRACK</span> {/* Label "OnTrack" */}
      <Link to="/parametres" style={{ ...styles.settingsContainer, transform: isClicked ? 'rotate(360deg)' : 'rotate(0deg)' }} onClick={handleClick}>
        <FaCog style={styles.icon} />
      </Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '60px',
    backgroundColor: '#053465',
  },
  logoContainer: {
    cursor: 'pointer'
  },
  settingsContainer: {
    cursor: 'pointer',
    transition: 'transform 0.3s ease' // Add a transition for the animation effect
  },
  icon: {
    height: '30px',
    width: '30px',
    fill: 'white'
  },
  label: {
    color: '#ffffff',
    fontSize: '16px', // Adjust font size as needed
    fontWeight: 'bold', // Optionally, set font weight to bold
    fontFamily: "'Roboto', sans-serif" // Set the custom font family
  }
};

export default Navbar;