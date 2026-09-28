import {
  CheckCircle2,
  CircleAlert,
  Info,
  X,
} from "lucide-react"
import type { ReactNode } from "react"

export type ToastVariant =
  | "success"
  | "error"
  | "info"

type ToastProps = {
  variant?: ToastVariant
  title: string
  message?: string
  onClose?: () => void
}

const icons: Record<
  ToastVariant,
  ReactNode
> = {
  success: <CheckCircle2 size={18} />,
  error: <CircleAlert size={18} />,
  info: <Info size={18} />,
}

export function Toast({
  variant = "info",
  title,
  message,
  onClose,
}: ToastProps) {
  return (
    <div
      role="status"
      className={[
        "flex w-full max-w-sm gap-3",
        "rounded-[var(--radius-lg)]",
        "border border-[var(--border)]",
        "bg-[var(--surface)]",
        "p-4",
        "shadow-[var(--shadow-md)]",
      ].join(" ")}
    >
      <div
        className={[
          "mt-0.5 shrink-0",
          variant === "success"
            ? "text-[var(--success)]"
            : "",
          variant === "error"
            ? "text-[var(--danger)]"
            : "",
          variant === "info"
            ? "text-[var(--accent)]"
            : "",
        ].join(" ")}
      >
        {icons[variant]}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {title}
        </p>

        {message && (
          <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className={[
            "shrink-0 rounded-[var(--radius-sm)]",
            "p-1",
            "text-[var(--text-muted)]",
            "transition-colors",
            "hover:bg-[var(--surface-hover)]",
            "hover:text-[var(--text-primary)]",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-[var(--accent)]/30",
          ].join(" ")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
