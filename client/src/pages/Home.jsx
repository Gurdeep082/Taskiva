import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import logo from "../assets/logo.png";
import "./Home.css";

const Home = ({ setView }) => {
  const { user } = useAuth();

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
  ];

  const serviceCards = [
    ["Cleaning", "Daily or weekly cleaning services for your home."],
    ["Car Repairs", "Handyman services for repairs and maintenance."],
    ["Gardening", "Lawn care and gardening services."],
    ["Carpentry", "Custom carpentry and woodworking services."],
    ["Cooking", "Private chef or meal preparation services."],
    ["Painting", "Interior and exterior painting services."],
    ["Plumbing", "Plumbing repairs and installations."],
    ["Electrical", "Electrical repairs and installations."],
    ["Car Wash", "Mobile car wash and detailing services."],
    ["Event Planning", "Full-service event planning and coordination."],
    ["Pest Control", "Pest removal and prevention services."],
    ["Browse more Services", "Coming Soon"],
  ];

  const quickServices = [
    "Cleaning",
    "Plumbing Help",
    "Gardening Services",
    "Woodworking services",
    "Electrical repairs",
    "AutoMobile car wash",
    "Pest removal",
    "Event planning",
    "Cooking",
    "Car repairs",
    "House Painting",
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = services.filter((service) =>
      service.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
    setShowDropdown(true);
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;

    if (!user) {
      localStorage.setItem("pendingTask", query);
      setView("login");
      return;
    }

    setSelectedTask(query);
    setShowForm(true);
    setShowDropdown(false);
  };

  if (showForm) {
    return (
      <div className="home-page home-page--form">
        <div className="home-booking-form">
          <h2>Book Service</h2>

          <input value={selectedTask} readOnly />
          <input placeholder="Your Name" />
          <input placeholder="Address" />
          <input type="date" />

          <div className="home-booking-form__actions">
            <button onClick={() => alert("Task Booked!")}>
              Confirm Booking
            </button>

            <button type="button" onClick={() => setShowForm(false)}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="home-page">
      <nav className="home-nav">
        <img className="home-nav__logo" src={logo} alt="Taskiva" />

        <div className="home-nav__actions">
          {!user && (
            <>
              <button onClick={() => setView("login")}>Login / Register</button>
              <button onClick={() => setView("tasker-register")}>
                Become a Tasker
              </button>
            </>
          )}

          {user && user.role === "client" && (
            <button onClick={() => setView("client")}>Client Dashboard</button>
          )}

          {user && user.role === "tasker" && (
            <button onClick={() => setView("tasker")}>Tasker Dashboard</button>
          )}

          {user && user.role === "admin" && (
            <button onClick={() => setView("admin")}>Admin Dashboard</button>
          )}
        </div>
      </nav>

      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Trusted local services</p>
          <h1>Book reliable help for everyday home tasks.</h1>
          <p>
            Find cleaners, plumbers, electricians, cooks, and more with a fast
            booking flow built for busy homes.
          </p>

          <div className="home-search">
            <div className="home-search__inner">
              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search tasks..."
              />

              <button onClick={handleSearchSubmit}>Search</button>

              {showDropdown && results.length > 0 && (
                <div className="home-search__dropdown">
                  {results.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        setShowDropdown(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="home-hero__panel">
          <span>Fast booking</span>
          <strong>10+</strong>
          <p>service categories ready to explore</p>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__header">
          <h2>Popular Services</h2>
          <p>Choose what you need and schedule it in a few clicks.</p>
        </div>

        <div className="home-services">
          {serviceCards.map(([title, description]) => (
            <article className="home-service-card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-how">
        <div className="home-section__header">
          <h2>How it works</h2>
          <p>Simple steps from search to completed service.</p>
        </div>

        <ol className="home-steps">
          <li>
            <span>01</span>
            <h3>Choose a Tasker</h3>
            <p>
              Browse skilled Taskers and choose the one that fits your needs.
            </p>
          </li>

          <li>
            <span>02</span>
            <h3>Schedule a Tasker</h3>
            <p>Pick a date and time that works for your home.</p>
          </li>

          <li>
            <span>03</span>
            <h3>Chat, Pay, and Review</h3>
            <p>Manage the service from one simple place.</p>
          </li>
        </ol>
      </section>

      <section className="home-help">
        <h2>Get Help Today</h2>
        <div className="home-service-tags">
          {quickServices.map((service) => (
            <button key={service}>{service}</button>
          ))}
        </div>
      </section>

      <section className="home-trust">
        <h3>Trusted Services. Guaranteed Satisfaction.</h3>
      </section>

      <footer className="home-footer">© 2024 Taskiva. All rights reserved.</footer>
    </main>
  );
};

export default Home;
