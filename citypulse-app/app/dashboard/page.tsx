import { StudentShell } from "@/components/student-shell";
import { categoryBreakdown, dashboardCards, trendSeries } from "@/lib/site-data";

export default function DashboardPage() {
  const trendMax = Math.max(...trendSeries.map((item) => item.incidents));

  return (
    <StudentShell
      activeHref="/dashboard"
      title="Dashboard Thong Ke"
      subtitle="Operations analytics for category distribution, incident velocity, and district-level resolution performance."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <article key={card.label} className="panel rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">{card.label}</p>
            <p className="headline mt-2 text-3xl font-bold">{card.value}</p>
            <p className="mt-2 text-sm text-text-secondary">{card.trend}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-12">
        <article className="panel rounded-3xl p-6 lg:col-span-8">
          <h2 className="headline text-2xl font-bold">Incident Trend (7 days)</h2>
          <div className="mt-6 flex h-72 items-end gap-3 rounded-2xl bg-surface-high p-4">
            {trendSeries.map((point) => (
              <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-linear-to-t from-primary-dim to-primary"
                  style={{
                    height: `${Math.max(18, (point.incidents / trendMax) * 180)}px`,
                  }}
                />
                <p className="text-xs text-text-secondary">{point.day}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel rounded-3xl p-6 lg:col-span-4">
          <h2 className="headline text-2xl font-bold">Category Mix</h2>
          <div className="mt-5 space-y-4">
            {categoryBreakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-text-secondary">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-highest">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel rounded-3xl p-6">
        <h2 className="headline text-2xl font-bold">Area Heatmap Summary</h2>
        <p className="mt-2 text-text-secondary">
          District 1, District 3, and Thu Duc continue to be top hotspots for high-severity
          reports. Resource allocation has been shifted to evening hours based on peak submissions.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ["District 1", "52 open cases", "High density in central wards"],
            ["District 3", "37 open cases", "Road repairs in-progress"],
            ["Thu Duc", "61 open cases", "Flooding cluster after rainfall"],
          ].map(([name, value, note]) => (
            <div key={name} className="rounded-2xl border border-outline-variant/35 bg-surface-high p-4">
              <p className="font-semibold text-foreground">{name}</p>
              <p className="headline mt-2 text-2xl">{value}</p>
              <p className="mt-2 text-sm text-text-secondary">{note}</p>
            </div>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}
