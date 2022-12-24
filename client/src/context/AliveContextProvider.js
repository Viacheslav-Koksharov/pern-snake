import { useState, createContext } from "react";

const aliveContext = createContext();

const AliveProvider = ({ children }) => {
  const [alive, setAlive] = useState(false);
  const value = {
    alive,
    setAlive
  };

  return <aliveContext.Provider value={value}>{children}</aliveContext.Provider>;
};

export { aliveContext, AliveProvider };