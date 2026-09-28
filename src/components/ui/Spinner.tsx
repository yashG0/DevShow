import { LoaderCircle } from "lucide-react"

type SpinnerSize = "sm" | "md" | "lg"

type SpinnerProps = {
  size?: SpinnerSize
  className?: string
}

const sizes: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
}

export function Spinner({
  size = "md",
  className = "",
}: SpinnerProps) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={[
        "animate-spin",
        "text-current",
        sizes[size],
        className,
      ].join(" ")}
    />
  )
}
