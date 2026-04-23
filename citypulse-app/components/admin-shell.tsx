import Link from "next/link";
import { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { adminNav, primaryNav } from "@/lib/site-data";

export function AdminShell({
  title,
  subtitle,
  activeHref,
  children,
}: {
  title: string;
  subtitle: string;
  activeHref: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-72 shrink-0 border-r border-outline-variant/35 bg-[rgba(19,19,19,0.9)] p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="mb-8">
          <Brand />
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-text-secondary">
            Operations Suite
          </p>
        </div>
        <nav className="space-y-2">
          {adminNav.map((item) => {
            const active = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "flex items-center rounded-xl bg-surface-high px-4 py-3 text-sm font-bold text-foreground"
                    : "flex items-center rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-surface-high hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-10 border-t border-outline-variant/35 pt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-text-secondary">
            Student Views
          </p>
          <div className="space-y-2">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-surface-high hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-30 border-b border-outline-variant/35 bg-[rgba(14,14,14,0.88)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
            <Brand compact />
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-foreground">Operations Lead</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">
                  City Admin
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-low text-sm font-bold text-primary">
                OL
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 lg:px-8">
          <section className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-secondary">
              Operations Control
            </p>
            <h1 className="headline text-4xl font-extrabold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-text-secondary">{subtitle}</p>
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
