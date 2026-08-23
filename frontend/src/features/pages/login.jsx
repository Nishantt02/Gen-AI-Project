import "../form.style.scss";

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
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