export const config = {
  apiBaseUrl: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8081',
  isDevelopment: (import.meta as any).env?.DEV ?? true,
  isProduction: (import.meta as any).env?.PROD ?? false,
} as const;

