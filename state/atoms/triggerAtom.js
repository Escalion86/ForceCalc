import { atom } from 'recoil'
const triggerAtom = atom({
  key: 'trigger', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export default triggerAtom
