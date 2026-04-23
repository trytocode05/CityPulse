import Link from "next/link";
import { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { primaryNav } from "@/lib/site-data";

export function StudentShell({
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
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-outline-variant/35 bg-[rgba(14,14,14,0.85)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <Brand compact />
          <nav className="hidden items-center gap-7 md:flex">
            {primaryNav.map((item) => {
              const active = activeHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "border-b-2 border-primary pb-1 text-sm font-bold text-primary"
                      : "text-sm font-medium text-text-secondary transition-colors hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-foreground">Citizen User</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">
                District 1
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-low text-sm font-bold text-primary">
              CU
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 lg:px-8">
        <section className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-secondary">
            Duplicate of City Incident Platform
          </p>
          <h1 className="headline text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-text-secondary">{subtitle}</p>
        </section>
        {children}
      </main>
    </div>
  );
}
