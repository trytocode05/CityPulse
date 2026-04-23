import Link from "next/link";
import { Brand } from "@/components/brand";
import { authHighlights } from "@/lib/site-data";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden border-r border-outline-variant/35 p-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <Brand />
          <p className="mt-8 max-w-md text-text-secondary">
            Sign in to monitor civic incidents, receive updates, and coordinate faster resolutions.
          </p>
        </div>
        <ul className="space-y-3">
          {authHighlights.map((item) => (
            <li key={item} className="rounded-xl bg-surface-high p-4 text-sm text-text-secondary">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="grid place-items-center p-6">
        <div className="panel w-full max-w-md rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">Welcome back</p>
          <h1 className="headline mt-2 text-3xl font-bold">Dang nhap</h1>
          <form className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2" placeholder="Email" />
            <input type="password" className="w-full rounded-xl border border-outline-variant/35 bg-surface-high px-3 py-2" placeholder="Password" />
            <button className="w-full rounded-xl bg-linear-to-r from-primary to-primary-dim px-4 py-3 font-semibold text-[#00183f]" type="button">
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-text-secondary">
            New here?{" "}
            <Link href="/register" className="font-semibold text-primary">
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
