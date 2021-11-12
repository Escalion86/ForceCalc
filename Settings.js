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
  TextInput,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

import RadioButtonRN from 'radio-buttons-react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import Checkbox from 'expo-checkbox'

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

const ItemCheckBox = ({ title, isDarkTheme, value, onValueChange }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    }}
  >
    <Checkbox
      style={{ margin: 8, height: 22, width: 22 }}
      value={value}
      onValueChange={onValueChange}
      color={value ? '#ff9933' : undefined}
    />
    <Text
      style={{
        ...styles.text,
        flex: 1,
        color: isDarkTheme ? 'white' : 'black',
      }}
    >
      {title}
    </Text>
  </View>
)

const ItemInputNumber = ({ title, number, onChangeNumber, isDarkTheme }) => (
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
    <TextInput
      style={{
        height: 40,
        // width: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: isDarkTheme ? 'white' : 'black',
        borderColor: isDarkTheme ? 'white' : 'black',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
      }}
      onChangeText={(value) => onChangeNumber(parseInt(value))}
      value={!!number ? String(number) : '0'}
      placeholder="useless placeholder"
      keyboardType="numeric"
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
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ItemCheckBox
          title="Форс даты"
          value={settings.forceType === 'date'}
          onValueChange={() => updateSettings({ forceType: 'date' })}
          isDarkTheme={settings.isDarkTheme}
        />
        <ItemCheckBox
          title="Форс числа"
          value={settings.forceType === 'number'}
          onValueChange={() => updateSettings({ forceType: 'number' })}
          isDarkTheme={settings.isDarkTheme}
        />
      </View>
      {settings.forceType === 'date' && (
        <ItemInputNumber
          title="Отклонение от даты на, сек"
          number={settings.forceDateDelay}
          onChangeNumber={(value) => updateSettings({ forceDateDelay: value })}
          isDarkTheme={settings.isDarkTheme}
        />
      )}

      {settings.forceType === 'number' && (
        <ItemInputNumber
          title="Форсируемое число"
          number={settings.forceNumber}
          onChangeNumber={(value) => updateSettings({ forceNumber: value })}
          isDarkTheme={settings.isDarkTheme}
        />
      )}
      {/* <RadioButtonRN
        data={[
          {
            label: 'data 1',
            // accessibilityLabel: 'Your label',
          },
          {
            label: 'data 2',
            // accessibilityLabel: 'Your label',
          },
        ]}
        selectedBtn={(e) => console.log(e)}
        // box={false}
        textColor="#ffffff"
        circleSize={16}
        style={{ width: '100%' }}
        textStyle={{ height: 30 }}
        icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
      /> */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => setScreen('calc')}
          style={styles.button}
        >
          <Text style={styles.textButton}>Запустить калькулятор</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 18,
  },
})
