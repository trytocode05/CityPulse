import Link from "next/link";
import { Brand } from "@/components/brand";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="panel w-full max-w-lg rounded-3xl p-6">
        <Brand />
        <h1 className="headline mt-5 text-3xl font-bold">Dang ky tai khoan</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Join CityPulse to report and track urban incidents in your district.
        </p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          <input className="rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2 sm:col-span-2" placeholder="Full name" />
          <input className="rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2" placeholder="Email" />
          <input className="rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2" placeholder="Phone" />
          <input type="password" className="rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2" placeholder="Password" />
          <input type="password" className="rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2" placeholder="Confirm password" />
          <button className="rounded-xl bg-linear-to-r from-primary to-primary-dim px-4 py-3 font-semibold text-[#00183f] sm:col-span-2" type="button">
            Create account
          </button>
        </form>
        <p className="mt-4 text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
