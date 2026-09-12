import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const Protected=({children})=>{
    const {loading,user}=useAuth();
    const navigate=useNavigate();
    // if it is loading then show loading
    if(loading){
        return <div>Loading...</div>
    }
    // if user is not logged in then navigate to login page
    if(!user){
        navigate("/login");
        return null;
    }
    // if user is logged in then show the children actual components
    return children;
}

export default Protected;