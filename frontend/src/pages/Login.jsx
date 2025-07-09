import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center fw-bold text-primary">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3 position-relative">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <span
                className="input-group-text"
                role="button"
                onClick={() => setShowPass(!showPass)}
              >
                <i
                  className={
                    showPass ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                  }
                ></i>
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
        </form>

        <div className="mt-3 text-center">
          <small>
            Don't have an account?{" "}
            <a href="/signup" className="text-decoration-none">
              Sign Up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
