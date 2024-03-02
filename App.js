import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RecoilRoot, useRecoilState } from 'recoil'

import { StyleSheet } from 'react-native'

import Settings from './Settings'
import Calc from './Calc'
import About from './About'
import LicenseScreen from './License'

import * as ScreenOrientation from 'expo-screen-orientation'
import getDataCode from './helpers/getDataCode'
import settingsAtom from './state/atoms/settingsAtom'

async function loadApplication() {
  await Font.loadAsync({
    'helvetica-black': require('./assets/fonts/HelveticaBlack.ttf'),
    'helvetica-bold': require('./assets/fonts/HelveticaBold.ttf'),
    'helvetica-heavy': require('./assets/fonts/HelveticaHeavy.ttf'),
    'helvetica-italic': require('./assets/fonts/HelveticaItalic.ttf'),
    'helvetica-light': require('./assets/fonts/HelveticaLight.ttf'),
    'helvetica-medium': require('./assets/fonts/HelveticaMedium.ttf'),
    'helvetica-regular': require('./assets/fonts/HelveticaRegular.ttf'),
    'helvetica-thin': require('./assets/fonts/HelveticaThin.ttf'),
    'sf-ultralight': require('./assets/fonts/HelveticaUltraLight.ttf'),
    'sf-bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
    'sf-semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
    'sf-light': require('./assets/fonts/SF-Pro-Display-Light.otf'),
    'sf-medium': require('./assets/fonts/SF-Pro-Display-Medium.otf'),
    'sf-regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'sf-thin': require('./assets/fonts/SF-Pro-Display-Thin.otf'),
    cryptext: require('./assets/fonts/Cryptext-ru.ttf'),
  })
  return await getJsonData('settings')
}

// const storeData = async (key, value) => {
//   try {
//     return await AsyncStorage.setItem(
//       key,
//       typeof value === 'boolean' ? (value ? '1' : '0') : value
//     )
//   } catch (e) {
//     // saving error
//   }
// }

const storeJsonData = async (key, json) => {
  try {
    const jsonValue = JSON.stringify(json)
    return await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

// const getData = async (key) => {
//   try {
//     const value = await AsyncStorage.getItem(key)
//     if (value !== null) {
//       // value previously stored
//     }
//     return value
//   } catch (e) {
//     // error reading value
//   }
// }

const getJsonData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
  }
}

SplashScreen.preventAutoHideAsync()

let interval

const AppChildren = () => {
  const [isReady, setIsReady] = useState(false)
  const [screen, setScreen] = useState()
  const [settings, setSettings] = useRecoilState(settingsAtom)

  const [screenOrientation, setScreenOrientation] = useState('vertical')

  const storeSettings = (data) => storeJsonData('settings', data)

  const updateSettings = (data) => {
    if (data) {
      const newSettings = { ...settings, ...data }
      setSettings(newSettings)
      storeSettings(newSettings)
    }
  }

  useEffect(() => {
    if (!settings.licenseCode && interval) clearInterval(interval)
    if (settings.licenseCode && !interval) {
      const updateServerInfo = async () => {
        const data = await getDataCode(settings.licenseCode, true)
        if (data) {
          if (data.errorCode === 'code not exist') {
            updateSettings({
              licenseUserName: undefined,
              licenseExpiredDate: undefined,
              licenseCode: undefined,
            })
          } else {
            updateSettings({
              licenseUserName: data.data.userName,
              licenseExpiredDate: data.data?.expiredDate,
            })
          }
        }
      }
      updateServerInfo()
      interval = setInterval(() => {
        updateServerInfo()
      }, 3600000)
    }
  }, [settings.licenseCode])

  useEffect(() => {
    if (settings.licenseExpiredDate) {
      const expDate = new Date(settings.licenseExpiredDate)
      const now = new Date()
      if (expDate.getTime() - now.getTime() < 0) {
        setScreen()
      }
    }
  }, [settings.licenseExpiredDate])

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((o) => {
      if (o === 3 || o === 4) setScreenOrientation('horizontal')
      if (o === 1 || o === 2) setScreenOrientation('vertical')
    })
    ScreenOrientation.addOrientationChangeListener((e) => {
      const o = e.orientationInfo.orientation
      if (settings.screenOrientation === 'vertical') {
        setScreenOrientation('vertical')
        return
      }
      if (settings.screenOrientation === 'horizontal') {
        setScreenOrientation('horizontal')
        return
      }
      if (o === 3 || o === 4) setScreenOrientation('horizontal')
      if (o === 1 || o === 2) setScreenOrientation('vertical')
    })
  }, [])

  // const hashString = (code) => {
  //   let hash = 5381
  //   let i = code.length

  //   while (i) hash = (hash * 33) ^ code.charCodeAt(--i)

  //   const result = Math.abs((hash >>> 0) & 0xffffffff)
  //   return result
  // }

  // const hashString8 = (code) => {
  //   let hash = hashString(code)
  //   return (hash % 100000000).toString().padStart(8, '0')
  // }

  // console.log('hashString8 :>> ', hashString8('Андрей Гамм'))

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const settings = await loadApplication()
        if (settings) {
          if (!settings.licenseCode || !settings.licenseUserName) setScreen()
          else if (settings.startCalcOnLoad) setScreen('calc')
          else setScreen('settings')
          updateSettings(settings)
        }
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setIsReady(true)
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (!settings?.licenseCode || !settings?.licenseUserName) {
      if (interval) clearInterval(interval)
      setScreen()
    }
  }, [settings?.licenseUserName, settings?.licenseCode])

  // const onLayoutRootView = useCallback(async () => {
  //   if (isReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync()
  //   }
  // }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 12,
          height: 12,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'blue', fontSize: 10 }}>21</Text>
      </View> */}
      {/* <View style={styles.container}> */}
      <StatusBar style={settings.isDarkTheme ? 'light' : 'dark'} />
      {screen === 'settings' ? (
        <Settings
          setScreen={setScreen}
          updateSettings={updateSettings}
          settings={settings}
          screenOrientation={screenOrientation}
        />
      ) : screen === 'calc' ? (
        <Calc
          isDarkTheme={settings.isDarkTheme}
          goToSettings={() => setScreen('settings')}
          separateChar={settings.separateChar}
          settings={settings}
          updateSettings={updateSettings}
          screenOrientation={screenOrientation}
        />
      ) : screen === 'about' ? (
        <About
          setScreen={setScreen}
          // updateSettings={updateSettings}
          settings={settings}
        />
      ) : (
        <LicenseScreen
          setScreen={setScreen}
          updateSettings={updateSettings}
          settings={settings}
        />
      )}

      {/* </View> */}
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <RecoilRoot>
      <AppChildren />
    </RecoilRoot>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'flex-end',
    justifyContent: 'center',
    fontFamily: 'helvetica-black',
  },
})
