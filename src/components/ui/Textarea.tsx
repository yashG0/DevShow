import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={[
          "min-h-32 w-full resize-y rounded-[var(--radius-md)]",
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
