
export function isProduction(): boolean {
  return import.meta.env.PROD;
}
 
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}
 
export function getRedirectUri(): string {
  return import.meta.env.VITE_REDIRECT_URI ?? window.location.origin;
}