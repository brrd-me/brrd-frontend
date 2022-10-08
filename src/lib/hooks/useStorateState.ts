import { useEffect, useState } from "react"

interface Config<T> {
  mockState: Partial<T>
}

const DEFAULT_RAW_STATE = "{}"
const useStorageState = <T>(
  storeKey: string,
  defaultState: T,
  config?: Config<T>
) => {
  const [state, setState] = useState({ ...defaultState, ...config?.mockState })

  const getRawCurrentState = () =>
    localStorage.getItem(storeKey) || DEFAULT_RAW_STATE

  function updateState(newState: Partial<T>) {
    const state = {
      ...JSON.parse(getRawCurrentState()),
      ...newState,
    }
    /**
     * @TODO
     * Validate to JSON encode only if typeof state is an object
     */
    localStorage.setItem(storeKey, JSON.stringify(state))
    setState(state)
  }

  useEffect(() => {
    const rawCurrentState = getRawCurrentState()
    const isStorageEmpty = rawCurrentState === DEFAULT_RAW_STATE
    updateState(isStorageEmpty ? defaultState : JSON.parse(rawCurrentState))
  }, [])

  return [state, updateState] as const
}

export default useStorageState
