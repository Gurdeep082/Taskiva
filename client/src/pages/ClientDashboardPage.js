import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

const iconMap = {
  Plumbing: '🛠️',
  Electrical: '💡',
  Carpentry: '🪚',
  Cleaning: '🧼',
  'AC Repair': '❄️',
  'Appliance Repair': '🔧',
};

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalTasks: 0, bookedCount: 0, inProgressCount: 0, completedCount: 0 });
  const [tasks, setTasks] = useState([]);
  const [quickBook, setQuickBook] = useState({
    service: 'Plumbing',
    location: 'Sector 34, Chandigarh',
    budget: '1299',
  });

  useEffect(() => {
    const token = localStorage.getItem('taskiva_token');

    if (!token) {
      navigate('/login');
      return;
    }

    const load = async () => {
      try {
        const result = await api.get('/dashboard/client', token);
        setStats((prev) => result.stats || prev);
        setTasks(result.tasks || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [navigate]);

  const handleNav = (target) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (target === 'dashboard') {
      navigate('/client-dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('taskiva_token');
    localStorage.removeItem('taskiva_user');
    navigate('/login');
  };

  const handleBook = async () => {
    const token = localStorage.getItem('taskiva_token');
    try {
      const result = await api.post('/tasks/book', {
        title: `${quickBook.service} service`,
        service: quickBook.service,
        location: quickBook.location,
        budget: Number(quickBook.budget),
        scheduledDate: new Date().toISOString(),
      }, token);

      if (result.success) {
        const refreshed = await api.get('/dashboard/client', token);
        setTasks(refreshed.tasks || []);
        setStats((prev) => refreshed.stats || prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#edf6f5_100%)] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-gradient-to-b from-[#172033] to-[#1d4ed8] p-5 text-white">
        <div className="flex items-center gap-3 pb-6">
          <div className="grid h-11 w-11 place-items-center rounded-2xl text-lg font-extrabold text-white"><img src="/taskivalogo.png" alt="Taskiva Logo" className="h-11 w-11" /></div>
          <div>
            <div className="text-base font-extrabold">Taskiva</div>
            <div className="text-xs text-white/70">Home Services</div>
          </div>
        </div>

        <nav className="mt-6 space-y-2" aria-label="Sidebar navigation">
          <button type="button" className="w-full rounded-xl bg-white/10 px-3 py-3 text-left text-sm font-semibold text-white" onClick={() => handleNav('dashboard')}>Dashboard</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('my-bookings')}>My Bookings</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('quick-actions')}>Add Services</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('wallet')}>Wallet</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('support')}>Support</button>
          <button type="button" className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/75 transition hover:bg-white/10" onClick={() => handleNav('settings')}>Settings</button>
        </nav>

        <button type="button" className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-bold text-white transition hover:bg-white/10" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="p-5 md:p-7 lg:p-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.05em] text-[#172033]">Dashboard</h1>
            <p className="mt-1 text-sm text-[#596275]">Welcome back</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-xl border border-[#123d3d]/10 bg-white px-3 py-2 text-sm font-semibold text-[#123d3d] shadow-sm">This Month</button>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] text-sm font-extrabold text-[#172033]">GS</div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[{ label: 'Bookings', value: stats.totalTasks, note: 'New requests' }, { label: 'In Progress', value: stats.inProgressCount, note: 'Ongoing service' }, { label: 'Completed', value: stats.completedCount, note: 'Success rate' }, { label: 'Wallet', value: '₹1,250', note: 'Available balance' }].map((card) => (
            <div key={card.label} className="rounded-[22px] border border-[#123d3d]/10 bg-white/85 p-5 shadow-[0_16px_34px_rgba(18,61,61,0.06)]">
              <span className="text-sm text-[#5f6f6c]">{card.label}</span>
              <strong className="mt-2 block text-3xl font-black text-[#123d3d]">{card.value}</strong>
              <small className="mt-2 block text-xs text-[#5f6f6c]">{card.note}</small>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-[26px] border border-[#123d3d]/10 bg-white/85 p-5 shadow-[0_16px_34px_rgba(18,61,61,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#123d3d]">Recent Bookings</h3>
              <Link to="/client-dashboard" className="text-sm font-bold text-[#1d4ed8]">View all</Link>
            </div>

            <div className="space-y-3">
              {tasks.length ? tasks.slice(0, 4).map((task) => (
                <div key={task._id || task.title} className="flex items-center justify-between gap-3 rounded-2xl border border-[#123d3d]/8 bg-[#f7faf9] p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf9f4] text-xl">{iconMap[task.service] || '🧰'}</div>
                    <div>
                      <h4 className="text-sm font-bold text-[#123d3d]">{task.title || task.service}</h4>
                      <p className="text-xs text-[#5f6f6c]">{task.location || 'Sector 34'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f6f6c]">{task.status}</span>
                    <strong className="text-base font-extrabold text-[#123d3d]">₹{task.budget || 0}</strong>
                  </div>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-[#123d3d]/20 bg-[#f7faf9] p-4 text-sm text-[#5f6f6c]">No bookings yet.</div>
              )}
            </div>
          </div>

          <div id="quick-actions" className="rounded-[26px] border border-[#123d3d]/10 bg-white/85 p-5 shadow-[0_16px_34px_rgba(18,61,61,0.06)]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#123d3d]">Quick Actions</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-4 rounded-2xl border border-[#123d3d]/8 bg-[#f7faf9] p-4">
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5f6f6c]">
                  Service
                  <select value={quickBook.service} onChange={(e) => setQuickBook((prev) => ({ ...prev, service: e.target.value }))} className="mt-2 w-full rounded-xl border border-[#123d3d]/10 bg-white px-3 py-2.5 text-sm text-[#123d3d] outline-none focus:border-[#0d6d5d]/40 focus:ring-2 focus:ring-[#0d6d5d]/10">
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Cleaning</option>
                    <option>AC Repair</option>
                  </select>
                </label>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#5f6f6c]">
                  Budget
                  <input value={quickBook.budget} onChange={(e) => setQuickBook((prev) => ({ ...prev, budget: e.target.value }))} className="mt-2 w-full rounded-xl border border-[#123d3d]/10 bg-white px-3 py-2.5 text-sm text-[#123d3d] outline-none focus:border-[#0d6d5d]/40 focus:ring-2 focus:ring-[#0d6d5d]/10" />
                </label>
                <button type="button" className="w-full rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5" onClick={handleBook}>Book Service</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
