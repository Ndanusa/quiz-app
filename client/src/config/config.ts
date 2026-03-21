const fallbackUrl = "http://localhost:9090";

const backendUri = import.meta.env.VITE_BACKEND_URI || fallbackUrl;

if (!import.meta.env.VITE_BACKEND_URI) {
  console.warn("VITE_BACKEND_URI not defined, using fallback: " + fallbackUrl);
}

export const BACKEND_URI = backendUri;

export function getGreeting(): string {
  const hour = new Date().getHours();

  let greeting: string;

  if (hour >= 0 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17 && hour < 24) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return greeting;
}
