import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react"

type openMessageWithContent = (props: {
  body: string
  subject: string
  sendingTo: string
  reply: string
}) => void

type ContextProps = {
  openMessageWithContent: openMessageWithContent
  __defineOpenMessageWithContent(fn: openMessageWithContent): void
}

const Context = createContext({} as ContextProps)
export const useSendMessageContext = () => useContext(Context)
export const Provider = function SendMessageProvider({
  children,
}: PropsWithChildren) {
  const mutableStore = useRef({} as ContextProps)
  return (
    <Context.Provider
      value={{
        openMessageWithContent(props) {
          mutableStore.current.openMessageWithContent(props)
        },
        __defineOpenMessageWithContent(fn) {
          mutableStore.current.openMessageWithContent = fn
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
