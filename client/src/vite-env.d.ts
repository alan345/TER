/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BACKEND: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
