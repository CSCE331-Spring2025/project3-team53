import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({children}){
    const [loginID, setLoginID] = useState(-1);
    const [stashedZ, setStashedZ] = useState([0,0]);

    const value = {
        loginID,
        setLoginID,
        stashedZ,
        setStashedZ
    }

    return (
        <GlobalContext.Provider value = {value}>
            {children}
        </GlobalContext.Provider>
    );
}