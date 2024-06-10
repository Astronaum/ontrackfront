import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import InterventionForm from './InterventionForm';
import Parametres from './pages/Parametres';
import Historique from './pages/historique';
import { EquipementProvider } from './EquipementContext'; // Import EquipementProvider
import './App.css';

const App = () => {
  return (
    <EquipementProvider> {/* Wrap your entire application with EquipementProvider */}
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/" element={<InterventionForm />} />
          </Routes>
        </Router>
      </div>
    </EquipementProvider>
  );
};

export default App;
