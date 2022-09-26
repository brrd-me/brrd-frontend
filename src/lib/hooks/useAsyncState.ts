import { useState } from "react"

function useAsyncState<T>(initState: T) {
  const [state, setState] = useState(initState as T)
  const resetState = () => setState(initState)
  const asyncSetter = (newState: Partial<T>) =>
    setState((prevState) => ({ ...prevState, ...newState }))
  return [state, asyncSetter, resetState] as const
}

export default useAsyncState
