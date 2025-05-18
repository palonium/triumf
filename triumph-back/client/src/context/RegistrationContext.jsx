import { createContext, useState } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  return (
    <RegistrationContext.Provider value={{ userData, setUserData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
