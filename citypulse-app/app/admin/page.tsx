import { AdminShell } from "@/components/admin-shell";
import { StatusPill } from "@/components/status-pill";
import { incidentFeed } from "@/lib/site-data";

export default function AdminPage() {
  return (
    <AdminShell
      activeHref="/admin"
      title="Admin Quan tri"
      subtitle="Review, assign, and process incidents with quick moderation actions and ownership tracking."
    >
      <section className="panel rounded-3xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="headline text-2xl font-bold">Incident Queue</h2>
          <div className="flex gap-2">
            {["Approve", "Reject", "Assign Team"].map((action) => (
              <button
                key={action}
                type="button"
                className="rounded-xl border border-outline-variant/35 bg-surface-high px-4 py-2 text-sm font-medium hover:border-primary/70"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.14em] text-text-secondary">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">District</th>
                <th className="px-3 py-2">Votes</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {incidentFeed.map((incident) => (
                <tr key={incident.id} className="border-t border-outline-variant/25">
                  <td className="px-3 py-3">{incident.id}</td>
                  <td className="px-3 py-3">{incident.title}</td>
                  <td className="px-3 py-3">{incident.district}</td>
                  <td className="px-3 py-3">{incident.upvotes}</td>
                  <td className="px-3 py-3">
                    <StatusPill tone={incident.status}>{incident.status.replace("_", " ")}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
