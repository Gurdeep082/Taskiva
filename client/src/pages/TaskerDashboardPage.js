import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const iconMap = {
  Plumbing: '🛠️',
  Electrical: '💡',
  Carpentry: '🪚',
  Cleaning: '🧼',
  'AC Repair': '❄️',
  'Appliance Repair': '🔧',
};

export default function TaskerDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ pendingRequests: 0, acceptedTasks: 0, inProgressTasks: 0, completedTasks: 0 });
  const [availableTasks, setAvailableTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);

const loadDashboard = useCallback(async () => {
  const token = localStorage.getItem("taskiva_token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const result = await api.get("/dashboard/tasker", token);

    setStats((prev) => result.stats || prev);
    setAvailableTasks(result.availableTasks || []);
    setAssignedTasks(result.assignedTasks || []);
  } catch (err) {
    console.error(err);
  }
}, [navigate]);

useEffect(() => {
  loadDashboard();
}, [loadDashboard]);

  const handleNav = (target) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (target === 'dashboard') {
      navigate('/tasker-dashboard');
    }
  };

  const handleAccept = async (taskId) => {
    const token = localStorage.getItem('taskiva_token');
    try {
      await api.patch(`/tasks/${taskId}/accept`, {}, token);
      await loadDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('taskiva_token');
    localStorage.removeItem('taskiva_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#edf6f5_100%)] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-gradient-to-b from-[#172033] to-[#1d4ed8] p-5 text-white">
        <div className="flex items-center gap-3 pb-6">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-lg font-extrabold text-white">T</div>
          <div>
            <div className="text-base font-extrabold">Taskiva</div>
            <div className="text-xs text-white/70">Tasker Dashboard</div>
          </div>
        </div>

        <nav className="mt-6 space-y-2" aria-label="Sidebar navigation">
          <button type="button" className="w-full rounded-xl bg-white/10 px-3 py-3 text-left text-sm font-semibold text-white" onClick={() => handleNav('dashboard')}>Dashboard</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('my-jobs')}>My Jobs</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('available-requests')}>Earnings</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('support')}>Support</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('settings')}>Settings</button>
        </nav>

        <button type="button" className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold text-white transition hover:bg-white/10" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="p-5 md:p-7 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.05em] text-[#172033]">Dashboard</h1>
            <p className="mt-1 text-sm text-[#596275]">Hi, Tasker</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-xl border border-[#123d3d]/10 bg-white px-3 py-2 text-sm font-semibold text-[#123d3d] shadow-sm">This Month</button>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] text-sm font-extrabold text-[#172033]">TS</div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{ label: 'Pending Requests', value: stats.pendingRequests, note: 'Open jobs' }, { label: 'Accepted', value: stats.acceptedTasks, note: 'Confirmed' }, { label: 'In Progress', value: stats.inProgressTasks, note: 'Ongoing' }, { label: 'Earnings', value: '₹18,650', note: 'This month' }].map((card) => (
            <div key={card.label} className="rounded-[22px] border border-[#123d3d]/10 bg-white/85 p-5 shadow-[0_16px_34px_rgba(18,61,61,0.06)]">
              <span className="text-sm text-[#5f6f6c]">{card.label}</span>
              <strong className="mt-2 block text-3xl font-black text-[#123d3d]">{card.value}</strong>
              <small className="mt-2 block text-xs text-[#5f6f6c]">{card.note}</small>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
          <div id="available-requests" className="rounded-[26px] border border-[#123d3d]/10 bg-white/85 p-5 shadow-[0_16px_34px_rgba(18,61,61,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#123d3d]">Available Requests</h3>
              <span className="text-sm font-semibold text-[#5f6f6c]">{availableTasks.length} open</span>
            </div>

            <div className="space-y-3">
              {availableTasks.length ? availableTasks.slice(0, 4).map((task) => (
                <div key={task._id || task.title} className="flex items-center justify-between gap-3 rounded-2xl border border-[#123d3d]/8 bg-[#f7faf9] p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf9f4] text-xl">{iconMap[task.service] || '🧰'}</div>
                    <div>
                      <h4 className="text-sm font-bold text-[#123d3d]">{task.title || task.service}</h4>
                      <p className="text-xs text-[#5f6f6c]">{task.location || 'Sector 34'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <strong className="text-base font-extrabold text-[#123d3d]">₹{task.budget || 0}</strong>
                    <button type="button" className="rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] px-3 py-2 text-xs font-bold text-white shadow-[0_10px_18px_rgba(37,99,235,0.2)]" onClick={() => handleAccept(task._id)}>Accept</button>
                  </div>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-[#123d3d]/20 bg-[#f7faf9] p-4 text-sm text-[#5f6f6c]">No open requests right now.</div>
              )}
            </div>
          </div>

          <div id="my-jobs" className="rounded-[26px] border border-[#123d3d]/10 bg-white/85 p-5 shadow-[0_16px_34px_rgba(18,61,61,0.06)]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#123d3d]">My Jobs</h3>
            </div>

            <div className="space-y-3">
              {assignedTasks.length ? assignedTasks.slice(0, 4).map((task) => (
                <div key={task._id || task.title} className="flex items-center justify-between gap-3 rounded-2xl border border-[#123d3d]/8 bg-[#f7faf9] p-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#123d3d]">{task.title || task.service}</h4>
                    <p className="text-xs text-[#5f6f6c]">{task.status}</p>
                  </div>
                  <strong className="text-base font-extrabold text-[#123d3d]">₹{task.budget || 0}</strong>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-[#123d3d]/20 bg-[#f7faf9] p-4 text-sm text-[#5f6f6c]">No assigned jobs yet.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
