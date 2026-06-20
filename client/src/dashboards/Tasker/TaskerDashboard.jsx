import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import "./TaskerDashboard.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000     https://taskiva-1.onrender.com/api";

const taskRequests = [
  {
    id: "REQ-7101",
    service: "Kitchen Deep Cleaning",
    client: "Priya Nair",
    location: "Delhi",
    date: "2026-05-20",
    pay: 1800,
  },
  {
    id: "REQ-7102",
    service: "Bathroom Plumbing",
    client: "Rohit Saini",
    location: "Noida",
    date: "2026-05-21",
    pay: 2300,
  },
  {
    id: "REQ-7103",
    service: "AC General Service",
    client: "Ananya Gupta",
    location: "Gurugram",
    date: "2026-05-22",
    pay: 1600,
  },
];

const completedTasks = [
  { day: "Mon", completed: 4, earnings: 4200 },
  { day: "Tue", completed: 3, earnings: 3100 },
  { day: "Wed", completed: 6, earnings: 6800 },
  { day: "Thu", completed: 2, earnings: 2500 },
  { day: "Fri", completed: 5, earnings: 5400 },
];

const Tasker = ({ setView }) => {
  const { user, login, logout } = useAuth();
  const [applicationType, setApplicationType] = useState(
    user?.taskerType || "permanent"
  );
  const [approvalStatus, setApprovalStatus] = useState(
    getApprovalState(user?.taskerApprovalStatus, user?.taskerType)
  );
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    aadhaar: user?.aadhaar || "",
  });
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [walletBalance, setWalletBalance] = useState(18500);
  const [notice, setNotice] = useState("Apply to unlock tasker earnings tools");
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Define computed values before useEffect
  const isApproved =
    approvalStatus === "approved_permanent" ||
    approvalStatus === "approved_freelance";

  const isRejected = approvalStatus === "rejected";
  const isPending = approvalStatus === "pending";

  const taskerType =
    applicationType === "permanent" ? "Permanent Tasker" : "Freelancer";

  // Fetch available tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.token || !isApproved) return;

      try {
        setLoadingTasks(true);
        const res = await fetch(`${API_BASE}/dashboard/tasker`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setAvailableTasks(data.availableTasks || []);
          setAssignedTasks(data.assignedTasks || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
    // Poll for new tasks every 15 seconds
    const interval = setInterval(fetchTasks, 15000);
    return () => clearInterval(interval);
  }, [user?.token, isApproved]);

  const taskerProfile = {
    ...profileForm,
    name: profileForm.name || "Tasker",
    email: profileForm.email || "No email available",
    phone: profileForm.phone || "No phone available",
    address: profileForm.address || "No address available",
    aadhaar: profileForm.aadhaar || "Not added",
    id: user?.id || user?._id || "New tasker",
  };

  useEffect(() => {
    const loadApplicationStatus = async () => {
      if (!user?.token) return;

      try {
        const res = await fetch(`${API_BASE}/tasker-applications/mine`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await parseApiResponse(res);

        if (!res.ok) {
          throw new Error(data.message || "Could not load tasker status");
        }

        const nextUser = {
          ...user,
          ...data.user,
          id: data.user?._id || data.user?.id || user.id,
          token: user.token,
        };
        login(nextUser);

        setProfileForm({
          name: data.user?.name || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          address: data.user?.address || "",
          aadhaar: data.user?.aadhaar || "",
        });

        const nextType =
          data.application?.type || data.user?.taskerType || "permanent";
        const nextStatus = getApprovalState(
          data.application?.status || data.user?.taskerApprovalStatus,
          nextType
        );

        setApplicationType(nextType);
        setApprovalStatus(nextStatus);

        if (nextStatus === "pending") {
          setNotice("Approval request sent to admin");
        } else if (nextStatus === "rejected") {
          setNotice(
            data.application?.rejectionMessage ||
              data.user?.taskerRejectionMessage ||
              "Your tasker application was rejected"
          );
        } else if (nextStatus.startsWith("approved")) {
          setNotice(`Approved as ${formatTaskerType(nextType)}`);
        }
      } catch {
        setNotice("Could not sync approval status from server");
      }
    };

    loadApplicationStatus();
  }, [user?.token]);

  const stats = useMemo(() => {
    return {
      totalCompleted: assignedTasks.filter((t) => t.status === "completed").length,
      weeklyEarnings: assignedTasks.reduce((sum, t) => sum + (t.budget || 0), 0),
      pendingRequests: availableTasks.length,
    };
  }, [availableTasks.length, assignedTasks]);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const applyForTasker = async () => {
    if (!user?.token) {
      setNotice("Please login again before applying");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/tasker-applications/mine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...profileForm,
          type: applicationType,
        }),
      });
      const data = await parseApiResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Could not submit application");
      }

      login({
        ...user,
        ...data.user,
        id: data.user?._id || data.user?.id || user.id,
        token: user.token,
      });
      setApprovalStatus("pending");
      setNotice("Approval request sent to admin");
    } catch (error) {
      setNotice(error.message);
    }
  };

  const acceptRequest = async (task) => {
    if (!user?.token) {
      setNotice("Please login again");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/tasks/${task._id}/accept`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setNotice(`✓ ${task.service} accepted successfully`);
        // Refresh tasks list
        setAvailableTasks((prev) =>
          prev.filter((t) => t._id !== task._id)
        );
        setAssignedTasks((prev) => [...prev, data.task]);
      } else {
        setNotice(`Error: ${data.message}`);
      }
    } catch (error) {
      setNotice(`Error accepting task: ${error.message}`);
    }
  };

  const withdraw = () => {
    setWalletBalance(0);
    setNotice("Withdrawal request submitted");
  };

  return (
    <main className="tasker-dashboard">
      <header className="tasker-dashboard__hero">
        <div>
          <p className="tasker-dashboard__eyebrow">Tasker workspace</p>
          <h1>Welcome, {taskerProfile.name}</h1>
          <p>
            Apply for approval, track salary, accept new tasks, and monitor
            daily completed work from one responsive dashboard.
          </p>
        </div>

        <div className="tasker-dashboard__actions">
          <button onClick={() => setView("home")} type="button">
            Close
          </button>
          <button
            className="tasker-dashboard__logout"
            onClick={() => {
              logout();
              window.location.reload();
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="tasker-dashboard__notice">{notice}</div>

      <section className="tasker-dashboard__grid">
        <Panel title="Your Tasker Profile" subtitle="Loaded from your account">
          <div className="tasker-profile-card">
            <h3>{taskerProfile.name}</h3>
            <dl>
              <div>
                <dt>Tasker ID</dt>
                <dd>{taskerProfile.id}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{taskerProfile.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{taskerProfile.phone}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{taskerProfile.address}</dd>
              </div>
              <div>
                <dt>Aadhaar</dt>
                <dd>{taskerProfile.aadhaar}</dd>
              </div>
            </dl>
          </div>
        </Panel>

        {(approvalStatus === "not_applied" || isRejected) && (
          <Panel
            title={isRejected ? "Update Details and Reapply" : "Apply for Work Type"}
            subtitle={
              isRejected
                ? "Your tasker type is locked. Update details and reapply."
                : "Choose permanent employment or flexible freelance work"
            }
          >
            <div className="tasker-apply">
              {approvalStatus === "not_applied" && (
                <>
                  <label>
                    <input
                      checked={applicationType === "permanent"}
                      name="taskerType"
                      onChange={() => setApplicationType("permanent")}
                      type="radio"
                    />
                    <span>
                      <strong>Permanent Tasker</strong>
                      Fixed salary, daily task targets, priority assignments.
                    </span>
                  </label>

                  <label>
                    <input
                      checked={applicationType === "freelance"}
                      name="taskerType"
                      onChange={() => setApplicationType("freelance")}
                      type="radio"
                    />
                    <span>
                      <strong>Freelance</strong>
                      Flexible schedule, payout per accepted service.
                    </span>
                  </label>
                </>
              )}

              {isRejected && (
                <div className="tasker-locked-type">
                  Reapplying as <strong>{taskerType}</strong>
                </div>
              )}

              <div className="tasker-profile-form">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                />
                <input
                  name="phone"
                  placeholder="Mobile Number"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                />
                <input
                  name="address"
                  placeholder="Address"
                  value={profileForm.address}
                  onChange={handleProfileChange}
                />
                <input
                  name="aadhaar"
                  placeholder="Aadhaar Number"
                  value={profileForm.aadhaar}
                  onChange={handleProfileChange}
                />
              </div>

              <button
                className="tasker-button tasker-button--primary"
                onClick={applyForTasker}
                type="button"
              >
                {isRejected ? "Reapply for Approval" : "Apply for Approval"}
              </button>
            </div>
          </Panel>
        )}

        <Panel title="Approval Status" subtitle="Features unlock after approval">
          <div className="tasker-status-card">
            <span
              className={`tasker-status tasker-status--${getApprovalStatusClass(
                approvalStatus
              )}`}
            >
              {isApproved
                ? "Approved"
                : isPending
                ? "Pending"
                : isRejected
                ? "Rejected"
                : "Not Approved"}
            </span>
            <h3>
              {isApproved || isPending
                ? taskerType
                : isRejected
                ? "Application rejected"
                : "Application required"}
            </h3>
            <p>
              {isApproved
                ? "Salary dashboard, withdrawal, new requests, and daily status are active."
                : isPending
                ? "Your selected tasker type is saved. Waiting for admin approval."
                : isRejected
                ? "You can update your details and reapply with the same tasker type."
                : "Apply for permanent or freelance approval to unlock earning features."}
            </p>
          </div>
        </Panel>
      </section>

      {isApproved && (
        <>
          <section className="tasker-dashboard__stats">
            <StatCard
              label="Wallet Balance"
              value={`Rs. ${walletBalance.toLocaleString()}`}
            />
            <StatCard
              label="Weekly Earnings"
              value={`Rs. ${stats.weeklyEarnings.toLocaleString()}`}
            />
            <StatCard label="Completed This Week" value={stats.totalCompleted} />
            <StatCard label="New Requests" value={stats.pendingRequests} />
          </section>

          <section className="tasker-dashboard__grid tasker-dashboard__grid--wide">
            <Panel
              title="Salary Dashboard"
              subtitle="Visible only after permanent/freelance approval"
            >
              <div className="tasker-salary">
                <div>
                  <span>Available balance</span>
                  <strong>Rs. {walletBalance.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Next payout</span>
                  <strong>May 31</strong>
                </div>
                <div>
                  <span>Tasker type</span>
                  <strong>{taskerType}</strong>
                </div>
              </div>

              <button
                className="tasker-button tasker-button--success"
                disabled={walletBalance === 0}
                onClick={withdraw}
                type="button"
              >
                Withdraw
              </button>
            </Panel>

            <Panel
              title="New Task Requests"
              subtitle="Accept work that matches your profile"
            >
              <div className="tasker-requests">
                {loadingTasks ? (
                  <p className="tasker-empty">Loading available tasks...</p>
                ) : availableTasks.length === 0 ? (
                  <p className="tasker-empty">No new task requests.</p>
                ) : (
                  availableTasks.map((request) => (
                    <article className="tasker-request" key={request._id}>
                      <div>
                        <span>{request.customId || request._id.substring(0, 8)}</span>
                        <h3>{request.service}</h3>
                        <p>
                          {request.clientName} - {request.location} - {new Date(request.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="tasker-request__side">
                        <strong>₹{request.budget?.toLocaleString()}</strong>
                        <button
                          className="tasker-button tasker-button--primary"
                          onClick={() => acceptRequest(request)}
                          type="button"
                        >
                          Accept
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </Panel>
          </section>

          <Panel
            title="Daily Completed Task Status"
            subtitle="Track completed tasks and earnings by day"
          >
            <div className="tasker-daily-list">
              {completedTasks.map((item) => (
                <article className="tasker-day" key={item.day}>
                  <span>{item.day}</span>
                  <div>
                    <strong>{item.completed}</strong>
                    <small>tasks completed</small>
                  </div>
                  <em>Rs. {item.earnings.toLocaleString()}</em>
                </article>
              ))}
            </div>
          </Panel>
        </>
      )}
    </main>
  );
};

const Panel = ({ title, subtitle, children }) => (
  <section className="tasker-panel">
    <div className="tasker-panel__header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
    {children}
  </section>
);

const StatCard = ({ label, value }) => (
  <article className="tasker-stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
  </article>
);

const formatTaskerType = (type) =>
  type === "permanent" ? "Permanent Tasker" : "Freelancer";

const getApprovalState = (status, type) => {
  if (status === "approved") {
    return type === "permanent" ? "approved_permanent" : "approved_freelance";
  }

  if (status === "pending" || status === "rejected") {
    return status;
  }

  return "not_applied";
};

const getApprovalStatusClass = (status) => {
  if (status === "approved_permanent" || status === "approved_freelance") {
    return "approved";
  }

  if (status === "rejected") {
    return "rejected";
  }

  return "pending";
};

const parseApiResponse = async (res) => {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();
  const isHtml = text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<");

  if (isHtml) {
    throw new Error(
      "Tasker approval API is returning HTML. Deploy the latest backend or set REACT_APP_API_URL to your local server."
    );
  }

  throw new Error(text || "Unexpected server response");
};

export default Tasker;
