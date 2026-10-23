import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './features/pages/login.jsx';
import Register from './features/pages/register.jsx';
import Home from './features/pages/Home.jsx'
import Protected from './features/components/Proctedroute.jsx';
import Interview from "./features/pages/Interview.jsx";

 export const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },{
        path:"/register",
        element:<Register/>
    }
    ,{
        path:'/',
        element: <Protected>
            <h1>Welcome to the Home Page</h1>
        </Protected>
    },{
        path:"/home",
        element:<Home/>
        
    },{
        path:"/interview",
        element:<Interview/>
    }
])
