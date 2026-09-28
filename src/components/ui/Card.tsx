import type { HTMLAttributes } from "react"

export function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "rounded-[var(--radius-xl)]",
        "border border-[var(--border)]",
        "bg-[var(--surface)]",
        "shadow-[var(--shadow-sm)]",
        className,
      ].join(" ")}
      {...props}
    />
  )
}
