import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import "./TaskBooking.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000     https://taskiva-1.onrender.com/api";

const TaskBooking = ({ setView, service }) => {
  const { user } = useAuth();
const selectedService =
  service || localStorage.getItem("selectedService") || "";

const [formData, setFormData] = useState({
    title: "",
    service: selectedService,
    description: "",
    location: "",
    scheduledDate: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const services = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Gardening",
    "Cooking",
    "Car Wash",
    "Pest Control",
    "Event Planning",
    "AC Repair",
    "Home Repair",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate form
    if (
      !formData.title ||
      !formData.service ||
      !formData.location ||
      !formData.scheduledDate ||
      !formData.budget
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!user?.token) {
      setError("Please login to book a task");
      return;
    }

    try {
      setLoading(true);
      console.log("=== BOOKING TASK ===");
      console.log("User ID:", user?.id || user?._id);
      console.log("User token:", user?.token ? "Present" : "Missing");
      console.log("Booking data:", formData);
      
      const res = await fetch(`${API_BASE}/tasks/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget),
        }),
      });

      const data = await res.json();
      console.log("API Response status:", res.status);
      console.log("API Response data:", data);

      if (!res.ok) {
        console.error("Booking failed:", data.message);
        throw new Error(data.message || "Failed to book task");
      }
      localStorage.removeItem("selectedService");
      console.log("✓ Task booked successfully! Task ID:", data.task?._id);
      setMessage(
        "✓ Task booked successfully! Reloading your dashboard..."
      );
      
      // Force redirect after 1 second
    setTimeout(() => {
    setView("client");
    }, 500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }

  setError("");
  setMessage("Requesting location permission...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Optional: Reverse geocoding using OpenStreetMap
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          location:
            data.display_name ||
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        }));

        setMessage("✓ Current location fetched successfully.");
      } catch {
        // Fallback to coordinates
        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        }));

        setMessage("✓ GPS coordinates fetched successfully.");
      }
    },
    (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError("Location permission denied.");
          break;
        case err.POSITION_UNAVAILABLE:
          setError("Location unavailable.");
          break;
        case err.TIMEOUT:
          setError("Location request timed out.");
          break;
        default:
          setError("Failed to get location.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};

  return (
    <div className="task-booking">
      <header className="task-booking__header">
        <h1>Book a Service</h1>
        <p>Fill in the details below to find a qualified tasker</p>
        <button
          className="task-booking__back"
          onClick={() => setView("home")}
          type="button"
        >
          ← Back
        </button>
      </header>

      <form className="task-booking__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Service Title *</label>
          <input
            id="title"
            name="title"
            placeholder="e.g., AC Repair Service"
            required
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="service">Service Type *</label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            {services.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you need help with..."
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>

        <div
            style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            }}
        >
            <input
            id="location"
            name="location"
            placeholder="Enter your address or use current location"
            required
            type="text"
            value={formData.location}
            onChange={handleChange}
            style={{ flex: 1 }}
            />

            <button
            type="button"
            onClick={getCurrentLocation}
            >
            📍 Use Current
            </button>
        </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="scheduledDate">Preferred Date *</label>
            <input
              id="scheduledDate"
              name="scheduledDate"
              required
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.scheduledDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget (₹) *</label>
            <input
              id="budget"
              name="budget"
              placeholder="e.g., 2000"
              required
              type="number"
              min="100"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}
       

        <button
          className="task-booking__submit"
          disabled={loading}
          type="submit"
        >
          {loading ? "Booking..." : "Book Service"}
        </button>
      </form>
    </div>
  );
};

export default TaskBooking;
