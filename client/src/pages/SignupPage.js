import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "client",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await api.post("/auth/register", form);

      localStorage.setItem("taskiva_token", result.token);
      localStorage.setItem("taskiva_user", JSON.stringify(result));

      navigate("/client-dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: "✓",
      title: "Easy Booking",
      desc: "Find and book trusted professionals in seconds.",
    },
    {
      icon: "◆",
      title: "Verified Experts",
      desc: "Connect with reliable and verified service providers.",
    },
    {
      icon: "⌁",
      title: "Secure Payments",
      desc: "Safe and protected transactions every time.",
    },
    {
      icon: "24/7",
      title: "Always Available",
      desc: "Get support whenever you need it.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-40px)] w-full max-w-[1200px] overflow-hidden rounded-[32px] border border-[#E3E6EE] bg-white shadow-[0_30px_90px_rgba(23,32,51,0.10)] lg:grid-cols-[1fr_0.9fr]">

        {/* =====================================================
            LEFT SECTION — BRANDING
        ===================================================== */}
        <section className="relative hidden overflow-hidden bg-[#172033] p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">

          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#6C63FF]/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#8B83FF]/10 blur-3xl" />

          {/* Brand */}
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl  text-xl font-black text-white shadow-[0_10px_30px_rgba(108,99,255,0.3)]">
               <img src="/taskivalogo.png" alt="Taskiva Logo" className="h-12 w-12" />
              </div>

              <div>
                <div className="text-xl font-black tracking-tight">
                  Taskiva
                </div>

                <div className="text-xs font-medium text-white/50">
                  Home Services, Simplified
                </div>
              </div>
            </Link>
          </div>

          {/* Main branding content */}
          <div className="relative z-10 my-auto py-12">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B83FF]" />
              Join the Taskiva community
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-[-0.055em] xl:text-6xl">
              Your home.
              <span className="block text-[#8B83FF]">
                Your trusted experts.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
              Create your Taskiva account and make everyday home services
              simpler, faster and more reliable.
            </p>

            {/* Benefits */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-3"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-[#A78BFA] transition group-hover:border-[#6C63FF]/40 group-hover:bg-[#6C63FF]/10">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/45">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-xs text-white/35">
              Reliable services. Better homes.
            </p>

            <Link
              to="/login"
              className="text-xs font-semibold text-white/60 transition hover:text-white"
            >
              Already a member →
            </Link>
          </div>
        </section>

        {/* =====================================================
            MOBILE BRANDING
        ===================================================== */}
        <div className="flex items-center justify-between border-b border-[#E3E6EE] px-5 py-5 lg:hidden">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#172033] text-lg font-black text-white shadow-sm">
              T
            </div>

            <div>
              <div className="text-lg font-black tracking-tight text-[#172033]">
                Taskiva
              </div>

              <div className="text-[11px] text-[#8992A3]">
                Home Services
              </div>
            </div>
          </Link>

          <Link
            to="/login"
            className="text-sm font-bold text-[#6C63FF]"
          >
            Login
          </Link>
        </div>

        {/* =====================================================
            RIGHT SECTION — SIGNUP FORM
        ===================================================== */}
        <section className="flex items-center justify-center bg-white px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
          <div className="w-full max-w-[450px]">

            {/* Header */}
            <div className="mb-7">


              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#172033] sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8992A3]">
                Join Taskiva and get started with trusted home services.
              </p>
            </div>

            {/* Signup Form */}
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >

              {/* Name */}
              <label className="block">
                <span className="text-sm font-semibold text-[#172033]">
                  Full Name
                </span>

                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E3E6EE]
                    bg-[#F7F8FC]
                    px-4
                    py-3.5
                    text-sm
                    text-[#172033]
                    placeholder:text-[#A6ADBA]
                    outline-none
                    transition
                    focus:border-[#6C63FF]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#6C63FF]/10
                  "
                />
              </label>

              {/* Phone */}
              <label className="block">
                <span className="text-sm font-semibold text-[#172033]">
                  Phone Number
                </span>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E3E6EE]
                    bg-[#F7F8FC]
                    px-4
                    py-3.5
                    text-sm
                    text-[#172033]
                    placeholder:text-[#A6ADBA]
                    outline-none
                    transition
                    focus:border-[#6C63FF]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#6C63FF]/10
                  "
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-sm font-semibold text-[#172033]">
                  Email Address
                </span>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E3E6EE]
                    bg-[#F7F8FC]
                    px-4
                    py-3.5
                    text-sm
                    text-[#172033]
                    placeholder:text-[#A6ADBA]
                    outline-none
                    transition
                    focus:border-[#6C63FF]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#6C63FF]/10
                  "
                />
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-sm font-semibold text-[#172033]">
                  Password
                </span>

                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-[#E3E6EE]
                    bg-[#F7F8FC]
                    px-4
                    py-3.5
                    text-sm
                    text-[#172033]
                    placeholder:text-[#A6ADBA]
                    outline-none
                    transition
                    focus:border-[#6C63FF]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#6C63FF]/10
                  "
                />
              </label>

              {/* Role */}
              <label className="block">
                <span className="text-sm font-semibold text-[#172033]">
                  Join as
                </span>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="
                    mt-2
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-[#E3E6EE]
                    bg-[#F7F8FC]
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    text-[#172033]
                    outline-none
                    transition
                    focus:border-[#6C63FF]/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#6C63FF]/10
                  "
                >
                  <option value="client">
                    Client — Book Home Services
                  </option>

                  <option value="tasker">
                    Tasker — Provide Services
                  </option>
                </select>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Create account */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-[#6C63FF]
                  px-4
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_25px_rgba(108,99,255,0.22)]
                  transition
                  hover:-translate-y-0.5
                  hover:bg-[#7C74FF]
                  hover:shadow-[0_16px_32px_rgba(108,99,255,0.28)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {loading
                  ? "Creating account..."
                  : "Create My Account"}
              </button>

              
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-[#8992A3]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#6C63FF] transition hover:text-[#5148E5]"
              >
                Login here
              </Link>
            </p>

            {/* Mobile benefits */}
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#E3E6EE] pt-6 lg:hidden">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-[#F7F8FC] p-3"
                >
                  <div className="text-sm font-bold text-[#6C63FF]">
                    {item.icon}
                  </div>

                  <div className="mt-1 text-xs font-bold text-[#172033]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}