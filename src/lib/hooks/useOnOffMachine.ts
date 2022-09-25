import { useState } from "react"

function useOnOffMachine(initialState: boolean = false) {
  const [isOn, setIsOn] = useState(initialState)
  const turnOn = () => setIsOn(true)
  const turnOff = () => setIsOn(false)
  return {
    turnOn,
    turnOff,
    isOn,
    isOff: !isOn,
  }
}

export default useOnOffMachine
