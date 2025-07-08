export function isDevelopment() {
  return import.meta.env.DEV === true;
}
export function isProduction() {
  return import.meta.env.PROD === true;
}
