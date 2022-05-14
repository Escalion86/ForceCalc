import { atom } from 'recoil'
const neededTriggeredButtonAtom = atom({
  key: 'neededTriggeredButton', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})

export default neededTriggeredButtonAtom
