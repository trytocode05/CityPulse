import { StatusPill } from "@/components/status-pill";
import { StudentShell } from "@/components/student-shell";
import { incidentFeed, statusTimeline } from "@/lib/site-data";

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const incident = incidentFeed.find((item) => item.id === id) ?? incidentFeed[0];

  return (
    <StudentShell
      activeHref="/my-reports"
      title="Chi tiet su co"
      subtitle="Review the full issue context, timeline, and community confirmations before resolution."
    >
      <section className="grid gap-5 lg:grid-cols-12">
        <article className="panel rounded-3xl p-6 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
                {incident.id} • {incident.category}
              </p>
              <h2 className="headline mt-1 text-3xl font-bold">{incident.title}</h2>
            </div>
            <StatusPill tone={incident.status}>{incident.status.replace("_", " ")}</StatusPill>
          </div>
          <div className="mt-5 h-64 rounded-2xl bg-[linear-gradient(130deg,#1f1f1f,#121212)]" />
          <p className="mt-4 text-text-secondary">
            {incident.address} • Reporter: {incident.reporter} • {incident.reportedAt}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button className="rounded-xl bg-[rgba(133,173,255,0.18)] px-4 py-3 font-semibold text-primary">
              Upvote ({incident.upvotes})
            </button>
            <button className="rounded-xl bg-[rgba(254,203,0,0.16)] px-4 py-3 font-semibold text-secondary">
              Confirm
            </button>
            <button className="rounded-xl bg-[rgba(255,113,98,0.16)] px-4 py-3 font-semibold text-tertiary">
              Report Fake
            </button>
          </div>
        </article>

        <aside className="space-y-5 lg:col-span-4">
          <article className="panel rounded-3xl p-5">
            <h3 className="headline text-xl font-bold">Status Timeline</h3>
            <div className="mt-4 space-y-4">
              {statusTimeline.map((step) => (
                <div key={step.title} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-xs text-text-secondary">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="panel rounded-3xl p-5">
            <h3 className="headline text-xl font-bold">Comments</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-surface-high p-3">
                <p className="font-medium">District Ops Team</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Team assigned and expected on-site before 17:00.
                </p>
              </div>
              <div className="rounded-xl bg-surface-high p-3">
                <p className="font-medium">Local Resident</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Hazard is still severe for motorbikes during rain.
                </p>
              </div>
            </div>
          </article>
        </aside>
      </section>
    </StudentShell>
  );
}
