import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'

import Settings from './Settings'
import Calc from './Calc'

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
    'helvetica-ultralight': require('./assets/fonts/HelveticaUltraLight.ttf'),
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

export default function App() {
  const colorScheme = useColorScheme()
  const [isReady, setIsReady] = useState(false)
  const [screen, setScreen] = useState('settings')
  const [settings, setSettings] = useState({
    isDarkTheme: false,
    startCalcOnLoad: false,
    separateChar: '.',
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

  if (!isReady)
    return (
      <AppLoading
        startAsync={async () => {
          const settings = await loadApplication()
          if (settings) {
            if (settings.startCalcOnLoad) setScreen('calc')
            updateSettings(settings)
          }
        }}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )

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
        />
      )}
      {/* </View> */}
    </SafeAreaView>
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
