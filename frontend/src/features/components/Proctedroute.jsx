import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

// it is for the protecting the routes if user is not logged in then it will navigate to login page
const Protected=({children})=>{
    const {loading,user}=useAuth();
    // if it is loading then show loading
    if(loading){
        return <div>Loading...</div>
    }
    // if user is not logged in then navigate to login page
    if(!user){
       return <Navigate to={"/login"} />;
        // return null;
    }
    // if user is logged in then show the children actual components
    return children;
}

export default Protected;