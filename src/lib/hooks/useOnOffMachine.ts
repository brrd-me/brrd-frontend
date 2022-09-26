import { useState } from "react"

function useOnOffMachine(isOnByDefault: boolean = false) {
  const [isOn, setIsOn] = useState(isOnByDefault)
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
