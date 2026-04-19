import { useAuth } from "../context/Authcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
function Login({ setView }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

const handleLogin = async () => {
  try {
    const res = await fetch("https://taskiva-2.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
 
      login(data);

      const pendingTask = localStorage.getItem("pendingTask");

      if (pendingTask) {
        localStorage.removeItem("pendingTask");
        setView("home");
        return;
      }

      setView(data.role); // admin / client / tasker
    } else {
      alert(data.message);
    }
  } catch {
    alert("Error logging in");
  }
};

  return (
    <>
      <div className="login-wrapper">
      <div className="login-card">

        <h2>Login</h2>

        <button
          className="back-btn"
          onClick={() => setView("home")}
        >
          ← Back to Home
        </button>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#1B3C53", cursor: "pointer" }}
            onClick={() => setView("register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
    </>
    );
}
export default Login;