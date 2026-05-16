import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";

const API_URL = "https://taskiva-1.onrender.com/api/auth";

export default function TaskerRegister({ setView }) {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhaar: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
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
        const loginData = data.token
          ? data
          : await loginRegisteredTasker(form.email, form.password);

        login({
          ...loginData,
          id: data._id || data.id || loginData.id,
          name: data.name || form.name,
          email: data.email || form.email,
          phone: data.phone || form.phone,
          address: data.address || form.address,
          aadhaar: data.aadhaar || form.aadhaar,
          role: "tasker",
        });

        alert("Tasker Registered Successfully");
        setView("tasker");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card tasker-register-card">
        <h2>Become a Tasker</h2>

        <button className="back-btn" onClick={() => setView("home")}>
          Back
        </button>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={form.aadhaar}
          onChange={handleChange}
        />
        <div className="password-field">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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

const loginRegisteredTasker = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not login after registration");
  }

  return data;
};
