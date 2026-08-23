import "../form.style.scss";

function Register() {

    const handlesubmit=(e)=>{
        e.preventDefault(); 
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handlesubmit}>

                     <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <label htmlFor="email">Username</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button type="submit">Register</button>
                </form>

                <p>
                    Already have an account?{" "}
                    <a href="/login">Login here</a>
                </p>
            </div>
        </main>
    );
}

export default Register;