import { useState } from "react";
import "../form.style.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const{loading,handlelogin}=useAuth();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await handlelogin({email,password});
        if (data?.user) {
            navigate("/home");
        }
    };
    if(loading){
        return <div>Loading...</div>
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-group">
                        <input onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <a href="/register">Register here</a>
                </p>
            </div>
        </main>
    );
}

export default Login;
