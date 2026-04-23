export function StatusPill({
  children,
  tone = "reported",
}: {
  children: React.ReactNode;
  tone?: "reported" | "confirmed" | "in_progress" | "resolved" | "rejected";
}) {
  const classes = {
    reported: "bg-[rgba(255,113,98,0.16)] text-tertiary",
    confirmed: "bg-[rgba(254,203,0,0.16)] text-secondary",
    in_progress: "bg-[rgba(133,173,255,0.18)] text-primary",
    resolved: "bg-[rgba(16,185,129,0.16)] text-success",
    rejected: "bg-[rgba(118,117,117,0.24)] text-text-secondary",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${classes[tone]}`}
    >
      {children}
    </span>
  );
}
