import type { HTMLAttributes } from "react"

export function Badge({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full",
        "border border-[var(--border)]",
        "bg-[var(--surface-hover)]",
        "px-2.5 py-1",
        "text-xs font-medium",
        "text-[var(--text-secondary)]",
        className,
      ].join(" ")}
      {...props}
    />
  )
}
