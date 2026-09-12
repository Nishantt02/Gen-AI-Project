import {useContext,useEffect} from 'react'
import { AuthContext } from '../auth.context.jsx'
import {registerUser, loginUser, logoutUser, getme} from '../services/auth.api.js'

export const useAuth=()=>
    {
        // access the user and setUser from the AuthContext
    const {user, setUser, loading, setLoading}=useContext(AuthContext);

    const handlelogin=async({email,password})=>{
        setLoading(true);
       const data=  await loginUser({email,password});
       setUser(data.user);
       setLoading(false);
       return data;
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


    useEffect(()=>{
        const getandsetuser=async()=>{
            const data=await getme();
            setUser(data.user);
            setLoading(false);
        }
        getandsetuser();
    },[])

    return {handlelogin,handleregister,handlelogout,user,loading}

}