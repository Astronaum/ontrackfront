import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaHome } from 'react-icons/fa'; // Import the cog and home icon from react-icons/fa

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <FaHome style={styles.icon} />
      </Link>
      <span style={styles.logoTextContainer}>
        <img src="../assets/logo.png" alt="OnTRACK" style={styles.logo} />
      </span>
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
    backgroundColor: ' white',
    borderBottom: '2px solid #053465',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoTextContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: '40px', // Adjust the logo height as needed
    width: 'auto', // Maintain aspect ratio
  },
  settingsContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Add a transition for the animation effect
  },
  icon: {
    height: '30px',
    width: '30px',
    fill: 'gray',
  },
};

export default Navbar;
