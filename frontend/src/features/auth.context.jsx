
// CONTEXT API 
import { createContext, useState,useEffect } from "react";
import { getme } from "./services/auth.api.js";
// create the context 
export const AuthContext = createContext();

// wrap the children with the context provider and pass the user and setUser as value
export const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

useEffect(() => {
    const getandsetuser = async () => {
        try {
            const data = await getme();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    getandsetuser();
}, []);

return(
    
    // wrap the children with the context provider and pass the user and setUser as value
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    
)

}
