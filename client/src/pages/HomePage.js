import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronDown,
  Search,
  Menu,
  X,
  ArrowRight,
  Check,
  ShieldCheck,
  Clock3,
  Star,
  Wrench,
  Zap,
  Car,
  Snowflake,
  Sparkles,
  Refrigerator,
} from "lucide-react";

const services = [
  "Plumbing",
  "Electrical",
  "Car Repair",
  "AC Repair",
  "Cleaning",
  "Appliance Repair",
];

const locations = [
  "Chandigarh",
  "Mohali",
  "Panchkula",
  "Delhi",
];

export default function HomePage() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [locationOpen, setLocationOpen] = useState(false);

  const [filters, setFilters] = useState({
    service: "Plumbing",
    location: "Chandigarh",
    date: "Today",
    time: "Any Time",
  });

  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    navigate("/book", {
      state: {
        service: filters.service,
        location: filters.location,
        date: filters.date,
        time: filters.time,
      },
    });
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#172033]">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="sticky top-0 z-50 border-b border-[#E5E7EB]/80 bg-[#F7F8FC]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] w-full max-w-[1780px] items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#172033] text-lg font-black text-white shadow-[0_8px_22px_rgba(23,32,51,0.16)] transition duration-200 group-hover:-translate-y-0.5">
              T
            </div>

            <div>
              <div className="text-[18px] font-black tracking-[-0.03em] text-[#172033]">
                Taskiva
              </div>

              <div className="text-[10px] font-medium tracking-wide text-[#8992A3]">
                HOME SERVICES
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="text-sm font-semibold text-[#172033] transition hover:text-[#6366F1]"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className="text-sm font-semibold text-[#596275] transition hover:text-[#6366F1]"
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-semibold text-[#596275] transition hover:text-[#6366F1]"
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="text-sm font-semibold text-[#596275] transition hover:text-[#6366F1]"
            >
              About
            </button>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">

            {/* Location */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLocationOpen((prev) => !prev)}
                className="
                  flex
                  h-11
                  items-center
                  gap-2.5
                  rounded-xl
                  border
                  border-[#E3E6EE]
                  bg-white
                  px-3.5
                  text-left
                  shadow-[0_5px_16px_rgba(15,23,42,0.04)]
                  transition
                  hover:border-[#C7C9FF]
                "
              >
                <MapPin
                  size={16}
                  className="text-[#6366F1]"
                />

                <div className="leading-none">
                  <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#98A2B3]">
                    Location
                  </div>

                  <div className="mt-1 text-xs font-bold text-[#172033]">
                    {filters.location}
                  </div>
                </div>

                <ChevronDown
                  size={14}
                  className={`ml-1 text-[#8992A3] transition-transform ${
                    locationOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {locationOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] overflow-hidden rounded-2xl border border-[#E3E6EE] bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
                  {locations.map((location) => {
                    const active =
                      filters.location === location;

                    return (
                      <button
                        key={location}
                        type="button"
                        onClick={() => {
                          handleChange(
                            "location",
                            location
                          );
                          setLocationOpen(false);
                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-xl
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-semibold
                          transition
                          ${
                            active
                              ? "bg-[#F0F0FF] text-[#6366F1]"
                              : "text-[#596275] hover:bg-[#F7F8FC]"
                          }
                        `}
                      >
                        {location}

                        {active && (
                          <Check
                            size={15}
                            className="text-[#6366F1]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="px-3 text-sm font-bold text-[#596275] transition hover:text-[#172033]"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                rounded-xl
                bg-[#172033]
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(23,32,51,0.15)]
                transition
                hover:-translate-y-0.5
                hover:bg-[#111827]
              "
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-[#E3E6EE]
              bg-white
              text-[#172033]
              lg:hidden
            "
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E5E7EB] bg-white px-5 py-5 lg:hidden">
            <div className="mx-auto max-w-[1780px] space-y-1">

              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#172033] hover:bg-[#F7F8FC]"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("services")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#596275] hover:bg-[#F7F8FC]"
              >
                Services
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#596275] hover:bg-[#F7F8FC]"
              >
                How It Works
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#596275] hover:bg-[#F7F8FC]"
              >
                About
              </button>

              <div className="my-3 h-px bg-[#E5E7EB]" />

              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-[#596275] hover:bg-[#F7F8FC]"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl bg-[#172033] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        id="home"
        className="
          mx-auto
          w-full
          max-w-[1780px]
          px-4
          py-5
          sm:px-6
          sm:py-7
          lg:px-8
          lg:py-8
        "
      >
        <div
          className="
            relative
            isolate
            min-h-[680px]
            overflow-hidden
            rounded-[30px]
            border
            border-[#E2E4E9]
            bg-[#EEF0ED]
            shadow-[0_30px_80px_rgba(15,23,42,0.10)]
            sm:min-h-[720px]
          "
        >

          {/* =====================================================
              BACKGROUND IMAGE
              Man remains on RIGHT
          ===================================================== */}

          <div
            className="
              absolute
              inset-0
              -z-20
              bg-cover
              bg-no-repeat
              bg-[position:72%_center]
              sm:bg-[position:74%_center]
              lg:bg-[position:76%_center]
            "
            style={{
              backgroundImage:
                "url('/background.png')",
            }}
          />

          {/* Left readability */}
          <div
            className="
              absolute
              inset-0
              -z-10
              bg-gradient-to-r
              from-[#EEF0ED]
              via-[#EEF0ED]/95
              via-[48%]
              to-transparent
            "
          />

          {/* Bottom fade */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              -z-10
              h-40
              bg-gradient-to-t
              from-[#EEF0ED]/40
              to-transparent
            "
          />

          {/* Hero content */}
          <div
            className="
              relative
              flex
              min-h-[680px]
              items-center
              px-5
              py-12
              sm:min-h-[720px]
              sm:px-9
              lg:px-14
              xl:px-16
            "
          >
            <div className="w-full max-w-[690px]">

              {/* Eyebrow */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#D9DCE3]
                  bg-white/80
                  px-3.5
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#667085]
                  shadow-[0_8px_24px_rgba(15,23,42,0.05)]
                  backdrop-blur-md
                "
              >
                <span className="h-2 w-2 rounded-full bg-[#6366F1] shadow-[0_0_0_4px_rgba(99,102,241,0.12)]" />

                Trusted Home Services
              </div>

              {/* Heading */}
              <h1
                className="
                  mt-6
                  max-w-[680px]
                  text-[3rem]
                  font-black
                  leading-[0.94]
                  tracking-[-0.065em]
                  text-[#111827]
                  sm:text-[4rem]
                  md:text-[4.6rem]
                  lg:text-[5rem]
                  xl:text-[5.35rem]
                "
              >
                Your Home.
                <span className="block text-[#6366F1]">
                  Our Experts.
                </span>
                <span className="block">
                  One Simple Booking.
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  mt-6
                  max-w-[580px]
                  text-[15px]
                  leading-7
                  text-[#596275]
                  sm:text-lg
                  sm:leading-8
                "
              >
                From urgent repairs to everyday maintenance,
                connect with trusted professionals and get the
                job done without the hassle.
              </p>

              {/* Trust points */}
              <div className="mt-6 flex flex-wrap gap-2.5">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white
                    bg-white/80
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-[#344054]
                    shadow-[0_6px_18px_rgba(15,23,42,0.05)]
                    backdrop-blur-md
                  "
                >
                  <ShieldCheck
                    size={15}
                    className="text-[#6366F1]"
                  />
                  Verified Experts
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white
                    bg-white/80
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-[#344054]
                    shadow-[0_6px_18px_rgba(15,23,42,0.05)]
                    backdrop-blur-md
                  "
                >
                  <Clock3
                    size={15}
                    className="text-[#6366F1]"
                  />
                  On-time Service
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white
                    bg-white/80
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    text-[#344054]
                    shadow-[0_6px_18px_rgba(15,23,42,0.05)]
                    backdrop-blur-md
                  "
                >
                  <Star
                    size={15}
                    className="fill-[#6366F1] text-[#6366F1]"
                  />
                  Top-rated Taskers
                </div>
              </div>

              {/* =================================================
                  BOOKING CARD
              ================================================= */}

              <div
                className="
                  mt-8
                  max-w-[760px]
                  rounded-[23px]
                  border
                  border-white
                  bg-white/90
                  p-3
                  shadow-[0_25px_60px_rgba(15,23,42,0.13)]
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    grid
                    gap-2.5
                    md:grid-cols-[1.15fr_1fr_0.8fr_0.8fr_auto]
                  "
                >

                  {/* Service */}
                  <div
                    className="
                      rounded-[15px]
                      border
                      border-[#E6E8ED]
                      bg-[#F8F9FB]
                      px-4
                      py-3
                    "
                  >
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98A2B3]">
                      Service
                    </div>

                    <select
                      value={filters.service}
                      onChange={(e) =>
                        handleChange(
                          "service",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent text-sm font-bold text-[#172033] outline-none"
                    >
                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div
                    className="
                      rounded-[15px]
                      border
                      border-[#E6E8ED]
                      bg-[#F8F9FB]
                      px-4
                      py-3
                    "
                  >
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98A2B3]">
                      Location
                    </div>

                    <select
                      value={filters.location}
                      onChange={(e) =>
                        handleChange(
                          "location",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent text-sm font-bold text-[#172033] outline-none"
                    >
                      {locations.map((location) => (
                        <option
                          key={location}
                          value={location}
                        >
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div
                    className="
                      rounded-[15px]
                      border
                      border-[#E6E8ED]
                      bg-[#F8F9FB]
                      px-4
                      py-3
                    "
                  >
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98A2B3]">
                      Date
                    </div>

                    <select
                      value={filters.date}
                      onChange={(e) =>
                        handleChange(
                          "date",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent text-sm font-bold text-[#172033] outline-none"
                    >
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>This Week</option>
                    </select>
                  </div>

                  {/* Time */}
                  <div
                    className="
                      rounded-[15px]
                      border
                      border-[#E6E8ED]
                      bg-[#F8F9FB]
                      px-4
                      py-3
                    "
                  >
                    <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98A2B3]">
                      Time
                    </div>

                    <select
                      value={filters.time}
                      onChange={(e) =>
                        handleChange(
                          "time",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent text-sm font-bold text-[#172033] outline-none"
                    >
                      <option>Any Time</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      justify-center
                      gap-1.5
                      rounded-[15px]
                      bg-[#172033]
                      px-6
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_12px_28px_rgba(23,32,51,0.20)]
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#111827]
                      active:translate-y-0
                    "
                  >
                    Find Tasker

                    <ArrowRight
                      size={16}
                      className="text-[#A5B4FC]"
                    />
                  </button>
                </div>

                {/* Offer */}
                <div
                  className="
                    mt-2.5
                    flex
                    flex-col
                    gap-3
                    rounded-[15px]
                    border
                    border-[#E8E7FF]
                    bg-[#F8F8FF]
                    px-4
                    py-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#EEEEFF]
                        text-sm
                        font-black
                        text-[#6366F1]
                      "
                    >
                      %
                    </div>

                    <div>
                      <div className="text-sm font-black text-[#3730A3]">
                        20% OFF YOUR FIRST BOOKING
                      </div>

                      <div className="text-xs text-[#667085]">
                        Use code TASKIVA20
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/book")}
                    className="
                      rounded-full
                      border
                      border-[#C7C9FF]
                      bg-white
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-[#6366F1]
                      transition
                      hover:bg-[#F0F0FF]
                    "
                  >
                    View Offer →
                  </button>
                </div>
              </div>

              {/* Mobile visual hint */}
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#667085] lg:hidden">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" />
                Trusted professionals at your doorstep
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* =========================================================
    PART 2 — POPULAR SERVICES
========================================================= */}

<section
  id="services"
  className="
    w-full
    px-4
    py-14
    sm:px-6
    sm:py-16
    lg:px-10
    lg:py-20
  "
>
  <div className="mx-auto w-full max-w-[1720px]">

    {/* =====================================================
        SECTION HEADING
    ===================================================== */}
    <div
      className="
        mb-10
        flex
        flex-col
        gap-5
        sm:mb-12
        lg:flex-row
        lg:items-end
        lg:justify-between
      "
    >
      <div className="max-w-[680px]">
        <div
          className="
            mb-3
            flex
            items-center
            gap-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-[#6366F1]
          "
        >
          <span className="h-px w-6 bg-[#6366F1]" />
          <span>Our Services</span>
        </div>

        <h2
          className="
            text-3xl
            font-black
            leading-[1.05]
            tracking-[-0.045em]
            text-[#172033]
            sm:text-4xl
            lg:text-[2.8rem]
          "
        >
          Everything your home needs,
          <span className="text-[#6366F1]">
            {" "}in one place.
          </span>
        </h2>

        <p
          className="
            mt-4
            max-w-[600px]
            text-sm
            leading-7
            text-[#667085]
            sm:text-base
          "
        >
          From quick fixes to complete home maintenance,
          find skilled professionals for the jobs that matter.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/services")}
        className="
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          border
          border-[#DDE1E8]
          bg-white
          px-4
          py-2.5
          text-sm
          font-bold
          text-[#344054]
          shadow-[0_5px_16px_rgba(15,23,42,0.04)]
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-[#C7C9FF]
          hover:bg-[#F8F8FF]
          hover:text-[#6366F1]
          hover:shadow-[0_8px_20px_rgba(99,102,241,0.08)]
        "
      >
        View all services
        <ArrowRight size={15} />
      </button>
    </div>

    {/* =====================================================
        SERVICES GRID
    ===================================================== */}
    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        sm:gap-4
        lg:grid-cols-6
      "
    >
      {[
        {
          name: "Plumbing",
          description: "Leaks, taps & pipes",
          icon: Wrench,
          color: "bg-[#EEF0FF]",
          iconColor: "text-[#6366F1]",
        },
        {
          name: "Electrical",
          description: "Wiring & repairs",
          icon: Zap,
          color: "bg-[#FFF7E8]",
          iconColor: "text-[#D99100]",
        },
        {
          name: "Car Repair",
          description: "Service & repairs",
          icon: Car,
          color: "bg-[#EDF6FF]",
          iconColor: "text-[#3182CE]",
        },
        {
          name: "AC Repair",
          description: "Cooling & service",
          icon: Snowflake,
          color: "bg-[#ECF9F7]",
          iconColor: "text-[#159A8C]",
        },
        {
          name: "Cleaning",
          description: "Home & deep cleaning",
          icon: Sparkles,
          color: "bg-[#F5EEFF]",
          iconColor: "text-[#8B5CF6]",
        },
        {
          name: "Appliances",
          description: "Repair & installation",
          icon: Refrigerator,
          color: "bg-[#FFF0F0]",
          iconColor: "text-[#E05A5A]",
        },
      ].map((service) => {
        const Icon = service.icon;

        return (
          <button
            key={service.name}
            type="button"
            onClick={() => {
              handleChange("service", service.name);

              navigate("/book", {
                state: {
                  service: service.name,
                  location: filters.location,
                },
              });
            }}
            className="
              group
              relative
              min-h-[190px]
              overflow-hidden
              rounded-[24px]
              border
              border-[#E5E7EB]
              bg-white
              p-5
              text-left
              shadow-[0_8px_25px_rgba(15,23,42,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#D9D7FF]
              hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)]
              sm:p-6
            "
          >
            {/* Decorative background */}
            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-[#F8F8FF]
                transition-all
                duration-500
                group-hover:scale-[1.8]
              "
            />

            {/* Small decorative glow */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-[-30px]
                left-[-30px]
                h-20
                w-20
                rounded-full
                bg-[#6366F1]/[0.025]
                blur-xl
                transition
                duration-500
                group-hover:bg-[#6366F1]/[0.08]
              "
            />

            {/* =================================================
                ICON
            ================================================= */}
            <div
              className={`
                relative
                z-10
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-[17px]
                ${service.color}
                ${service.iconColor}
                shadow-[0_7px_18px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:shadow-[0_10px_22px_rgba(15,23,42,0.08)]
                sm:h-16
                sm:w-16
                sm:rounded-[19px]
              `}
            >
              <Icon
                size={29}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </div>

            {/* =================================================
                CONTENT
            ================================================= */}
            <div className="relative z-10 mt-6">
              <h3
                className="
                  text-[15px]
                  font-black
                  tracking-[-0.02em]
                  text-[#172033]
                  sm:text-base
                "
              >
                {service.name}
              </h3>

              <p
                className="
                  mt-1.5
                  text-xs
                  leading-5
                  text-[#8992A3]
                "
              >
                {service.description}
              </p>
            </div>

            {/* =================================================
                ARROW
            ================================================= */}
            <div
              className="
                absolute
                bottom-5
                right-5
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#E5E7EB]
                bg-white
                text-[#98A2B3]
                transition-all
                duration-300
                group-hover:border-[#6366F1]
                group-hover:bg-[#6366F1]
                group-hover:text-white
                sm:h-9
                sm:w-9
              "
            >
              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </div>
          </button>
        );
      })}
    </div>

    {/* =====================================================
        TRUST STRIP
    ===================================================== */}
    <div
      className="
        mt-5
        flex
        flex-col
        gap-4
        rounded-[22px]
        border
        border-[#E5E7EB]
        bg-[#172033]
        px-5
        py-5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white/10
            text-[#A5B4FC]
          "
        >
          <ShieldCheck size={20} />
        </div>

        <div>
          <p className="text-sm font-bold text-white">
            Every service starts with trust.
          </p>

          <p className="mt-0.5 text-xs text-white/45">
            Verified professionals • Transparent pricing • Secure bookings
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/services")}
        className="
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          bg-white
          px-4
          py-2.5
          text-xs
          font-bold
          text-[#172033]
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-[#F0F0FF]
          hover:text-[#6366F1]
        "
      >
        Explore services
        <ArrowRight size={14} />
      </button>
    </div>
  </div>
</section>
{/* =========================================================
    PART 3 — HOW TASKIVA WORKS
========================================================= */}
<section
  id="how-it-works"
  className="w-full px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
>
  <div className="mx-auto w-full max-w-[1720px]">
    {/* =====================================================
        HEADING
    ===================================================== */}
    <div className="max-w-[760px]">
      <div
        className="
          mb-3
          flex
          items-center
          gap-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-[#6366F1]
        "
      >
        <span className="h-px w-6 bg-[#6366F1]" />
        <span>Simple by design</span>
      </div>

      <h2
        className="
          text-3xl
          font-black
          leading-[1.05]
          tracking-[-0.045em]
          text-[#172033]
          sm:text-4xl
          lg:text-[2.8rem]
        "
      >
        Get things done
        <span className="text-[#6366F1]">
          {" "}without the hassle.
        </span>
      </h2>

      <p
        className="
          mt-4
          max-w-[620px]
          text-sm
          leading-7
          text-[#667085]
          sm:text-base
        "
      >
        From finding the right professional to getting the
        job completed, Taskiva keeps the entire experience
        simple.
      </p>
    </div>

    {/* =====================================================
        STEPS
    ===================================================== */}
    <div
      className="
        relative
        mt-10
        grid
        gap-4
        md:grid-cols-3
        lg:mt-12
      "
    >
      {/* Connecting line */}
      <div
        className="
          pointer-events-none
          absolute
          left-[16.5%]
          right-[16.5%]
          top-[43px]
          hidden
          h-px
          bg-gradient-to-r
          from-[#E5E7EB]
          via-[#C9C5FF]
          to-[#E5E7EB]
          md:block
        "
      />

      {/* =================================================
          STEP 1
      ================================================= */}
      <div
        className="
          group
          relative
          rounded-[24px]
          border
          border-[#E5E7EB]
          bg-white
          p-5
          shadow-[0_8px_25px_rgba(15,23,42,0.04)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#D9D7FF]
          hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]
          sm:p-6
          lg:p-7
        "
      >
        <div className="flex items-start justify-between">
          <div
            className="
              relative
              z-10
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[18px]
              bg-[#EEF0FF]
              text-[#6366F1]
              shadow-[0_8px_20px_rgba(99,102,241,0.10)]
              transition-transform
              duration-300
              group-hover:scale-105
              sm:h-16
              sm:w-16
            "
          >
            <Search
              size={24}
              strokeWidth={2.2}
            />
          </div>

          <span
            className="
              text-4xl
              font-black
              leading-none
              tracking-[-0.08em]
              text-[#F1F2F5]
              sm:text-5xl
            "
          >
            01
          </span>
        </div>

        <div className="mt-7 sm:mt-8">
          <h3
            className="
              text-lg
              font-black
              tracking-[-0.025em]
              text-[#172033]
              sm:text-xl
            "
          >
            Choose a service
          </h3>

          <p
            className="
              mt-2
              max-w-[420px]
              text-sm
              leading-6
              text-[#8992A3]
            "
          >
            Tell us what you need. Browse services and find
            the right professional for your job.
          </p>
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-[#6366F1]
          "
        >
          Browse services
          <ArrowRight size={13} />
        </div>
      </div>

      {/* =================================================
          STEP 2
      ================================================= */}
      <div
        className="
          group
          relative
          rounded-[24px]
          border
          border-[#E5E7EB]
          bg-white
          p-5
          shadow-[0_8px_25px_rgba(15,23,42,0.04)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#D9D7FF]
          hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]
          sm:p-6
          lg:p-7
        "
      >
        <div className="flex items-start justify-between">
          <div
            className="
              relative
              z-10
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[18px]
              bg-[#F4EEFF]
              text-[#8B5CF6]
              shadow-[0_8px_20px_rgba(139,92,246,0.10)]
              transition-transform
              duration-300
              group-hover:scale-105
              sm:h-16
              sm:w-16
            "
          >
            <Clock3
              size={24}
              strokeWidth={2.2}
            />
          </div>

          <span
            className="
              text-4xl
              font-black
              leading-none
              tracking-[-0.08em]
              text-[#F1F2F5]
              sm:text-5xl
            "
          >
            02
          </span>
        </div>

        <div className="mt-7 sm:mt-8">
          <h3
            className="
              text-lg
              font-black
              tracking-[-0.025em]
              text-[#172033]
              sm:text-xl
            "
          >
            Pick a time
          </h3>

          <p
            className="
              mt-2
              max-w-[420px]
              text-sm
              leading-6
              text-[#8992A3]
            "
          >
            Select a convenient date and time. See pricing
            before confirming your booking.
          </p>
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-[#8B5CF6]
          "
        >
          Flexible scheduling
          <ArrowRight size={13} />
        </div>
      </div>

      {/* =================================================
          STEP 3
      ================================================= */}
      <div
        className="
          group
          relative
          rounded-[24px]
          border
          border-[#E5E7EB]
          bg-white
          p-5
          shadow-[0_8px_25px_rgba(15,23,42,0.04)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#D9D7FF]
          hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]
          sm:p-6
          lg:p-7
        "
      >
        <div className="flex items-start justify-between">
          <div
            className="
              relative
              z-10
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[18px]
              bg-[#ECF8F5]
              text-[#159A8C]
              shadow-[0_8px_20px_rgba(21,154,140,0.10)]
              transition-transform
              duration-300
              group-hover:scale-105
              sm:h-16
              sm:w-16
            "
          >
            <Check
              size={26}
              strokeWidth={2.5}
            />
          </div>

          <span
            className="
              text-4xl
              font-black
              leading-none
              tracking-[-0.08em]
              text-[#F1F2F5]
              sm:text-5xl
            "
          >
            03
          </span>
        </div>

        <div className="mt-7 sm:mt-8">
          <h3
            className="
              text-lg
              font-black
              tracking-[-0.025em]
              text-[#172033]
              sm:text-xl
            "
          >
            Relax, it&apos;s handled
          </h3>

          <p
            className="
              mt-2
              max-w-[420px]
              text-sm
              leading-6
              text-[#8992A3]
            "
          >
            Your professional arrives at the scheduled time
            and takes care of the job.
          </p>
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-[#159A8C]
          "
        >
          Job completed
          <ArrowRight size={13} />
        </div>
      </div>
    </div>

    {/* =====================================================
        ASSURANCE
    ===================================================== */}
    <div
      className="
        mt-4
        flex
        flex-col
        gap-4
        rounded-[22px]
        border
        border-[#E5E7EB]
        bg-[#F8F9FB]
        px-5
        py-4
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
        sm:py-5
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white
            text-[#6366F1]
            shadow-[0_5px_15px_rgba(15,23,42,0.06)]
          "
        >
          <ShieldCheck size={19} />
        </div>

        <div>
          <p className="text-sm font-bold text-[#172033]">
            Your booking is protected
          </p>

          <p className="mt-0.5 text-xs leading-5 text-[#8992A3]">
            Verified professionals and secure payments on every booking.
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          gap-1.5
          text-xs
          font-bold
          text-[#667085]
        "
      >
        <Star
          size={14}
          className="fill-[#6366F1] text-[#6366F1]"
        />

        Trusted by homeowners
      </div>
    </div>
  </div>
</section>
{/* =========================================================
    PART 4 — FEATURED TASKERS
========================================================= */}

<section
  id="taskers"
  className="
    mx-auto
    w-full
    max-w-[1780px]
    px-4
    py-16
    sm:px-6
    sm:py-20
    lg:px-8
    lg:py-4
  "
>
  {/* Heading */}
  <div
    className="
      mb-10
      flex
      flex-col
      gap-5
      sm:mb-12
      lg:flex-row
      lg:items-end
      lg:justify-between
    "
  >
    <div className="max-w-[650px]">
      <div
        className="
          mb-3
          flex
          items-center
          gap-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-[#6366F1]
        "
      >
        <span className="h-px w-6 bg-[#6366F1]" />
        Top Professionals
      </div>

      <h2
        className="
          text-3xl
          font-black
          tracking-[-0.045em]
          text-[#172033]
          sm:text-4xl
          lg:text-[2.8rem]
          lg:leading-[1.05]
        "
      >
        Meet the people
        <span className="text-[#6366F1]">
          {" "}behind the service.
        </span>
      </h2>

      <p
        className="
          mt-4
          max-w-[580px]
          text-sm
          leading-7
          text-[#667085]
          sm:text-base
        "
      >
        Skilled, verified and highly rated professionals
        ready to help with your next task.
      </p>
    </div>


  </div>

  {/* Tasker cards */}
  <div
    className="
      grid
      gap-4
      sm:grid-cols-2
      lg:grid-cols-4
    "
  >
    {[
      {
        name: "Arjun Sharma",
        role: "Plumbing Specialist",
        rating: "4.9",
        reviews: "128",
        jobs: "320+",
        location: "Chandigarh",
        price: "₹399",
        initials: "AS",
        avatar: "bg-[#EEF0FF] text-[#6366F1]",
      },
      {
        name: "Rahul Verma",
        role: "Electrical Expert",
        rating: "4.8",
        reviews: "96",
        jobs: "250+",
        location: "Mohali",
        price: "₹449",
        initials: "RV",
        avatar: "bg-[#FFF7E8] text-[#D99100]",
      },
      {
        name: "Manpreet Singh",
        role: "Car Service Expert",
        rating: "4.9",
        reviews: "174",
        jobs: "410+",
        location: "Panchkula",
        price: "₹499",
        initials: "MS",
        avatar: "bg-[#EDF6FF] text-[#3182CE]",
      },
      {
        name: "Karan Mehta",
        role: "AC Repair Specialist",
        rating: "5.0",
        reviews: "82",
        jobs: "190+",
        location: "Chandigarh",
        price: "₹399",
        initials: "KM",
        avatar: "bg-[#ECF9F7] text-[#159A8C]",
      },
    ].map((tasker) => (
      <article
        key={tasker.name}
        className="
          group
          overflow-hidden
          rounded-[24px]
          border
          border-[#E5E7EB]
          bg-white
          shadow-[0_8px_25px_rgba(15,23,42,0.04)]
          transition
          duration-300
          hover:-translate-y-1
          hover:border-[#D9D7FF]
          hover:shadow-[0_20px_45px_rgba(15,23,42,0.09)]
        "
      >
        {/* Profile area */}
        <div className="relative p-5">

          {/* Availability */}
          <div
            className="
              absolute
              right-5
              top-5
              flex
              items-center
              gap-1.5
              rounded-full
              bg-[#ECFDF3]
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-[#027A48]
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
            Available
          </div>

          {/* Avatar */}
          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[20px]
              text-lg
              font-black
              shadow-[0_8px_20px_rgba(15,23,42,0.06)]
              ${tasker.avatar}
            `}
          >
            {tasker.initials}
          </div>

          {/* Name */}
          <div className="mt-5">
            <div className="flex items-center gap-1.5">
              <h3
                className="
                  text-[16px]
                  font-black
                  tracking-[-0.02em]
                  text-[#172033]
                "
              >
                {tasker.name}
              </h3>

              <span
                className="
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-[#6366F1]
                  text-[9px]
                  font-black
                  text-white
                "
              >
                ✓
              </span>
            </div>

            <p
              className="
                mt-1
                text-xs
                font-medium
                text-[#8992A3]
              "
            >
              {tasker.role}
            </p>
          </div>

          {/* Rating */}
          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                items-center
                gap-1
                rounded-lg
                bg-[#FFF8E7]
                px-2
                py-1.5
                text-xs
                font-black
                text-[#B7791F]
              "
            >
              <Star
                size={12}
                className="fill-[#F5B942] text-[#F5B942]"
              />

              {tasker.rating}
            </div>

            <span className="text-xs text-[#98A2B3]">
              ({tasker.reviews} reviews)
            </span>
          </div>

          {/* Details */}
          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2
            "
          >
            <div
              className="
                rounded-xl
                bg-[#F8F9FB]
                px-3
                py-2.5
              "
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#98A2B3]">
                Completed
              </p>

              <p className="mt-1 text-xs font-black text-[#344054]">
                {tasker.jobs}
              </p>
            </div>

            <div
              className="
                rounded-xl
                bg-[#F8F9FB]
                px-3
                py-2.5
              "
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#98A2B3]">
                Location
              </p>

              <p className="mt-1 truncate text-xs font-black text-[#344054]">
                {tasker.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-[#EEF0F3]
            px-5
            py-4
          "
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#98A2B3]">
              Starting from
            </p>

            <p className="mt-0.5 text-sm font-black text-[#172033]">
              {tasker.price}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/book", {
                state: {
                  tasker: tasker.name,
                  service: tasker.role,
                  location: tasker.location,
                },
              })
            }
            className="
              flex
              items-center
              gap-1.5
              rounded-xl
              bg-[#172033]
              px-3.5
              py-2.5
              text-xs
              font-bold
              text-white
              transition
              hover:bg-[#6366F1]
            "
          >
            Book
            <ArrowRight size={13} />
          </button>
        </div>
      </article>
    ))}
  </div>

  {/* Verification banner */}
  <div
    className="
      mt-5
      flex
      flex-col
      gap-4
      rounded-[22px]
      border
      border-[#E5E7EB]
      bg-white
      px-5
      py-5
      shadow-[0_8px_25px_rgba(15,23,42,0.04)]
      sm:flex-row
      sm:items-center
      sm:justify-between
      sm:px-6
    "
  >
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#EEF0FF]
          text-[#6366F1]
        "
      >
        <ShieldCheck size={19} />
      </div>

      <div>
        <p className="text-sm font-bold text-[#172033]">
          Every Tasker is verified
        </p>

        <p className="mt-0.5 text-xs text-[#8992A3]">
          Identity checks, service verification and customer ratings.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {["AS", "RV", "MS", "KM"].map((initials, index) => (
          <div
            key={initials}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-[#EEF0FF]
              text-[9px]
              font-black
              text-[#6366F1]
            "
          >
            {initials}
          </div>
        ))}
      </div>

      <span className="ml-1 text-xs font-semibold text-[#667085]">
        10,000+ professionals
      </span>
    </div>
  </div>
</section>
{/* =========================================================
    PART 5 — TRUST & PLATFORM STATS
========================================================= */}

<section
  id="about"
  className="
    mx-auto
    w-full
    max-w-[1780px]
    px-4
    py-16
    sm:px-6
    sm:py-20
    lg:px-8
    lg:py-4
  "
>
  <div
    className="
      relative
      overflow-hidden
      rounded-[30px]
      bg-[#172033]
      px-5
      py-10
      shadow-[0_25px_70px_rgba(15,23,42,0.14)]
      sm:px-8
      sm:py-12
      lg:px-12
      lg:py-14
    "
  >
    {/* Decorative background */}
    <div
      className="
        pointer-events-none
        absolute
        -right-32
        -top-32
        h-80
        w-80
        rounded-full
        bg-[#6366F1]/20
        blur-3xl
      "
    />

    <div
      className="
        pointer-events-none
        absolute
        -bottom-40
        left-1/3
        h-80
        w-80
        rounded-full
        bg-[#8B5CF6]/10
        blur-3xl
      "
    />

    {/* Top content */}
    <div
      className="
        relative
        z-10
        grid
        gap-10
        lg:grid-cols-[1fr_1.2fr]
        lg:items-end
      "
    >
      {/* Heading */}
      <div>
        <div
          className="
            mb-3
            flex
            items-center
            gap-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-[#A5B4FC]
          "
        >
          <span className="h-px w-6 bg-[#A5B4FC]" />
          Why Taskiva
        </div>

        <h2
          className="
            max-w-[520px]
            text-3xl
            font-black
            leading-[1.05]
            tracking-[-0.045em]
            text-white
            sm:text-4xl
            lg:text-[2.8rem]
          "
        >
          Built around
          <span className="text-[#A5B4FC]">
            {" "}trust.
          </span>
          <br />
          Designed for real life.
        </h2>

        <p
          className="
            mt-4
            max-w-[500px]
            text-sm
            leading-7
            text-white/50
            sm:text-base
          "
        >
          Taskiva connects homeowners with skilled professionals
          through a simple, transparent and dependable booking
          experience.
        </p>
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-2
          overflow-hidden
          rounded-[22px]
          border
          border-white/10
          bg-white/[0.04]
          sm:grid-cols-4
        "
      >
        {/* Stat 1 */}
        <div
          className="
            border-b
            border-white/10
            p-5
            sm:border-b-0
            sm:border-r
          "
        >
          <div className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
            10K+
          </div>

          <p className="mt-1.5 text-[11px] font-medium text-white/40">
            Verified Taskers
          </p>
        </div>

        {/* Stat 2 */}
        <div
          className="
            border-b
            border-white/10
            p-5
            sm:border-b-0
            sm:border-r
          "
        >
          <div className="flex items-center gap-1 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
            4.9
            <Star
              size={17}
              className="fill-[#F5B942] text-[#F5B942]"
            />
          </div>

          <p className="mt-1.5 text-[11px] font-medium text-white/40">
            Average Rating
          </p>
        </div>

        {/* Stat 3 */}
        <div
          className="
            border-r
            border-white/10
            p-5
          "
        >
          <div className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
            50K+
          </div>

          <p className="mt-1.5 text-[11px] font-medium text-white/40">
            Jobs Completed
          </p>
        </div>

        {/* Stat 4 */}
        <div className="p-5">
          <div className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
            24/7
          </div>

          <p className="mt-1.5 text-[11px] font-medium text-white/40">
            Support
          </p>
        </div>
      </div>
    </div>

    {/* Feature row */}
    <div
      className="
        relative
        z-10
        mt-10
        grid
        gap-3
        border-t
        border-white/10
        pt-7
        sm:grid-cols-3
      "
    >
      {/* Feature 1 */}
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/[0.035]
          p-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#6366F1]/15
            text-[#A5B4FC]
          "
        >
          <ShieldCheck size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">
            Verified professionals
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/40">
            Professionals are reviewed before joining the platform.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/[0.035]
          p-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#6366F1]/15
            text-[#A5B4FC]
          "
        >
          <Clock3 size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">
            Reliable scheduling
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/40">
            Choose a time that works around your schedule.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/[0.035]
          p-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#6366F1]/15
            text-[#A5B4FC]
          "
        >
          <Check size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">
            Transparent experience
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/40">
            Clear service information before you confirm.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* =========================================================
    PART 6 — CUSTOMER STORIES
========================================================= */}

<section
  id="reviews"
  className="
    mx-auto
    w-full
    max-w-[1780px]
    px-4
    py-16
    sm:px-6
    sm:py-20
    lg:px-8
    lg:py-4
  "
>
  {/* Heading */}
  <div
    className="
      mb-10
      flex
      flex-col
      gap-5
      sm:mb-12
      lg:flex-row
      lg:items-end
      lg:justify-between
    "
  >
    <div className="max-w-[650px]">
      <div
        className="
          mb-3
          flex
          items-center
          gap-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-[#6366F1]
        "
      >
        <span className="h-px w-6 bg-[#6366F1]" />
        Customer Stories
      </div>

      <h2
        className="
          text-3xl
          font-black
          tracking-[-0.045em]
          text-[#172033]
          sm:text-4xl
          lg:text-[2.8rem]
          lg:leading-[1.05]
        "
      >
        Good service is
        <span className="text-[#6366F1]">
          {" "}worth talking about.
        </span>
      </h2>

      <p
        className="
          mt-4
          max-w-[580px]
          text-sm
          leading-7
          text-[#667085]
          sm:text-base
        "
      >
        See what homeowners have to say about their experience
        with Taskiva professionals.
      </p>
    </div>

    {/* Rating summary */}
    <div
      className="
        flex
        w-fit
        items-center
        gap-3
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        px-4
        py-3
        shadow-[0_6px_20px_rgba(15,23,42,0.04)]
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-[#FFF8E7]
        "
      >
        <Star
          size={19}
          className="fill-[#F5B942] text-[#F5B942]"
        />
      </div>

      <div>
        <div className="flex items-center gap-1">
          <span className="text-lg font-black text-[#172033]">
            4.9
          </span>

          <span className="text-xs text-[#98A2B3]">
            / 5
          </span>
        </div>

        <p className="text-[10px] font-medium text-[#8992A3]">
          Based on 12,000+ reviews
        </p>
      </div>
    </div>
  </div>

  {/* Reviews */}
  <div
    className="
      grid
      gap-4
      md:grid-cols-3
    "
  >
    {[
      {
        quote:
          "Booked a plumber in less than five minutes. He arrived exactly when promised and fixed the leak without any unnecessary work.",
        name: "Simran Kaur",
        location: "Chandigarh",
        service: "Plumbing",
        initials: "SK",
        avatar: "bg-[#EEF0FF] text-[#6366F1]",
      },
      {
        quote:
          "The entire experience felt surprisingly simple. I could see the service details, choose a time and know what to expect before booking.",
        name: "Aman Gupta",
        location: "Mohali",
        service: "AC Repair",
        initials: "AG",
        avatar: "bg-[#ECF9F7] text-[#159A8C]",
      },
      {
        quote:
          "I needed my car checked urgently. The tasker was professional, explained everything clearly and finished the job on time.",
        name: "Rohan Mehta",
        location: "Panchkula",
        service: "Car Repair",
        initials: "RM",
        avatar: "bg-[#FFF7E8] text-[#D99100]",
      },
    ].map((review, index) => (
      <article
        key={review.name}
        className="
          group
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-[#E5E7EB]
          bg-white
          p-6
          shadow-[0_8px_25px_rgba(15,23,42,0.04)]
          transition
          duration-300
          hover:-translate-y-1
          hover:border-[#D9D7FF]
          hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]
          sm:p-7
        "
      >
        {/* Quote mark */}
        <div
          className="
            absolute
            right-5
            top-3
            text-[72px]
            font-black
            leading-none
            tracking-[-0.1em]
            text-[#F1F2FF]
            transition
            duration-300
            group-hover:text-[#EAE9FF]
          "
        >
          &ldquo;
        </div>

        {/* Stars */}
        <div className="relative flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className="fill-[#F5B942] text-[#F5B942]"
            />
          ))}
        </div>

        {/* Quote */}
        <p
          className="
            relative
            mt-6
            min-h-[120px]
            text-[14px]
            font-medium
            leading-7
            text-[#475467]
          "
        >
          &ldquo;{review.quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-[#EEF0F3]" />

        {/* Customer */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                text-xs
                font-black
                ${review.avatar}
              `}
            >
              {review.initials}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-[#172033]">
                  {review.name}
                </h3>

                <span
                  className="
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-[#6366F1]
                    text-[9px]
                    font-black
                    text-white
                  "
                >
                  ✓
                </span>
              </div>

              <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                {review.location}
              </p>
            </div>
          </div>

          <span
            className="
              rounded-full
              bg-[#F8F9FB]
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              text-[#667085]
            "
          >
            {review.service}
          </span>
        </div>

        {/* Verified booking */}
        <div
          className="
            mt-5
            flex
            items-center
            gap-1.5
            text-[10px]
            font-semibold
            text-[#667085]
          "
        >
          <ShieldCheck
            size={13}
            className="text-[#6366F1]"
          />

          Verified booking
        </div>
      </article>
    ))}
  </div>

  {/* Bottom CTA */}
  <div
    className="
      mt-5
      flex
      flex-col
      gap-5
      rounded-[24px]
      border
      border-[#E5E7EB]
      bg-[#F8F9FB]
      px-5
      py-5
      sm:flex-row
      sm:items-center
      sm:justify-between
      sm:px-6
    "
  >
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {["SK", "AG", "RM"].map((initials) => (
          <div
            key={initials}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border-2
              border-[#F8F9FB]
              bg-white
              text-[9px]
              font-black
              text-[#6366F1]
              shadow-sm
            "
          >
            {initials}
          </div>
        ))}
      </div>

      <p className="text-xs font-medium text-[#667085]">
        Join thousands of homeowners using Taskiva.
      </p>
    </div>

    <Link
      to="/book"
      className="
        flex
        w-fit
        items-center
        gap-2
        rounded-xl
        bg-[#172033]
        px-4
        py-2.5
        text-xs
        font-bold
        text-white
        transition
        hover:bg-[#6366F1]
      "
    >
      Book your first service
      <ArrowRight size={14} />
    </Link>
  </div>
</section>
{/* =========================================================
    PART 7 — FINAL BOOKING CTA
========================================================= */}

<section
  className="
    mx-auto
    w-full
    max-w-[1780px]
    px-4
    pb-16
    pt-4
    sm:px-6
    sm:pb-20
    lg:px-8
    lg:pb-24
  "
>
  <div
    className="
      relative
      overflow-hidden
      rounded-[30px]
      border
      border-[#DDE1E8]
      bg-[#EEF0FF]
      px-6
      py-12
      shadow-[0_20px_60px_rgba(15,23,42,0.07)]
      sm:px-10
      sm:py-14
      lg:px-14
      lg:py-16
    "
  >
    {/* Decorative shapes */}
    <div
      className="
        pointer-events-none
        absolute
        -right-24
        -top-24
        h-72
        w-72
        rounded-full
        bg-[#6366F1]/10
        blur-3xl
      "
    />

    <div
      className="
        pointer-events-none
        absolute
        -bottom-32
        left-1/3
        h-64
        w-64
        rounded-full
        bg-[#8B5CF6]/10
        blur-3xl
      "
    />

    <div
      className="
        relative
        z-10
        grid
        gap-10
        lg:grid-cols-[1fr_auto]
        lg:items-center
      "
    >
      {/* Content */}
      <div className="max-w-[680px]">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#D8D8FF]
            bg-white/80
            px-3.5
            py-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.16em]
            text-[#6366F1]
            backdrop-blur-md
          "
        >
          <span className="h-2 w-2 rounded-full bg-[#6366F1]" />
          Ready when you are
        </div>

        <h2
          className="
            mt-6
            text-3xl
            font-black
            leading-[1.05]
            tracking-[-0.05em]
            text-[#172033]
            sm:text-4xl
            lg:text-[3.5rem]
          "
        >
          Got a job to do?
          <span className="block text-[#6366F1]">
            Let&apos;s get it done.
          </span>
        </h2>

        <p
          className="
            mt-5
            max-w-[570px]
            text-sm
            leading-7
            text-[#667085]
            sm:text-base
          "
        >
          Tell us what you need, choose a convenient time and
          let a trusted Taskiva professional handle the rest.
        </p>

        {/* Benefits */}
        <div
          className="
            mt-7
            flex
            flex-wrap
            gap-x-5
            gap-y-3
          "
        >
          {[
            "Verified professionals",
            "Transparent pricing",
            "Secure booking",
          ].map((item) => (
            <div
              key={item}
              className="
                flex
                items-center
                gap-2
                text-xs
                font-bold
                text-[#475467]
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#6366F1]
                  shadow-sm
                "
              >
                <Check size={11} strokeWidth={3} />
              </span>

              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA card */}
      <div
        className="
          w-full
          max-w-[360px]
          rounded-[24px]
          border
          border-white
          bg-white/90
          p-5
          shadow-[0_18px_45px_rgba(15,23,42,0.09)]
          backdrop-blur-xl
          lg:w-[340px]
        "
      >
        <div
          className="
            rounded-[18px]
            bg-[#F8F9FB]
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#EEF0FF]
                text-[#6366F1]
              "
            >
              <Search size={19} />
            </div>

            <div>
              <p className="text-sm font-black text-[#172033]">
                Find a professional
              </p>

              <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                Available near you
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/book"
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-[15px]
            bg-[#172033]
            px-5
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-[0_10px_25px_rgba(23,32,51,0.18)]
            transition
            hover:-translate-y-0.5
            hover:bg-[#6366F1]
          "
        >
          Book a Service
          <ArrowRight size={16} />
        </Link>

        <p className="mt-3 text-center text-[10px] font-medium text-[#98A2B3]">
          No commitment until you confirm
        </p>
      </div>
    </div>
  </div>
</section>
{/* =========================================================
    PART 8 — FOOTER
========================================================= */}

<footer
  className="
    mx-auto
    w-full
    max-w-[1780px]
    px-4
    pb-5
    sm:px-6
    lg:px-8
  "
>
  <div
    className="
      overflow-hidden
      rounded-[28px]
      border
      border-[#E5E7EB]
      bg-white
      shadow-[0_10px_35px_rgba(15,23,42,0.04)]
    "
  >
    {/* Main footer */}
    <div
      className="
        grid
        gap-10
        px-6
        py-10
        sm:px-8
        sm:py-12
        lg:grid-cols-[1.5fr_1fr_1fr_1fr]
        lg:gap-12
        lg:px-10
      "
    >
      {/* Brand */}
      <div className="max-w-[360px]">
        <Link
          to="/"
          className="inline-flex items-center gap-3"
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-[14px]
              bg-[#172033]
              text-lg
              font-black
              text-white
              shadow-[0_8px_20px_rgba(23,32,51,0.14)]
            "
          >
            T
          </div>

          <div>
            <div className="text-[18px] font-black tracking-[-0.03em] text-[#172033]">
              Taskiva
            </div>

            <div className="text-[9px] font-bold tracking-[0.13em] text-[#98A2B3]">
              HOME SERVICES
            </div>
          </div>
        </Link>

        <p
          className="
            mt-5
            max-w-[320px]
            text-sm
            leading-7
            text-[#667085]
          "
        >
          Making everyday home services simpler by connecting
          you with trusted professionals when you need them.
        </p>

        {/* Social */}
        <div className="mt-6 flex items-center gap-2.5">
          <a
            href="/"
            aria-label="Instagram"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#E5E7EB]
              bg-[#F8F9FB]
              text-xs
              font-black
              text-[#667085]
              transition
              hover:border-[#D9D7FF]
              hover:bg-[#EEF0FF]
              hover:text-[#6366F1]
            "
          >
            ig
          </a>

          <a
            href="/"
            aria-label="Facebook"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#E5E7EB]
              bg-[#F8F9FB]
              text-xs
              font-black
              text-[#667085]
              transition
              hover:border-[#D9D7FF]
              hover:bg-[#EEF0FF]
              hover:text-[#6366F1]
            "
          >
            f
          </a>

          <a
            href="/"
            aria-label="LinkedIn"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#E5E7EB]
              bg-[#F8F9FB]
              text-xs
              font-black
              text-[#667085]
              transition
              hover:border-[#D9D7FF]
              hover:bg-[#EEF0FF]
              hover:text-[#6366F1]
            "
          >
            in
          </a>

          <a
            href="/"
            aria-label="X"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#E5E7EB]
              bg-[#F8F9FB]
              text-xs
              font-black
              text-[#667085]
              transition
              hover:border-[#D9D7FF]
              hover:bg-[#EEF0FF]
              hover:text-[#6366F1]
            "
          >
            𝕏
          </a>
        </div>
      </div>

      {/* For Customers */}
      <div>
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.14em]
            text-[#172033]
          "
        >
          For Customers
        </h3>

        <ul className="mt-5 space-y-3">
          <li>
            <Link
              to="/services"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Browse Services
            </Link>
          </li>

          <li>
            <Link
              to="/book"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Book a Service
            </Link>
          </li>

          <li>
            <Link
              to="/client-dashboard"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              My Bookings
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              My Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* For Taskers */}
      <div>
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.14em]
            text-[#172033]
          "
        >
          For Taskers
        </h3>

        <ul className="mt-5 space-y-3">
          <li>
            <Link
              to="/signup"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Become a Tasker
            </Link>
          </li>

          <li>
            <Link
              to="/tasker-dashboard"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Tasker Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/tasker-dashboard/jobs"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Find Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/tasker-dashboard/earnings"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Earnings
            </Link>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.14em]
            text-[#172033]
          "
        >
          Support
        </h3>

        <ul className="mt-5 space-y-3">
          <li>
            <a
              href="/"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Help Center
            </a>
          </li>

          <li>
            <a
              href="/"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Contact Us
            </a>
          </li>

          <li>
            <a
              href="/"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Safety Center
            </a>
          </li>

          <li>
            <a
              href="/"
              className="
                text-sm
                font-medium
                text-[#667085]
                transition
                hover:text-[#6366F1]
              "
            >
              Terms & Privacy
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom CTA */}
    <div
      className="
        mx-5
        rounded-[20px]
        bg-[#F8F9FB]
        px-5
        py-5
        sm:mx-8
        sm:flex
        sm:items-center
        sm:justify-between
        sm:px-6
        lg:mx-10
      "
    >
      <div>
        <p className="text-sm font-black text-[#172033]">
          Need help with something?
        </p>

        <p className="mt-1 text-xs text-[#8992A3]">
          Our support team is here whenever you need us.
        </p>
      </div>

      <Link
        to="/support"
        className="
          mt-4
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          bg-white
          px-4
          py-2.5
          text-xs
          font-bold
          text-[#172033]
          shadow-[0_5px_16px_rgba(15,23,42,0.06)]
          transition
          hover:text-[#6366F1]
          sm:mt-0
        "
      >
        Visit Help Center
        <ArrowRight size={14} />
      </Link>
    </div>

    {/* Copyright */}
    <div
      className="
        mx-5
        mt-5
        flex
        flex-col
        gap-3
        border-t
        border-[#EEF0F3]
        px-0
        py-5
        text-[10px]
        font-medium
        text-[#98A2B3]
        sm:mx-8
        sm:flex-row
        sm:items-center
        sm:justify-between
        lg:mx-10
      "
    >
      <p>
        © {new Date().getFullYear()} Taskiva. All rights reserved.
      </p>

      <div className="flex items-center gap-4">
        <a
          href="/"
          className="transition hover:text-[#6366F1]"
        >
          Privacy
        </a>

        <a
          href="/"
          className="transition hover:text-[#6366F1]"
        >
          Terms
        </a>

        <a
          href="/"
          className="transition hover:text-[#6366F1]"
        >
          Cookies
        </a>
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}