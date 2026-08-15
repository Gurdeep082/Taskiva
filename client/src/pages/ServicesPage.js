import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const allServices = [
  { name: 'Plumbing', icon: '🛠️', category: 'Maintenance', price: 'Starting ₹199', description: 'Fix leaks, unclog drains, install taps, and repair water lines.' },
  { name: 'Electrical', icon: '💡', category: 'Electrical', price: 'Starting ₹249', description: 'Ceiling fans, lighting, wiring, switches, and emergency electrical work.' },
  { name: 'Carpentry', icon: '🪚', category: 'Furniture', price: 'Starting ₹299', description: 'Furniture repair, fittings, doors, shelves, and custom woodwork.' },
  { name: 'Home Cleaning', icon: '🧽', category: 'Cleaning', price: 'Starting ₹199', description: 'Kitchen deep clean, home cleaning, and regular maintenance services.' },
  { name: 'AC Repair', icon: '❄️', category: 'Appliance', price: 'Starting ₹349', description: 'Indoor unit service, gas refill, repairs, and cooling problems.' },
  { name: 'Appliance Repair', icon: '🔧', category: 'Appliance', price: 'Starting ₹259', description: 'Washing machines, geysers, RO systems, and kitchen appliance service.' },
  { name: 'Painting', icon: '🎨', category: 'Renovation', price: 'Starting ₹299', description: 'Interior and exterior repainting, touch-ups, and wall finishing.' },
  { name: 'Pest Control', icon: '🪲', category: 'Safety', price: 'Starting ₹249', description: 'Safe pest treatment for cockroaches, ants, termites, and mosquitoes.' },
  { name: 'Gardening', icon: '🌿', category: 'Outdoor', price: 'Starting ₹229', description: 'Plant care, lawn cleanup, pruning, and decorative garden support.' },
  { name: 'Movers & Relocation', icon: '📦', category: 'Moving', price: 'Starting ₹999', description: 'Move furniture, appliances, and household items with professional help.' },
  { name: 'Salon at Home', icon: '💇', category: 'Personal Care', price: 'Starting ₹499', description: 'Hair, grooming, and beauty care appointments in the comfort of home.' },
  { name: 'Computer Repair', icon: '🖥️', category: 'Tech', price: 'Starting ₹399', description: 'Laptop and PC diagnosis, setup, speed fixes, and device support.' },
];

const categories = ['All', ...new Set(allServices.map((service) => service.category))];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredServices = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return allServices.filter((service) => {
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      const matchesQuery =
        normalized === '' ||
        service.name.toLowerCase().includes(normalized) ||
        service.category.toLowerCase().includes(normalized) ||
        service.description.toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const suggestions = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return [];

    return [...new Set([
      ...allServices
        .filter((service) =>
          service.name.toLowerCase().includes(text) ||
          service.category.toLowerCase().includes(text)
        )
        .map((service) => service.name),
      ...allServices
        .filter((service) => service.category.toLowerCase().includes(text))
        .map((service) => service.category),
    ])].slice(0, 6);
  }, [query]);

  const handleSuggestionSelect = (value) => {
    const match = allServices.find((service) => service.name.toLowerCase() === value.toLowerCase());
    if (match) {
      setQuery('');
      setActiveCategory(match.category);
      setShowSuggestions(false);
      return;
    }

    const categoryMatch = categories.find((category) => category.toLowerCase() === value.toLowerCase());
    if (categoryMatch) {
      setActiveCategory(categoryMatch);
      setQuery('');
      setShowSuggestions(false);
      return;
    }

    setQuery(value);
    setShowSuggestions(false);
  };

  const handleSelectService = (serviceName) => {
    localStorage.setItem('taskiva_search', JSON.stringify({
      service: serviceName,
      location: localStorage.getItem('taskiva_location') || 'Chandigarh',
      date: 'Today',
      time: 'Any Time',
    }));

    navigate('/book');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#172033]">
      <header className="mx-auto flex w-full max-w-[1780px] items-center justify-between gap-4 px-4 py-5 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#172033] text-lg font-black text-white shadow-[0_12px_28px_rgba(23,32,51,0.22)]">T</div>
          <div>
            <div className="text-lg font-black tracking-[-0.04em] text-[#172033]">Taskiva</div>
            <div className="text-[11px] text-[#596275]">Browse all services</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="rounded-full border border-[#E3E6EE] bg-white px-4 py-2 text-sm font-semibold text-[#172033]">Back Home</Link>
          <Link to="/book" className="rounded-full bg-[#6C63FF] px-4 py-2 text-sm font-bold text-white shadow-[0_12px_24px_rgba(108,99,255,0.24)]">Book Now</Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1780px] px-4 pb-16 md:px-6 lg:px-8">
        <section className="rounded-[30px] border border-[#E3E6EE] bg-white p-5 shadow-[0_25px_60px_rgba(23,32,51,0.04)] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-block rounded-full bg-[#F0EEFF] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6C63FF]">All services</span>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#172033] sm:text-4xl">Find the right help for your home</h1>
            </div>
            <div className="rounded-full bg-[#F7F8FC] px-4 py-2 text-sm font-medium text-[#596275]">Trusted experts • Real-time availability</div>
          </div>

          <div className="mt-7 relative max-w-3xl rounded-[14px]">
            <input
              type="text"
              value={query}
              onFocus={() => setShowSuggestions(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search service, category or need..."
              className="w-full rounded-[18px] border border-[#E3E6EE] bg-[#F7F8FC] px-4 py-3.5 pr-12 text-sm text-[#172033] outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#E7E0FF]"
            />
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#596275]">⌕</div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="mt-2 rounded-2xl border border-[#E3E6EE] bg-white p-2 shadow-[0_18px_30px_rgba(23,32,51,0.06)]">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-[#172033] transition hover:bg-[#F7F8FC]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-[#172033] text-white shadow-[0_10px_20px_rgba(23,32,51,0.15)]'
                    : 'border border-[#E3E6EE] bg-white text-[#596275] hover:bg-[#F7F8FC]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.name}
                onClick={() => handleSelectService(service.name)}
                className="cursor-pointer rounded-[14px] border border-[#E3E6EE] bg-white p-5 shadow-[0_18px_34px_rgba(23,32,51,0.04)] transition hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(23,32,51,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#F0EEFF] text-2xl text-[#6C63FF]">{service.icon}</div>
                  <span className="rounded-full bg-[#F0F2F7] px-2.5 py-1 text-[11px] font-semibold text-[#596275]">{service.category}</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-[#172033]">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#596275]">{service.description}</p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E3E6EE] pt-4">
                  <div>
                    <div className="text-sm font-semibold text-[#6C63FF]">{service.price}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSelectService(service.name);
                    }}
                    className="rounded-full bg-[#172033] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#212c45]"
                  >
                    Book now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-[14px] border border-dashed border-[#E3E6EE] bg-white p-10 text-center">
              <div className="text-xl font-bold text-[#172033]">No services match your search.</div>
              <div className="mt-2 text-sm text-[#596275]">Try another keyword or switch the category filter.</div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
