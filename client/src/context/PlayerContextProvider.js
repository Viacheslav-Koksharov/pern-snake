import { useState, createContext } from "react";

const playerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(null);
  const value = {
    name,
    setName,
    count,
    setCount
  };

  return <playerContext.Provider value={value}>{children}</playerContext.Provider>;
};

export { playerContext, PlayerProvider };