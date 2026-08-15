import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const getStoredLocation = () => {
  try {
    return localStorage.getItem('taskiva_location') || 'Chandigarh';
  } catch {
    return 'Chandigarh';
  }
};

const services = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Carpentry',
  'AC Repair',
  'Appliance Repair',
  'Painting',
  'Pest Control',
];

export default function BookingPage() {
  const navigate = useNavigate();
  const savedSearch = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('taskiva_search') || '{}');
    } catch {
      return {};
    }
  }, []);

  const [form, setForm] = useState({
    service: savedSearch.service || 'Plumbing',
    location: savedSearch.location || getStoredLocation(),
    date: savedSearch.date || 'Today',
    time: savedSearch.time || 'Any Time',
    name: '',
    phone: '',
    budget: '1299',
    notes: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      handleChange('location', 'Location unavailable');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = `Current: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        handleChange('location', currentLocation);
        localStorage.setItem('taskiva_location', currentLocation);
      },
      () => {
        handleChange('location', 'Chandigarh');
        localStorage.setItem('taskiva_location', 'Chandigarh');
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('taskiva_token');
      const payload = {
        title: `${form.service} service`,
        service: form.service,
        location: form.location,
        budget: Number(form.budget || 1299),
        notes: form.notes || `Request for ${form.service} on ${form.date} at ${form.time}`,
      };

      await api.post('/tasks/book', payload, token);
      setMessage('Booking created successfully. Your Taskiva expert is on the way to confirm the slot.');
      setForm((prev) => ({ ...prev, name: '', phone: '', notes: '', budget: '1299' }));
    } catch (error) {
      setMessage(error.message || 'Unable to place booking right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7ff_0%,#edf4ff_100%)] pb-16">
      <header className="mx-auto flex w-full max-w-[1780px] items-center justify-between gap-5 px-4 pt-6 pb-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-lg font-extrabold text-white shadow-lg shadow-blue-900/20">T</div>
          <div>
            <div className="text-base font-extrabold text-[#172033]">Taskiva</div>
            <div className="text-[11px] text-[#596275]">Professional booking flow</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-4 py-2.5 text-sm font-semibold text-[#172033] transition hover:bg-[#EEF4FF]" onClick={() => navigate('/')}>Back Home</button>
          <button type="button" className="rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5" onClick={() => navigate('/login')}>Login</button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1780px] px-4 md:px-6 lg:px-8">
        <section className="mt-2 flex flex-col gap-4 rounded-[28px] border border-[#E3E6EE] bg-white/70 px-6 py-6 shadow-[0_18px_42px_rgba(37,99,235,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#E0EAFF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">Book service</span>
            <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.06em] text-[#172033] sm:text-4xl lg:text-5xl">Choose the right service and schedule it instantly.</h1>
          </div>
          <div className="rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-bold text-[#1d4ed8]">Verified experts available today</div>
        </section>

        <section className="mt-7 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <form className="space-y-5 rounded-[28px] border border-[#E3E6EE] bg-white/85 p-5 shadow-[0_18px_42px_rgba(37,99,235,0.08)] sm:p-7" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold text-[#172033]">
                Service Needed
                <select value={form.service} onChange={(event) => handleChange('service', event.target.value)} className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]">
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-[#172033]">
                Preferred Budget
                <input type="number" value={form.budget} onChange={(event) => handleChange('budget', event.target.value)} min="500" step="100" className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold text-[#172033]">
                Location
                <div className="mt-2 flex gap-3">
                  <input type="text" value={form.location} onChange={(event) => handleChange('location', event.target.value)} className="w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]" />
                  <button type="button" className="shrink-0 rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-2.5 text-xs font-semibold text-[#172033] transition hover:bg-[#EEF4FF]" onClick={handleUseCurrentLocation}>Use current</button>
                </div>
              </label>

              <label className="block text-sm font-bold text-[#172033]">
                Mobile Number
                <input type="tel" value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} placeholder="Enter mobile number" className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-bold text-[#172033]">
                Date
                <select value={form.date} onChange={(event) => handleChange('date', event.target.value)} className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]">
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Week</option>
                </select>
              </label>

              <label className="block text-sm font-bold text-[#172033]">
                Time Slot
                <select value={form.time} onChange={(event) => handleChange('time', event.target.value)} className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]">
                  <option>Any Time</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </label>
            </div>

            <label className="block text-sm font-bold text-[#172033]">
              Full Name
              <input type="text" value={form.name} onChange={(event) => handleChange('name', event.target.value)} placeholder="Enter your full name" className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]" />
            </label>

            <label className="block text-sm font-bold text-[#172033]">
              Issue Details
              <textarea rows="5" value={form.notes} onChange={(event) => handleChange('notes', event.target.value)} placeholder="Tell us what issue you are facing..." className="mt-2 w-full rounded-xl border border-[#E3E6EE] bg-[#F7F8FC] px-3 py-3 text-[#172033] outline-none transition focus:border-[#2563eb]/40 focus:ring-2 focus:ring-[#DBEAFE]" />
            </label>

            {message ? <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm font-semibold text-[#1d4ed8]">{message}</div> : null}

            <button type="submit" className="rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Book Service'}
            </button>
          </form>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-[#E3E6EE] bg-white/85 p-6 shadow-[0_18px_42px_rgba(37,99,235,0.08)]">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">Your order</span>
              <h3 className="mt-3 text-2xl font-black text-[#172033]">{form.service}</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#596275]">
                <li><strong className="text-[#172033]">Location:</strong> {form.location}</li>
                <li><strong className="text-[#172033]">Date:</strong> {form.date}</li>
                <li><strong className="text-[#172033]">Time:</strong> {form.time}</li>
                <li><strong className="text-[#172033]">Estimated:</strong> ₹{Number(form.budget || 1299).toLocaleString('en-IN')}</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-[#E3E6EE] bg-gradient-to-br from-[#EEF4FF] to-white p-6 shadow-[0_18px_42px_rgba(37,99,235,0.08)]">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-[#1d4ed8]">Why customers choose Taskiva</span>
              <ul className="mt-4 space-y-3 text-sm text-[#5f6f6c]">
                <li>• Verified and trained specialists</li>
                <li>• Transparent pricing and updates</li>
                <li>• Quick support when things break</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
