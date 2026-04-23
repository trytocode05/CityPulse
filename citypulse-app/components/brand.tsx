import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dim text-sm font-black text-[#00173d]">
        CP
      </div>
      <div className={compact ? "hidden sm:block" : ""}>
        <p className="headline text-lg font-extrabold tracking-tight text-foreground">
          CityPulse
        </p>
        <p className="text-xs uppercase tracking-[0.24em] text-text-secondary">
          City Incident Platform
        </p>
      </div>
    </Link>
  );
}
