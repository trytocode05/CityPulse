import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import { StudentShell } from "@/components/student-shell";
import { incidentFeed } from "@/lib/site-data";

export default function MyReportsPage() {
  return (
    <StudentShell
      activeHref="/my-reports"
      title="Su co cua toi"
      subtitle="Track your submissions, inspect status progression, and jump back into each incident thread."
    >
      <section className="panel rounded-3xl p-5">
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Resolved", "Rejected"].map((tab) => (
            <button
              key={tab}
              type="button"
              className="rounded-full border border-outline-variant/35 bg-surface-high px-4 py-2 text-sm text-text-secondary transition hover:border-primary/70 hover:text-foreground"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-5 space-y-3">
          {incidentFeed.map((incident) => (
            <article
              key={incident.id}
              className="rounded-2xl border border-outline-variant/35 bg-surface-high p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
                    {incident.id} • {incident.category} • {incident.district}
                  </p>
                  <h3 className="mt-1 font-semibold">{incident.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {incident.upvotes} upvotes • {incident.comments} comments • {incident.reportedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill tone={incident.status}>{incident.status.replace("_", " ")}</StatusPill>
                  <Link
                    href={`/incidents/${incident.id}`}
                    className="rounded-lg border border-outline-variant/40 px-3 py-2 text-sm font-medium hover:border-primary/70"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}
