const fallbackUrl = "http://localhost:9090";

const backendUri = import.meta.env.VITE_BACKEND_URI || fallbackUrl;

if (!import.meta.env.VITE_BACKEND_URI) {
  console.warn("VITE_BACKEND_URI not defined, using fallback: " + fallbackUrl);
}

export const BACKEND_URI = backendUri;
