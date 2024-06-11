import React, { createContext, useState, useContext, useEffect } from 'react';

const EquipementContext = createContext();

export const EquipementProvider = ({ children }) => {
  const [equipmentId, setEquipmentId] = useState(null); // Default value

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('equipment_id');
    if (id) {
      setEquipmentId(id);
    }
  }, []);

  return (
    <EquipementContext.Provider value={{ equipmentId, setEquipmentId }}>
      {children}
    </EquipementContext.Provider>
  );
};

export const useEquipement = () => useContext(EquipementContext);
