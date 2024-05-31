import React from 'react';
import { ReactComponent as SettingsIcon } from '../icons/sett.svg'; // Make sure you have the SVG for the settings icon
import { ReactComponent as LogoIcon } from '../icons/logo_optimiz.svg'; // Assuming you have an SVG logo icon

const Navbar = ({ onNavigate }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer} onClick={() => onNavigate('interventionForm')}>
        <LogoIcon style={styles.icon} />
      </div>
      <span style={styles.label}>OnTRACK</span> {/* Label "OnTrack" */}
      <div style={styles.settingsContainer} onClick={() => onNavigate('parametres')}>
        <SettingsIcon style={styles.icon} />
      </div>
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
    backgroundColor: '#A6D4E2'
  },
  logoContainer: {
    cursor: 'pointer'
  },
  settingsContainer: {
    cursor: 'pointer'
  },
  icon: {
    height: '30px',
    width: '30px',
    fill: 'white'
  },
  label: {
    color: '#2895b6',
    fontSize: '20px', // Adjust font size as needed
    fontWeight: 'bold', // Optionally, set font weight to bold
  }
};

export default Navbar;
