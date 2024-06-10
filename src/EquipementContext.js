import React, { createContext, useState, useContext } from 'react';

const EquipementContext = createContext();

export const EquipementProvider = ({ children }) => {
  const [equipmentId, setEquipmentId] = useState('1'); // Default value

  return (
    <EquipementContext.Provider value={{ equipmentId, setEquipmentId }}>
      {children}
    </EquipementContext.Provider>
  );
};

export const useEquipement = () => useContext(EquipementContext);
