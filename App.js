import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import * as Font from 'expo-font'
// import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  // useColorScheme,
} from 'react-native'

import Settings from './Settings'
import Calc from './Calc'
import About from './About'

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

const storeData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(
      key,
      typeof value === 'boolean' ? (value ? '1' : '0') : value
    )
  } catch (e) {
    // saving error
  }
}

const storeJsonData = async (key, json) => {
  try {
    const jsonValue = JSON.stringify(json)
    return await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      // value previously stored
    }
    return value
  } catch (e) {
    // error reading value
  }
}

const getJsonData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
  }
}

SplashScreen.preventAutoHideAsync()

export default function App() {
  // const colorScheme = useColorScheme()
  const [isReady, setIsReady] = useState(false)
  const [screen, setScreen] = useState('settings')
  const [settings, setSettings] = useState({
    isDarkTheme: false,
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
    theme: 'classic',
    language: 'ru',
    // hoursFormat: '24',
  })

  const storeSettings = (data) => storeJsonData('settings', data)

  const updateSettings = (data) => {
    if (data) {
      const newSettings = { ...settings, ...data }
      setSettings(newSettings)
      storeSettings(newSettings)
    }
  }

  // const updateSetting = (key, value) => {
  //   if (key) setSettings({...settings, [key]:value})
  // }

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={async () => {
  //         const settings = await loadApplication()
  //         if (settings) {
  //           if (settings.startCalcOnLoad) setScreen('calc')
  //           updateSettings(settings)
  //         }
  //       }}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   )

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const settings = await loadApplication()
        if (settings) {
          if (settings.startCalcOnLoad) setScreen('calc')
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
    <RecoilRoot>
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
        {screen === 'settings' && (
          <Settings
            setScreen={setScreen}
            updateSettings={updateSettings}
            settings={settings}
          />
        )}
        {screen === 'calc' && (
          <Calc
            isDarkTheme={settings.isDarkTheme}
            goToSettings={() => setScreen('settings')}
            separateChar={settings.separateChar}
            settings={settings}
          />
        )}
        {screen === 'about' && (
          <About
            setScreen={setScreen}
            // updateSettings={updateSettings}
            settings={settings}
          />
        )}

        {/* </View> */}
      </SafeAreaView>
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
