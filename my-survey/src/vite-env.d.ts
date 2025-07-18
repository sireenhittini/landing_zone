/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL_TO: string;
  // add more env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
