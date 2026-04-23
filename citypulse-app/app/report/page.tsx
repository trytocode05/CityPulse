import { StudentShell } from "@/components/student-shell";

const categories = ["Pothole", "Flood", "Garbage", "Broken Infra", "Traffic", "Pollution", "Other"];
const severities = ["Low", "Medium", "High", "Critical"];

export default function ReportPage() {
  return (
    <StudentShell
      activeHref="/report"
      title="Bao cao su co"
      subtitle="Upload evidence, let AI pre-classify the issue, and submit it with location and severity in one flow."
    >
      <section className="grid gap-5 lg:grid-cols-12">
        <article className="panel rounded-3xl p-6 lg:col-span-7">
          <h2 className="headline text-2xl font-bold">Upload & AI Classification</h2>
          <div className="mt-4 rounded-2xl border border-dashed border-outline-variant/55 bg-surface-high p-8 text-center">
            <p className="headline text-xl text-foreground">Drag image here or open camera</p>
            <p className="mt-2 text-sm text-text-secondary">JPG/PNG, maximum 5 files, 5MB each</p>
            <div className="mt-4 inline-flex rounded-full bg-[rgba(133,173,255,0.18)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              AI: Pothole (87%)
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">Category</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-xl border border-outline-variant/40 bg-surface-high px-3 py-2 text-left text-sm transition hover:border-primary/70"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </article>

        <article className="panel rounded-3xl p-6 lg:col-span-5">
          <h2 className="headline text-2xl font-bold">Incident Details</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-text-secondary">Title</label>
              <input
                className="mt-2 w-full rounded-xl border border-outline-variant/40 bg-surface-high px-3 py-2"
                defaultValue="Deep pothole on school route"
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary">Description</label>
              <textarea
                rows={4}
                className="mt-2 w-full rounded-xl border border-outline-variant/40 bg-surface-high px-3 py-2"
                defaultValue="Large pothole near crossing. Risky for bikes and school buses."
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary">Severity</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {severities.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className="rounded-xl border border-outline-variant/40 bg-surface-high px-3 py-2 text-sm"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-surface-high p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">Location picker</p>
              <p className="mt-2 text-sm">Vo Van Tan St, Ward 5, District 3</p>
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-linear-to-r from-primary to-primary-dim px-4 py-3 font-semibold text-[#00183f]"
            >
              Gui bao cao
            </button>
          </form>
        </article>
      </section>
    </StudentShell>
  );
}
