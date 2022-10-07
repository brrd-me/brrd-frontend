declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_HH_DEV_URL: string
  }
}

interface IEmail {
  time: number
  message: string
  subject: string
  address: string
}
