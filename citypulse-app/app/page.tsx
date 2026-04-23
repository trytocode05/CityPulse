"use client";

import Link from "next/link";
import { AnimatedHeading } from "@/components/landing/AnimatedHeading";
import { FadeIn } from "@/components/landing/FadeIn";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

const NAV_LINKS = ["Story", "Investing", "Building", "Advisory"];

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* ── Video Background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── Content Layer ── */}
      <div className="relative z-10 flex h-full flex-col">
        {/* ── Navbar ── */}
        <nav className="px-6 pt-6 md:px-12 lg:px-16">
          <div className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
            {/* Logo */}
            <span className="text-2xl font-semibold tracking-tight">VEX</span>

            {/* Center links — hidden on mobile */}
            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-white transition-colors duration-200 hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-100"
            >
              Start a Chat
            </Link>
          </div>
        </nav>

        {/* ── Hero Content (pushed to bottom) ── */}
        <div className="flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left Column — Main content */}
            <div>
              <AnimatedHeading
                text={"Shaping tomorrow\nwith vision and action."}
                className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
                initialDelay={200}
                charDelay={30}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="mb-5 text-base text-gray-300 md:text-lg">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
                  >
                    Start a Chat
                  </Link>
                  <button
                    type="button"
                    className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-all duration-200 hover:bg-white hover:text-black"
                  >
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column — Tag */}
            <FadeIn
              delay={1400}
              duration={1000}
              className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end"
            >
              <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                <span className="text-lg font-light md:text-xl lg:text-2xl">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
