import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({children}){
    const [loginID, setLoginID] = useState(-1);
    const [stashedZ, setStashedZ] = useState([0,0]);
    const [isManager, setIsManager] = useState(false);

    const value = {
        loginID,
        setLoginID,
        stashedZ,
        setStashedZ,
        isManager,
        setIsManager
    }

    return (
        <GlobalContext.Provider value = {value}>
            {children}
        </GlobalContext.Provider>
    );
}