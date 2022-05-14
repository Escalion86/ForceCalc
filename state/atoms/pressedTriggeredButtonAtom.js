import { atom } from 'recoil'
const pressedTriggeredButtonAtom = atom({
  key: 'pressedTriggeredButton', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})

export default pressedTriggeredButtonAtom
