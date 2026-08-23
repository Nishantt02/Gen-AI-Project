import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './features/pages/login.jsx';
import Register from './features/pages/register.jsx';

 export const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },{
        path:"/register",
        element:<Register/>
    }
])