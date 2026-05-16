import { useState } from "react";
import { useAuth } from "../../context/Authcontext";
import "./ClientDashboard.css";

const Client = ({ setView }) => {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "AC Repair Service",
      status: "Booked",
      date: "2026-05-20",
      tasker: "Rahul Sharma",
      phone: "+91 9876543210",
    },
    {
      id: 2,
      title: "Home Cleaning",
      status: "In Progress",
      date: "2026-05-18",
      tasker: "Aman Verma",
      phone: "+91 9123456780",
    },
    {
      id: 3,
      title: "Plumbing Work",
      status: "Last Stage",
      date: "2026-05-16",
      tasker: "Deepak Kumar",
      phone: "+91 9988776655",
    },
    {
      id: 4,
      title: "Electric Repair",
      status: "Completed",
      date: "2026-05-10",
      tasker: "Vikas Singh",
      phone: "+91 9012345678",
    },
  ]);

  const handleDateChange = (id, newDate) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, date: newDate } : task
    );
    setTasks(updatedTasks);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Booked":
        return "status-booked";
      case "In Progress":
        return "status-progress";
      case "Last Stage":
        return "status-last-stage";
      case "Completed":
        return "status-completed";
      default:
        return "status-default";
    }
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

      <div className="client-dashboard__summary">
        <DashboardCard
          title="Total Tasks"
          value={tasks.length}
          colorClass="dashboard-card--total"
        />

        <DashboardCard
          title="In Progress"
          value={tasks.filter((t) => t.status === "In Progress").length}
          colorClass="dashboard-card--progress"
        />

        <DashboardCard
          title="Completed"
          value={tasks.filter((t) => t.status === "Completed").length}
          colorClass="dashboard-card--completed"
        />

        <DashboardCard
          title="Pending"
          value={tasks.filter((t) => t.status !== "Completed").length}
          colorClass="dashboard-card--pending"
        />
      </div>

      <div className="client-dashboard__table-panel">
        <div className="client-dashboard__table-header">
          <div>
            <h2>Task Monitoring</h2>
            <p>{tasks.length} active service records</p>
          </div>
        </div>

        <table className="client-dashboard__table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Task Date</th>
              <th className="client-dashboard__reschedule-column">
                Reschedule
              </th>
              <th className="client-dashboard__tasker-column">Tasker</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>

                <td>
                  <span
                    className={`client-dashboard__status ${getStatusClass(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>

                <td>{task.date}</td>

                <td className="client-dashboard__reschedule-column">
                  <input
                    className="client-dashboard__date-input"
                    type="date"
                    value={task.date}
                    onChange={(e) =>
                      handleDateChange(task.id, e.target.value)
                    }
                  />
                </td>

                <td className="client-dashboard__tasker-column">
                  {task.tasker}
                </td>

                <td>
                  <a
                    className="client-dashboard__contact"
                    href={`tel:${task.phone}`}
                  >
                    {task.phone}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
