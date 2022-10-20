declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_HH_DEV_URL: string
    NEXT_PUBLIC_SERVER_PUBLIC: string
    SERVER_PRIVATE: string
  }
}

interface IEmail {
  message: string
  subject: string
  address: string
  timestamp: number
}

interface ISerializedEmail extends IEmail {
  serialized: string
}
