/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to any truthy value to enable MSW mocking outside dev mode */
  readonly VITE_MSW?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
