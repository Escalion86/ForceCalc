import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Picker,
} from 'react-native'

const ItemSwitch = ({ title, onValueChange, value, isDarkTheme }) => (
  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <Text
      style={{
        ...styles.text,
        flex: 1,
        color: isDarkTheme ? 'white' : 'black',
      }}
    >
      {title}
    </Text>
    <Switch
      trackColor={{ false: '#767577', true: '#ffbb66' }}
      thumbColor={value ? '#ff9933' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  </View>
)

export default function Settings({ setScreen, settings, updateSettings }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.title,
          color: settings.isDarkTheme ? 'white' : 'black',
        }}
      >
        Настройки
      </Text>
      <ItemSwitch
        title="Темная тема"
        onValueChange={(value) => updateSettings({ isDarkTheme: value })}
        value={settings.isDarkTheme}
        isDarkTheme={settings.isDarkTheme}
      />
      <ItemSwitch
        title="При запуске открывать калькулятор"
        onValueChange={(value) => updateSettings({ startCalcOnLoad: value })}
        value={settings.startCalcOnLoad}
        isDarkTheme={settings.isDarkTheme}
      />
      <View
        style={{
          // flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            ...styles.text,
            flex: 1,
            color: settings.isDarkTheme ? 'white' : 'black',
          }}
        >
          Разделитель тысяч
        </Text>
        <Picker
          selectedValue={settings.separateChar}
          style={{
            height: 50,
            width: 200,
            color: settings.isDarkTheme ? 'white' : 'black',
            // borderWidth: 1,
            // borderColor: 'white',
          }}
          onValueChange={(itemValue, itemIndex) =>
            updateSettings({ separateChar: itemValue })
          }
        >
          <Picker.Item label="Без разделения" value="" />
          <Picker.Item label="Точка" value="." />
          <Picker.Item label="Пробел" value=" " />
        </Picker>
      </View>
      <TouchableOpacity onPress={() => setScreen('calc')} style={styles.button}>
        <Text style={styles.textButton}>Запустить калькулятор</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    // justifyContent: 'center',
    // backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  text: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#ff9933',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
  },
  textButton: {
    fontSize: 14,
  },
})
