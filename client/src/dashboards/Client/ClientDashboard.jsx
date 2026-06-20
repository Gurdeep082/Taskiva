import { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import "./ClientDashboard.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000     https://taskiva-1.onrender.com/api";

const Client = ({ setView }) => {
  const { logout, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    bookedCount: 0,
    inProgressCount: 0,
    completedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
 useEffect(() => {
  if (!user?.token) return;

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard/client`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load dashboard");
      }

      setTasks(data.tasks || []);
      setStats(
        data.stats || {
          totalTasks: 0,
          bookedCount: 0,
          inProgressCount: 0,
          completedCount: 0,
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();

  const interval = setInterval(fetchTasks, 2000);

  return () => clearInterval(interval);
}, [user]);

  const getStatusClass = (status) => {
    const statusMap = {
      booked: "status-booked",
      accepted: "status-booked",
      in_progress: "status-progress",
      completed: "status-completed",
      cancelled: "status-cancelled",
    };
    return statusMap[status] || "status-default";
  };

  const formatStatus = (status) => {
    const statusDisplay = {
      booked: "Booked",
      accepted: "Accepted",
      in_progress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return statusDisplay[status] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="client-dashboard">
      <div className="client-dashboard__header">
        <div>
          <h1>Client Monitoring Dashboard</h1>
          <p>Track all your booked services in real-time</p>
        </div>

        <div className="client-dashboard__actions">
          <button
            className="client-dashboard__button client-dashboard__button--close"
            onClick={() => setView("home")}
          >
            Close
          </button>

          <button
            className="client-dashboard__button client-dashboard__button--logout"
            onClick={() => {
              logout();
              setView("home");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ color: "red", padding: "10px", margin: "10px 0" }}>
          ⚠️ {error}
        </div>
      )}

      <div className="client-dashboard__summary">
        <DashboardCard
          title="Total Tasks"
          value={stats.totalTasks || 0}
          colorClass="dashboard-card--total"
        />

        <DashboardCard
          title="In Progress"
          value={stats.inProgressCount || 0}
          colorClass="dashboard-card--progress"
        />

        <DashboardCard
          title="Completed"
          value={stats.completedCount || 0}
          colorClass="dashboard-card--completed"
        />

        <DashboardCard
          title="Pending"
          value={stats.bookedCount || 0}
          colorClass="dashboard-card--pending"
        />
      </div>

      <div className="client-dashboard__table-panel">
        <div className="client-dashboard__table-header">
          <div>
            <h2>Task Monitoring</h2>
            <p>{tasks.length} active service records {loading && "(updating...)"}</p>
          </div>
        </div>

        {loading && tasks.length === 0 ? (
          <p style={{ padding: "20px" }}>Loading your tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={{ padding: "20px" }}>No tasks booked yet. Start by booking a service!</p>
        ) : (
          <table className="client-dashboard__table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Task Date</th>
                <th>Budget</th>
                <th className="client-dashboard__tasker-column">Assigned Tasker</th>
                <th>Contact</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>

                  <td>
                    <span
                      className={`client-dashboard__status ${getStatusClass(
                        task.status
                      )}`}
                    >
                      {formatStatus(task.status)}
                    </span>
                  </td>

                  <td>{formatDate(task.scheduledDate)}</td>

                  <td>₹{task.budget}</td>

                  <td className="client-dashboard__tasker-column">
                    {task.assignedTaskerName || "Awaiting Tasker"}
                  </td>

                  <td>
                    {task.assignedTaskerName ? (
                      <a className="client-dashboard__contact" href={`tel:${task.clientPhone}`}>
                        {task.clientPhone || "N/A"}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, colorClass }) => {
  return (
    <div className={`dashboard-card ${colorClass}`}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
};

export default Client;
