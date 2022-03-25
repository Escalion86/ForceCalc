import React from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

// import RadioButtonRN from 'radio-buttons-react-native'

// import Icon from 'react-native-vector-icons/FontAwesome'

import Checkbox from 'expo-checkbox'
import Button from './components/Button'
import formatDateTime from './helpers/formatDateTime'

const ItemSwitch = ({ title, onValueChange, value, isDarkTheme }) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        ...styles.text,
        flex: 1,
        color: isDarkTheme ? 'white' : 'black',
        paddingVertical: 4,
      }}
    >
      {title}
    </Text>
    <Switch
      trackColor={{ false: '#767577', true: '#ffbb66' }}
      thumbColor={value ? '#ff9933' : '#f4f3f4'}
      // ios_backgroundColor="#3e3e3e"
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

const ItemInputNumber = ({
  title,
  number,
  onChangeNumber,
  isDarkTheme,
  inputStyle,
}) => (
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
        width: 80,
        height: 40,
        // width: 60,
        margin: 4,
        borderWidth: 1,
        padding: 10,
        color: isDarkTheme ? 'white' : 'black',
        borderColor: isDarkTheme ? 'white' : 'black',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        ...inputStyle,
      }}
      onChangeText={(value) => onChangeNumber(parseInt(value))}
      value={!!number ? String(number) : '0'}
      // placeholder="useless placeholder"
      keyboardType="numeric"
    />
  </View>
)

const ItemInputText = ({
  title,
  text,
  onChangeText,
  isDarkTheme,
  inputStyle,
}) => (
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
        flex: 1,
        height: 40,
        // width: 60,
        margin: 4,
        borderWidth: 1,
        padding: 10,
        color: isDarkTheme ? 'white' : 'black',
        borderColor: isDarkTheme ? 'white' : 'black',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        ...inputStyle,
      }}
      onChangeText={onChangeText}
      value={text}
      // placeholder="useless placeholder"
      // keyboardType="text"
    />
  </View>
)

export default function Settings({ setScreen, settings, updateSettings }) {
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          ...styles.title,
          color: settings.isDarkTheme ? 'white' : 'black',
        }}
      >
        Настройки общие
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
        <View
          style={{
            height: 40,
            borderWidth: 1,
            borderColor: settings.isDarkTheme ? 'white' : 'black',
            borderRadius: 10,
          }}
        >
          <Picker
            selectedValue={settings.separateChar}
            style={{
              // maxHeight: 30,
              marginTop: -8,
              width: 190,
              color: settings.isDarkTheme ? 'white' : 'black',
              borderWidth: 1,
              borderLeftColor: 'blue',
              borderLeftWidth: 2,
              // backgroundColor: 'blue',
            }}
            onValueChange={(itemValue, itemIndex) =>
              updateSettings({ separateChar: itemValue })
            }
            mode="dropdown"
            dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
          >
            <Picker.Item label="Без разделения" value="" />
            <Picker.Item label="Точка" value="." />
            <Picker.Item label="Пробел" value=" " />
          </Picker>
        </View>
      </View>
      <Text
        style={{
          ...styles.title,
          color: settings.isDarkTheme ? 'white' : 'black',
        }}
      >
        Настройки форсирования
      </Text>
      <View
        style={{
          marginTop: 10,
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
        <>
          <ItemInputNumber
            title="Отклонение от даты на, сек"
            number={settings.forceDateDelay}
            onChangeNumber={(value) =>
              updateSettings({ forceDateDelay: value })
            }
            isDarkTheme={settings.isDarkTheme}
          />
          <ItemInputText
            title="Формат даты*"
            text={settings.dateFormat}
            onChangeText={(value) => updateSettings({ dateFormat: value })}
            isDarkTheme={settings.isDarkTheme}
          />
          <Text
            style={{
              ...styles.text,
              flex: 1,
              fontSize: 14,
              marginBottom: 8,
              // marginTop: -4,
              color: settings.isDarkTheme ? 'white' : 'black',
            }}
          >
            Итоговый результат:{' '}
            {formatDateTime(Date.now(), settings.dateFormat)}
          </Text>
          <Text
            style={{
              ...styles.text,
              flex: 1,
              fontSize: 12,
              marginBottom: 12,
              // marginTop: -10,
              color: settings.isDarkTheme ? 'white' : 'black',
            }}
          >
            * d, dd - день; M, MM - месяц; y, yy - год; m, mm - минуты; h, hh -
            часы
          </Text>
        </>
      )}

      {settings.forceType === 'number' && (
        <ItemInputNumber
          title="Форсируемое число"
          number={settings.forceNumber}
          onChangeNumber={(value) => updateSettings({ forceNumber: value })}
          isDarkTheme={settings.isDarkTheme}
          inputStyle={{ flex: 1 }}
        />
      )}
      <ItemSwitch
        title="Слегка подсвечивать цифру, для демонстрации кол-ва оставшихся цифр необходимых для введения форсированного числа"
        onValueChange={(value) => updateSettings({ highlightNumber: value })}
        value={settings.highlightNumber}
        isDarkTheme={settings.isDarkTheme}
      />
      <ItemSwitch
        title="При активном триггере подсвечивать нажатия триггерных кнопок (а не фактически нажатых)"
        onValueChange={(value) =>
          updateSettings({ pressTriggerButtons: value })
        }
        value={settings.pressTriggerButtons}
        isDarkTheme={settings.isDarkTheme}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          title="Запустить калькулятор"
          onPress={() => setScreen('calc')}
        />
        <Button
          color="#aa77ff"
          title="О приложении"
          onPress={() => setScreen('about')}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    // justifyContent: 'center',
    // backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 16,
    textAlign: 'center',
  },
  text: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
})
