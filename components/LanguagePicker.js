import React from 'react'

import { Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import language from '../helpers/language'

const LanguagePicker = ({ settings, updateSettings }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          flex: 1,
          color: settings.isDarkTheme ? 'white' : 'black',
        }}
      >
        {language(settings.language, 'Язык')}
      </Text>
      <View
        style={{
          height: 40,
          borderWidth: 1,
          borderColor: settings.isDarkTheme ? 'white' : 'black',
          borderRadius: 8,
        }}
      >
        <Picker
          selectedValue={settings.language}
          style={{
            // maxHeight: 30,
            marginRight: -8,
            marginTop: -8,
            width: 200,
            color: settings.isDarkTheme ? 'white' : 'black',
            borderWidth: 1,
            borderLeftColor: 'blue',
            borderLeftWidth: 2,
            // backgroundColor: 'blue',
          }}
          onValueChange={(itemValue, itemIndex) =>
            updateSettings({ language: itemValue })
          }
          mode="dropdown"
          dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
        >
          <Picker.Item label="Русский" value="ru" />
          <Picker.Item label="English" value="en" />
        </Picker>
      </View>
    </View>
  )
}

export default LanguagePicker
