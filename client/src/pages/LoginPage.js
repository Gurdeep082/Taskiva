import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const result = await api.post("/auth/login", form);

      localStorage.setItem("taskiva_token", result.token);
      localStorage.setItem("taskiva_user", JSON.stringify(result));

      if (result.role === "tasker") {
        navigate("/tasker-dashboard");
        return;
      }

      navigate("/client-dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: "✓",
      title: "Quick Booking",
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
      desc: "Your bookings and payments stay protected.",
    },
    {
      icon: "24/7",
      title: "Always Available",
      desc: "Get the help you need whenever you need it.",
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
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#6C63FF] text-xl font-black text-white shadow-[0_10px_30px_rgba(108,99,255,0.3)]">
                T
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

          {/* Main content */}
          <div className="relative z-10 my-auto py-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B83FF]" />
              Trusted home services
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-[-0.055em] xl:text-6xl">
              Everything your
              <span className="block text-[#8B83FF]">
                home needs.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/60">
              Book trusted professionals for repairs, maintenance and
              everyday home services — all from one place.
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
              to="/"
              className="text-xs font-semibold text-white/60 transition hover:text-white"
            >
              Back to home →
            </Link>
          </div>
        </section>

        {/* =====================================================
            MOBILE BRANDING
        ===================================================== */}
        <div className="flex items-center justify-between border-b border-[#E3E6EE] px-5 py-5 lg:hidden">
          <Link to="/" className="flex items-center gap-3">
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
            to="/signup"
            className="text-sm font-bold text-[#6C63FF]"
          >
            Sign Up
          </Link>
        </div>

        {/* =====================================================
            RIGHT SECTION — LOGIN
        ===================================================== */}
        <section className="flex items-center justify-center bg-white px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
          <div className="w-full max-w-[450px]">

            {/* Header */}
            <div className="mb-8">


              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#172033] sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8992A3]">
                Sign in to manage your bookings and services.
              </p>
            </div>

            {/* Form */}
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Email / Phone */}
              <label className="block">
                <span className="text-sm font-semibold text-[#172033]">
                  Phone Number / Email
                </span>

                <input
                  name="email"
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your phone number or email"
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
                  placeholder="Enter your password"
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

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#596275]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded accent-[#6C63FF]"
                  />

                  Remember me
                </label>

                <a
                  href="#"
                  className="text-sm font-bold text-[#6C63FF] transition hover:text-[#5148E5]"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Login */}
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
                  ? "Logging in..."
                  : "Login to Your Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7 flex items-center justify-center">
              <div className="absolute left-0 right-0 h-px bg-[#E3E6EE]" />

              <span className="relative bg-white px-3 text-xs font-medium text-[#8992A3]">
                OR CONTINUE WITH
              </span>
            </div>

          
            {/* Signup */}
            <p className="mt-7 text-center text-sm text-[#8992A3]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-[#6C63FF] transition hover:text-[#5148E5]"
              >
                Create one
              </Link>
            </p>

            {/* Mobile benefits */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#E3E6EE] pt-6 lg:hidden">
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