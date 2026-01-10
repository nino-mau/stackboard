/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test'
      readonly DATABASE_URL: string
      readonly DATABASE_LOCAL_URL: string
      readonly GITHUB_CLIENT_ID: string
      readonly GITHUB_CLIENT_SECRET: string
    }
  }
}

export {}
