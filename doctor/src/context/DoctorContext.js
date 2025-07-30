import { createContext, useContext } from "react";

// Create the Doctor context
export const DoctorContext = createContext(null);

// Custom hook to use doctor data anywhere
export const useDoctor = () => useContext(DoctorContext);
