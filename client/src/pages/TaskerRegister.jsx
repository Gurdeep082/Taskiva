import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function TaskerRegister({ setView }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhaar: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://taskiva-1.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          role: "tasker",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Tasker Registered ✅");
        setView("login");
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

        <h2>Become a Tasker</h2>

        <button className="back-btn" onClick={() => setView("home")}>
          ← Back
        </button>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Mobile Number" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="aadhaar" placeholder="Aadhaar Number" onChange={handleChange} />
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

        <button className="login-btn" onClick={handleSubmit}>
          Register as Tasker
        </button>

      </div>
    </div>
  );
}