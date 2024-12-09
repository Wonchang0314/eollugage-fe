declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_URL: string
    NEXT_PUBLIC_PRESIGNED_URL_SERVER: string
    NEXT_PUBLIC_SECRET_KEY: string
    NEXT_PUBLIC_APP_ID: string
    NEXT_PUBLIC_SHA_256: string
  }
}
