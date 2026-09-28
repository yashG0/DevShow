import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          "w-full rounded-[var(--radius-md)]",
          "border border-[var(--border)]",
          "bg-[var(--surface)]",
          "px-3.5 py-2.5",
          "text-[var(--text-primary)]",
          "placeholder:text-[var(--text-muted)]",
          "outline-none",
          "transition",
          "focus:border-[var(--accent)]",
          "focus:ring-2",
          "focus:ring-[var(--accent)]/20",
          className,
        ].join(" ")}
        {...props}
      />

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
}
