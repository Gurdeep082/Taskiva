import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import "./AdminDashboard.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000     https://taskiva-1.onrender.com/api";

const initialTaskers = [
  {
    id: "TSK-1024",
    name: "Rahul Sharma",
    skill: "AC Repair",
    city: "Delhi",
    status: "active",
    rating: 4.8,
    completedTasks: 86,
    salaryDue: 12400,
    transactions: 28,
    totalTransactionAmount: 68400,
  },
  {
    id: "TSK-1088",
    name: "Aman Verma",
    skill: "Home Cleaning",
    city: "Noida",
    status: "active",
    rating: 4.6,
    completedTasks: 52,
    salaryDue: 8600,
    transactions: 19,
    totalTransactionAmount: 42100,
  },
  {
    id: "TSK-1132",
    name: "Deepak Kumar",
    skill: "Plumbing",
    city: "Gurugram",
    status: "banned",
    rating: 3.9,
    completedTasks: 24,
    salaryDue: 0,
    transactions: 8,
    totalTransactionAmount: 13600,
  },
];

const initialApplications = [
  {
    id: "APP-2041",
    name: "Neha Singh",
    skill: "Cooking",
    city: "Delhi",
    experience: "3 years",
    documents: "Verified",
  },
  {
    id: "APP-2042",
    name: "Vikas Singh",
    skill: "Electrical",
    city: "Faridabad",
    experience: "5 years",
    documents: "Pending review",
  },
  {
    id: "APP-2043",
    name: "Karan Mehta",
    skill: "Car Wash",
    city: "Noida",
    experience: "2 years",
    documents: "Verified",
  },
];

const transactions = [
  {
    id: "TRX-9001",
    user: "Priya Nair",
    role: "Client",
    taskerId: "TSK-1024",
    amount: 2400,
    service: "AC Repair",
    status: "Paid",
  },
  {
    id: "TRX-9002",
    user: "Rohit Saini",
    role: "Client",
    taskerId: "TSK-1088",
    amount: 1800,
    service: "Home Cleaning",
    status: "Paid",
  },
  {
    id: "TRX-9003",
    user: "Rahul Sharma",
    role: "Tasker",
    taskerId: "TSK-1024",
    amount: 6200,
    service: "Salary payout",
    status: "Processing",
  },
  {
    id: "TRX-9004",
    user: "Aman Verma",
    role: "Tasker",
    taskerId: "TSK-1088",
    amount: 4300,
    service: "Salary payout",
    status: "Paid",
  },
];

const Admin = ({ setView }) => {
  const { user, logout } = useAuth();

 const [taskers, setTaskers] = useState([]);
const [applications, setApplications] = useState([]);
  const [selectedTaskerId, setSelectedTaskerId] = useState("");
  const [notice, setNotice] = useState("Ready to review applications");
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    bookedCount: 0,
    inProgressCount: 0,
    completedCount: 0,
  });
  

