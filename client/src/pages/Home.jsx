import { useAuth } from "../context/Authcontext";
import logo from "../assets/logo.png";
import { useState } from "react";

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

  return (
    <>
      {showForm ? (
        /* ===== BOOKING FORM ===== */
        <div className="booking-form">
          <h2>Book Service</h2>

          <input value={selectedTask} readOnly />
          <input placeholder="Your Name" />
          <input placeholder="Address" />
          <input type="date" />

          <button onClick={() => alert("Task Booked!")}>
            Confirm Booking
          </button>

          <button onClick={() => setShowForm(false)}>Back</button>
        </div>
      ) : (
        <>
          {/* NAVBAR */}
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
            className="navbar"
          >
            <img src={logo} alt="logo" style={{ height: "40px" }} />

            {!user && (
              <div style={{ display:"flex",gap:"10px"}}><button onClick={() => setView("login")}>
                  Login / Register
                </button><button onClick={() => setView("tasker-register")}>
                  Become a Tasker
                </button></div>
            )}

            {user && user.role === "client" && (
              <button onClick={() => setView("client")}>
                Client Dashboard
              </button>
            )}

            {user && user.role === "tasker" && (
              <button onClick={() => setView("tasker")}>
                Tasker Dashboard
              </button>
            )}

            {user && user.role === "admin" && (
              <button onClick={() => setView("admin")}>
                Admin Dashboard
              </button>
            )}
          </nav>

          {/* HERO */}
          <div className="back">
            <section className="hero">
              <h1>Book trusted help for home tasks</h1>
            </section>
          </div>

          {/* SEARCH */}
          <div className="search">
            <div className="search-inner" style={{ position: "relative" }}>
              <input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search tasks..."
              />

              <button
                onClick={() => {
                  if (!query.trim()) return;

                  if (!user) {
                    localStorage.setItem("pendingTask", query);
                    setView("login");
                    return;
                  }

                  setSelectedTask(query);
                  setShowForm(true);
                  setShowDropdown(false);
                }}
              >
                Search
              </button>

              {showDropdown && results.length > 0 && (
                <div className="search-dropdown">
                  {results.map((item, i) => (
                    <div
                      key={i}
                      className="dropdown-item"
                      onClick={() => {
                        setQuery(item);
                        setShowDropdown(false);
                      }}
                    >
                      🔍 {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="empty"></div>

          {/* SERVICES */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
            className="houseservices"
          >
            <div className="serviceitem">
              <h2>Cleaning</h2>
              <p>Daily or weekly cleaning services for your home.</p>
            </div>

            <div className="serviceitem">
              <h2>Car Repairs</h2>
              <p>Handyman services for repairs and maintenance.</p>
            </div>

            <div className="serviceitem">
              <h2>Gardening</h2>
              <p>Lawn care and gardening services.</p>
            </div>

            <div className="serviceitem">
              <h2>Carpentry</h2>
              <p>Custom carpentry and woodworking services.</p>
            </div>

            <div className="serviceitem">
              <h2>Cooking</h2>
              <p>Private chef or meal preparation services.</p>
            </div>

            <div className="serviceitem">
              <h2>Painting</h2>
              <p>Interior and exterior painting services.</p>
            </div>

            <div className="serviceitem">
              <h2>Plumbing</h2>
              <p>Plumbing repairs and installations.</p>
            </div>

            <div className="serviceitem">
              <h2>Electrical</h2>
              <p>Electrical repairs and installations.</p>
            </div>

            <div className="serviceitem">
              <h2>Car Wash</h2>
              <p>Mobile car wash and detailing services.</p>
            </div>

            <div className="serviceitem">
              <h2>Event Planning</h2>
              <p>Full-service event planning and coordination.</p>
            </div>

            <div className="serviceitem">
              <h2>Pest Control</h2>
              <p>Pest removal and prevention services.</p>
            </div>

            <div className="serviceitem">
              <h2>Browse more Services</h2>
              <p>hjkl</p>
            </div>
          </div>

          {/* WORKING */}
          <div className="working">
            <div className="bg">
              <div className="picture">
                <img src="" alt="" />
              </div>

              <div id="howitworks">
                <h2>How it works</h2>
                <ol>
                  <li>
                    <h3>Choose a Tasker</h3>
                    <p>
                      Browse our marketplace of skilled Taskers and choose the one
                      that fits your needs and budget.
                    </p>
                  </li>

                  <li>
                    <h3>Schedule a Tasker</h3>
                    <p>Schedule your Tasker for a time that works for you.</p>
                  </li>

                  <li>
                    <h3>Chat, Pay, and Review</h3>
                    <p>Chat with your Tasker, pay, and review in one place.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* HELP */}
          <div id="help">
            <h2>Get Help Today</h2>
          </div>

          {/* BUTTONS */}
          <div className="serve">
            <button>Cleaning</button>
            <button>Plumbing Help</button>
            <button>Gardening Services</button>
            <button>Woodworking services</button>
            <button>Electrical repairs</button>
            <button>AutoMobile car wash</button>
            <button>Pest removal</button>
            <button>Event planning</button>
            <button>Cooking</button>
            <button>Car repairs</button>
            <button>House Painting</button>
          </div>

          {/* TRUST */}
          <div className="container">
            <h3>Trusted Services. Guaranteed Satisfaction.</h3>
          </div>

          {/* FOOTER */}
          <footer
            style={{
              textAlign: "center",
              padding: "1rem",
              marginTop: "2rem",
            }}
          >
            © 2024 Taskiva. All rights reserved.
          </footer>
        </>
      )}
    </>
  );
};
export default Home;