import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Register({ setView }) {
 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
const [showPassword, setShowPassword] = useState(false);
  const handleRegister = async () => {
    try {
      const res = await fetch("https://taskiva-1.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully ✅");
        setView("login"); // 🔥 go back to login
      } else {
        alert(data.message);
      }
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2>Create Account</h2>

        <button
          className="back-btn"
          onClick={() => setView("home")}
        >
          ← Back to Home
        </button>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

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



        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#1B3C53", cursor: "pointer" }}
            onClick={() => setView("login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
export default Register;