import { atom } from 'recoil'
const settingsAtom = atom({
  key: 'settings',
  default: {
    isDarkTheme: true,
    startCalcOnLoad: false,
    separateChar: '.',
    forceType: 'date',
    forceNumber: '0',
    forceDateDelay: 75,
    highlightNumber: true,
    dateFormat: 'dMMHHmm',
    pressTriggerButtons: false,
    screenOrientation: 'auto',
    forceCryptotext: 'Force',
    highlightNumberIntensity: 'normal',
    theme: 'standart',
    language: 'en',
    licenseCode: undefined,
    licenseUserName: undefined,
    licenseExpiredDate: undefined,
  },
})

export default settingsAtom
