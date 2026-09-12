
// CONTEXT API 
import { createContext, useState } from "react";

// create the context 
export const AuthContext = createContext();

// wrap the children with the context provider and pass the user and setUser as value
export const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(false);


return(
    
    // wrap the children with the context provider and pass the user and setUser as value
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    
)

}
