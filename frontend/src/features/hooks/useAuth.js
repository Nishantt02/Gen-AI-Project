import {useContext} from 'react'
import {AuthContext } from '../auth.context.jsx'
import {registerUser, loginUser, logoutUser} from '../services/auth.api.js'

export const useAuth=()=>
    {
        // access the user and setUser from the AuthContext
    const {user, setUser, loading, setLoading}=useContext(AuthContext);

    const handlelogin=async({email,password})=>{
        setLoading(true);
        try {
            const data=await loginUser({email,password});
            setUser(data.user);
            return data;
        } finally {
            setLoading(false);
        }
    }
   

   const handleregister = async ({username, email, password}) => {
    setLoading(true);

    try {
        const data = await registerUser({
            username,
            email,
            password
        });

        setUser(data.user);

        return data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        return null;
    } finally {
        setLoading(false);
    }
};

    
    const handlelogout=async()=>{
        setLoading(true);
        const data= await logoutUser();
        setUser(null);
        setLoading(false);
        return data;
    }

    return {handlelogin,handleregister,handlelogout,user,loading}

}
