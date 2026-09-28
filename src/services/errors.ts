import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "object" && item !== null && "msg" in item) {
          return String(item.msg);
        }

        return "Invalid request.";
      })
      .join(", ");
  }

  if (error.response?.status === 401) {
    return "Invalid email or password.";
  }

  if (error.response?.status === 409) {
    return "This email or username is already in use.";
  }

  return fallback;
}
