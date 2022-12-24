import { useState, createContext } from "react";

const directionContext = createContext();

const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState('RIGHT');
  const value = {
    direction,
    setDirection
  };

  return <directionContext.Provider value={value}>{children}</directionContext.Provider>;
};

export { directionContext, DirectionProvider };