useEffect(() => {
  const loadTaskers = async () => {
    if (!user?.token) return;

    try {
      const res = await fetch(
        `${API_BASE}/tasker-applications/admin?status=approved`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setTaskers(
          data.map((t) => ({
            id: t._id, customId: t.customId,
            name: t.name,
            skill: t.type || "Tasker",
            city: t.address || "",
            status: "active",
            rating: 0,
            completedTasks: 0,
            salaryDue: 0,
            transactions: 0,
            totalTransactionAmount: 0,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadTaskers();
}, [user?.token]);
useEffect(() => {
  if (taskers.length > 0 && !selectedTaskerId) {
    setSelectedTaskerId(taskers[0].id);
  }
}, [taskers, selectedTaskerId]);
  useEffect(() => {
    const loadApplications = async () => {
      if (!user?.token) return;

      try {
        const res = await fetch(`${API_BASE}/tasker-applications/admin`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Could not load applications");
        }

        setApplications(data);
      } catch {
        setNotice("Could not load global applications from server");
      }
    };

    loadApplications();
  }, [user?.token]);

  const selectedTasker = taskers.find((tasker) => tasker.id === selectedTaskerId);

  const stats = useMemo(() => {
    const activeTaskers = taskers.filter((tasker) => tasker.status === "active");
    const salaryDue = taskers.reduce((total, tasker) => total + tasker.salaryDue, 0);
    const transactionTotal = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    return {
      totalTaskers: taskers.length,
      activeTaskers: activeTaskers.length,
      pendingApplications: applications.length,
      salaryDue,
      transactionTotal,
      pendingTasks: taskStats.bookedCount,
      inProgressTasks: taskStats.inProgressCount,
      completedTasks: taskStats.completedCount,
      totalTasks: taskStats.totalTasks,
    };
  }, [applications.length, taskers, taskStats]);

const approveApplication = async (application) => {
  try {
    await updateApplicationStatus(
      application,
      "approved",
      user?.token
    );

    // Reload from server
    const res = await fetch(
      `${API_BASE}/tasker-applications/admin`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();
    setApplications(data);

    setNotice(`${application.name} approved successfully`);
  } catch (err) {
    setNotice(err.message);
  }
};

  const rejectApplication = async (application) => {
    try {
      await updateApplicationStatus(application, "rejected", user?.token);
    } catch (error) {
      setNotice(error.message);
      return;
    }

    setApplications((current) =>
      current.filter(
        (item) => getApplicationId(item) !== getApplicationId(application)
      )
    );
    setNotice(`${application.name}'s application was rejected`);
  };

const toggleBanTasker = async (taskerId) => {
  try {
    const res = await fetch(
      `${API_BASE}/tasker-applications/admin/${taskerId}/ban`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    setTaskers((current) =>
      current.map((tasker) =>
        tasker.id === taskerId
          ? { ...tasker, status: "banned" }
          : tasker
      )
    );

    setNotice("Tasker banned successfully");
  } catch (err) {
    setNotice(err.message);
  }
};

const deleteTasker = async (taskerId) => {
  try {
    const res = await fetch(
     `${API_BASE}/tasker-applications/admin/${taskerId}/delete`,
      {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      }
    );

    const text = await res.text();
    console.log(text);

    let data = {};
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text);
    }

    if (!res.ok) {
      throw new Error(data.message);
    }

    setTaskers((current) =>
      current.filter((tasker) => tasker.id !== taskerId)
    );

    setSelectedTaskerId("");

    setNotice("Tasker deleted successfully");
  } catch (err) {
    setNotice(err.message);
  }
};

  const sendSalary = (taskerId) => {
    const tasker = taskers.find((item) => item.id === taskerId);

    setTaskers((current) =>
      current.map((item) =>
        item.id === taskerId ? { ...item, salaryDue: 0 } : item
      )
    );
    setNotice(`Salary sent to ${tasker?.name || taskerId}`);
  };

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard__hero">
        <div>
          <p className="admin-dashboard__eyebrow">Admin control center</p>
          <h1>Manage Taskiva operations</h1>
          <p>
            Review tasker applications, control access, monitor transactions,
            and release salary payouts from one fast dashboard.
          </p>
        </div>

        <div className="admin-dashboard__hero-actions">
          <button
            className="admin-dashboard__close"
            onClick={() => setView("home")}
            type="button"
          >
            Close
          </button>

          <button
            className="admin-dashboard__logout"
            onClick={() => {
              logout();
              setView("home");
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="admin-dashboard__stats">
        <StatCard label="Total Taskers" value={stats.totalTaskers} />
        <StatCard label="Active Taskers" value={stats.activeTaskers} />
        <StatCard label="New Applications" value={stats.pendingApplications} />
        <StatCard label="Pending Tasks" value={stats.pendingTasks} style={{color: "#ff6b6b"}} />
        <StatCard label="In Progress Tasks" value={stats.inProgressTasks} />
        <StatCard label="Completed Tasks" value={stats.completedTasks} style={{color: "#51cf66"}} />
        <StatCard label="Salary Due" value={`Rs. ${stats.salaryDue.toLocaleString()}`} />
        <StatCard
          label="Total Transactions"
          value={`Rs. ${stats.transactionTotal.toLocaleString()}`}
        />
      </section>

      <div className="admin-dashboard__notice">{notice}</div>

      <section className="admin-dashboard__grid">
        <Panel
          title="Tasker Applications"
          subtitle="Review, approve, or reject new applicants"
        >
          <div className="admin-dashboard__application-list">
            {applications.length === 0 ? (
              <p className="admin-dashboard__empty">No pending applications.</p>
            ) : (
              applications
              .filter((application) => application.status === "pending")
              .map((application) => (
                <article
                  className="admin-application"
                  key={getApplicationId(application)}
                >
                  <div>
                    <span>{getApplicationId(application)}</span>
                    <h3>{application.name}</h3>
                    <p>
                      {application.skill || formatTaskerType(application.type)} -{" "}
                      {application.city || application.address} -{" "}
                      {application.experience || "New applicant"}
                    </p>
                    <small>
                      {application.documents || "Pending admin review"}
                    </small>
                  </div>

                  <div className="admin-application__actions">
                    <button
                      className="admin-button admin-button--success"
                      onClick={() => approveApplication(application)}
                      type="button"
                    >
                      Approve
                    </button>
                    <button
                      className="admin-button admin-button--danger"
                      onClick={() => rejectApplication(application)}
                      type="button"
                    >
                      Reject
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </Panel>

        <Panel
          title="Tasker Access"
          subtitle="Ban, restore, delete IDs, or send salary"
        >
          <div className="admin-dashboard__tasker-list">
            {taskers.map((tasker) => (
              <button
                className={`admin-tasker-card ${
                  selectedTaskerId === tasker.id ? "is-selected" : ""
                }`}
                key={tasker.id}
                onClick={() => setSelectedTaskerId(tasker.id)}
                type="button"
              >
                <div>
                  <strong>{tasker.name}</strong>
                  <span>{tasker.customId}</span>
                </div>
                <em className={`admin-status admin-status--${tasker.status}`}>
                  {tasker.status}
                </em>
              </button>
            ))}
          </div>

          {selectedTasker && (
            <div className="admin-tasker-detail">
              <div>
                <h3>{selectedTasker.name}</h3>
                <p>
                  {selectedTasker.skill} - {selectedTasker.city}
                </p>
              </div>

              <dl>
                <div>
                  <dt>Rating</dt>
                  <dd>{selectedTasker.rating || "New"}</dd>
                </div>
                <div>
                  <dt>Completed</dt>
                  <dd>{selectedTasker.completedTasks}</dd>
                </div>
                <div>
                  <dt>Salary Due</dt>
                  <dd>Rs. {selectedTasker.salaryDue.toLocaleString()}</dd>
                </div>
              </dl>

              <div className="admin-tasker-detail__actions">
                <button
                  className="admin-button admin-button--primary"
                  disabled={selectedTasker.salaryDue === 0}
                  onClick={() => sendSalary(selectedTasker.id)}
                  type="button"
                >
                  Send Salary
                </button>
                <button
                  className="admin-button admin-button--warning"
                  onClick={() => toggleBanTasker(selectedTasker.id)}
                  type="button"
                >
                  {selectedTasker.status === "banned" ? "Restore" : "Ban"}
                </button>
                <button
                  className="admin-button admin-button--danger"
                  onClick={() => deleteTasker(selectedTasker.id)}
                  type="button"
                >
                  Delete ID
                </button>
              </div>
            </div>
          )}
        </Panel>
      </section>

      <Panel
        title="Transactions by User"
        subtitle="Track individual user and tasker payment history"
      >
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>User</th>
                <th>Role</th>
                <th>Tasker ID</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.user}</td>
                  <td>{transaction.role}</td>
                  <td>{transaction.taskerId}</td>
                  <td>{transaction.service}</td>
                  <td>Rs. {transaction.amount.toLocaleString()}</td>
                  <td>
                    <span className="admin-table__badge">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </main>
  );
};

const StatCard = ({ label, value }) => (
  <article className="admin-stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
  </article>
);

const Panel = ({ title, subtitle, children }) => (
  <section className="admin-panel">
    <div className="admin-panel__header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
    {children}
  </section>
);

const getApplicationId = (application) => application._id || application.id;

const formatTaskerType = (type) =>
  type === "permanent" ? "Permanent Tasker" : "Freelancer";

const updateApplicationStatus = async (application, status, token) => {
  if (!application._id) return application;

  const res = await fetch(
    `${API_BASE}/tasker-applications/admin/${application._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        rejectionMessage:
          status === "rejected"
            ? "Your application was rejected. Update your details and reapply."
            : "",
      }),
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not update application");
  }

  return data.application;
};

export default Admin;
