import { atomFamily } from 'recoil'
const pressedButtonAtomFamily = atomFamily({
  key: 'pressedButton',
  default: false,
})

export default pressedButtonAtomFamily
