import React, { useState } from 'react';
import Navbar from './components/Navbar';
import InterventionForm from './InterventionForm';
import Parametres from './pages/Parametres';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('interventionForm');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const getPageComponent = () => {
    switch (currentPage) {
      case 'parametres':
        return <Parametres />;
      case 'interventionForm':
      default:
        return <InterventionForm />;
    }
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigation} />
      {getPageComponent()}
    </div>
  );
};

export default App;
