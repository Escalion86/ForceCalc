import { atomFamily } from 'recoil'
const pressedButtonAtomFamily = atomFamily({
  key: 'pressedButton', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export default pressedButtonAtomFamily
