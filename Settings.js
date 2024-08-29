import React from 'react'

import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import getNoun from './helpers/getNoun'

import Button from './components/Button'
import formatDateTime from './helpers/formatDateTime'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderBackButton } from '@react-navigation/elements'
import AboutScreen from './About'
import decryptText from './helpers/decryptText'
import language from './helpers/language'
import LicenseScreen from './License'
import LanguagePicker from './components/LanguagePicker'

const Stack = createNativeStackNavigator()

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

// const ItemCheckBox = ({ title, isDarkTheme, value, onValueChange }) => (
//   <View
//     style={{
//       display: 'flex',
//       flexDirection: 'row',
//       alignItems: 'center',
//       flex: 1,
//     }}
//   >
//     <Checkbox
//       style={{ margin: 8, height: 22, width: 22 }}
//       value={value}
//       onValueChange={onValueChange}
//       color={value ? '#ff9933' : undefined}
//     />
//     <Text
//       style={{
//         ...styles.text,
//         flex: 1,
//         color: isDarkTheme ? 'white' : 'black',
//       }}
//     >
//       {title}
//     </Text>
//   </View>
// )

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
        marginTop: 4,
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
        marginTop: 4,
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

const SettingsMenu = ({
  navigation,
  setScreen,
  settings,
  updateSettings,
  screenOrientation,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      <View
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        <ItemSwitch
          title={language(
            settings.language,
            'При запуске открывать калькулятор'
          )}
          onValueChange={(value) => updateSettings({ startCalcOnLoad: value })}
          value={settings.startCalcOnLoad}
          isDarkTheme={settings.isDarkTheme}
        />
        <LanguagePicker settings={settings} updateSettings={updateSettings} />
        <View
          style={{
            display: screenOrientation === 'vertical' ? '' : 'flex',
            justifyContent: 'center',
            flexDirection: screenOrientation === 'vertical' ? 'column' : 'row',
            gap: screenOrientation === 'vertical' ? 0 : 15,
            marginTop: 5,
          }}
        >
          <Button
            title={language(settings.language, 'Внешний вид')}
            onPress={() => navigation.navigate('Theme')}
            style={{ flex: screenOrientation === 'vertical' ? undefined : 1 }}
          />
          <Button
            title={language(settings.language, 'Параметры форсирования')}
            onPress={() => navigation.navigate('Force')}
            style={{ flex: screenOrientation === 'vertical' ? undefined : 1 }}
          />
        </View>
        <Button
          color="#aa77ff"
          title={language(settings.language, 'Инструкция')}
          onPress={() => navigation.navigate('Instructions')}
        />
        <Button
          color="#aa77ff"
          title={language(settings.language, 'О приложении')}
          onPress={() => navigation.navigate('About')}
        />
        {/* <Button
          title={language(settings.language, 'TicTacToe')}
          onPress={() => navigation.navigate('TicTacToe')}
          style={{ flex: screenOrientation === 'vertical' ? undefined : 1 }}
        /> */}
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          {/* <Button
            color="#aa77ff"
            title={language(settings.language, 'Лицензия')}
            onPress={() => setScreen('')}
          /> */}
          <Text
            style={{
              color: settings.isDarkTheme ? 'white' : 'black',
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            {language(settings.language, 'Лицензия') +
              (settings?.licenseExpiredDate
                ? ` ${language(settings.language, 'до')} ${formatDateTime(
                    settings?.licenseExpiredDate,
                    'dd.MM.yy hh:mm'
                  )}`
                : '') +
              ' ' +
              language(settings.language, 'для пользователя')}
          </Text>
          <Text
            style={{
              color: settings.isDarkTheme ? 'white' : 'black',
              textAlign: 'center',
              fontSize: 18,
            }}
          >
            {settings.licenseUserName}
          </Text>
        </View>
        {/* <Button
          color="#aa77ff"
          title={'тест'}
          onPress={() => {
            AsyncStorage.clear()
            updateSettings({
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
              // hoursFormat: '24',
            })
          }}
        /> */}
        {/* <Button
          title="Запустить калькулятор"
          onPress={() => setScreen('calc')}
        />
        <Button
          color="#aa77ff"
          title="О приложении"
          onPress={() => setScreen('about')}
        /> */}
      </View>
    </View>
  )
}

const SettingsInstructions = ({
  navigation,
  setScreen,
  settings,
  updateSettings,
  screenOrientation,
}) => {
  const textColor = settings.isDarkTheme ? 'white' : 'black'

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      <View
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        {settings.language === 'en' && (
          <Text
            style={{
              marginBottom: 6,
              fontSize: 16,
              color: textColor,
            }}
          >
            Unfortunately, the instructions is only available in Russian
            language, but you can automatically turn on subtitles in your
            language in the player
          </Text>
        )}
        <Button
          color="#aa77ff"
          title={language(settings.language, 'Процесс демонстрации')}
          onPress={() => Linking.openURL('https://youtu.be/OweGaDPZ4ww')}
        />
        <Button
          color="#aa77ff"
          title={language(settings.language, 'Настройки внешнего вида')}
          onPress={() => Linking.openURL('https://youtu.be/rv2qo6Su7Xk')}
        />
        <Button
          color="#aa77ff"
          title={language(settings.language, 'Настройки форсирования')}
          onPress={() => Linking.openURL('https://youtu.be/utp2f8YXZr0')}
        />
        <Button
          color="#aa77ff"
          title={language(settings.language, 'Горячие клавиши')}
          onPress={() => Linking.openURL('https://youtu.be/ia7RCZ0wYKU')}
        />
      </View>
    </View>
  )
}

const SettingsTheme = ({ setScreen, settings, updateSettings }) => {
  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      <Text
        style={{
          ...styles.title,
          marginTop: 0,
          color: settings.isDarkTheme ? 'white' : 'black',
        }}
      >
        {language(settings.language, 'Общие')}
      </Text>
      <ItemSwitch
        title={language(settings.language, 'Темная тема')}
        onValueChange={(value) => updateSettings({ isDarkTheme: value })}
        value={settings.isDarkTheme}
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
          {language(settings.language, 'Ориентация экрана')}
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
            selectedValue={settings.screenOrientation}
            style={{
              // maxHeight: 30,
              marginRight: -8,
              marginTop: -8,
              width: 200,
              color: settings.isDarkTheme ? 'white' : 'black',
              // borderWidth: 1,
              // borderLeftColor: 'blue',
              // borderLeftWidth: 2,
              // backgroundColor: 'blue',
            }}
            onValueChange={(itemValue, itemIndex) =>
              updateSettings({ screenOrientation: itemValue })
            }
            mode="dropdown"
            dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
          >
            <Picker.Item
              label={language(settings.language, 'Авто')}
              value="auto"
            />
            <Picker.Item
              label={language(settings.language, 'Вертикальный')}
              value="vertical"
            />
            <Picker.Item
              label={language(settings.language, 'Горизонтальный')}
              value="horizontal"
            />
          </Picker>
        </View>
      </View>
      <Text
        style={{
          ...styles.title,
          color: settings.isDarkTheme ? 'white' : 'black',
        }}
      >
        {language(settings.language, 'Калькулятор')}
      </Text>
      <View
        style={{
          // flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 1,
        }}
      >
        <Text
          style={{
            ...styles.text,
            flex: 1,
            color: settings.isDarkTheme ? 'white' : 'black',
          }}
        >
          {language(settings.language, 'Тема')}
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
            selectedValue={settings.theme}
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
              updateSettings({ theme: itemValue })
            }
            mode="dropdown"
            dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
          >
            <Picker.Item
              label={language(settings.language, 'Классическая')}
              value="classic"
            />
            <Picker.Item
              label={language(settings.language, 'Стандартная')}
              value="standart"
            />
          </Picker>
        </View>
      </View>
      <View
        style={{
          // flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 1,
        }}
      >
        <Text
          style={{
            ...styles.text,
            flex: 1,
            color: settings.isDarkTheme ? 'white' : 'black',
          }}
        >
          {language(settings.language, 'Разделитель тысяч')}
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
            selectedValue={settings.separateChar}
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
              updateSettings({ separateChar: itemValue })
            }
            mode="dropdown"
            dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
          >
            <Picker.Item
              label={language(settings.language, 'Без разделения')}
              value=""
            />
            <Picker.Item
              label={language(settings.language, 'Точка')}
              value="."
            />
            <Picker.Item
              label={language(settings.language, 'Пробел')}
              value=" "
            />
          </Picker>
        </View>
      </View>
      <ItemSwitch
        title={language(
          settings.language,
          'При активном триггере подсвечивать нажатия триггерных кнопок (не фактически нажатых)'
        )}
        onValueChange={(value) =>
          updateSettings({ pressTriggerButtons: value })
        }
        value={settings.pressTriggerButtons}
        isDarkTheme={settings.isDarkTheme}
      />
      <ItemSwitch
        title={language(
          settings.language,
          'При активном триггере слегка подсвечивать цифру, для демонстрации кол-ва оставшихся цифр необходимых для введения форсированного числа'
        )}
        onValueChange={(value) => updateSettings({ highlightNumber: value })}
        value={settings.highlightNumber}
        isDarkTheme={settings.isDarkTheme}
      />

      {settings.highlightNumber && (
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
              color: settings.isDarkTheme ? 'white' : 'black',
            }}
          >
            {language(settings.language, 'Контрастность подсветки цифры')}
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
              selectedValue={settings.highlightNumberIntensity}
              style={{
                // maxHeight: 30,
                marginRight: -8,
                marginTop: -8,
                width: 200,
                color: settings.isDarkTheme ? 'white' : 'black',
                // borderWidth: 1,
                // borderLeftColor: 'blue',
                // borderLeftWidth: 2,
                // backgroundColor: 'blue',
              }}
              onValueChange={(itemValue, itemIndex) =>
                updateSettings({ highlightNumberIntensity: itemValue })
              }
              mode="dropdown"
              dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
            >
              <Picker.Item
                label={language(settings.language, 'Очень высокий')}
                value="veryhigh"
              />
              <Picker.Item
                label={language(settings.language, 'Высокий')}
                value="high"
              />
              <Picker.Item
                label={language(settings.language, 'Нормальный')}
                value="normal"
              />
              <Picker.Item
                label={language(settings.language, 'Низкий')}
                value="light"
              />
              <Picker.Item
                label={language(settings.language, 'Очень низкий')}
                value="verylight"
              />
            </Picker>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const SettingsForce = ({ setScreen, settings, updateSettings }) => {
  const decryptedText = decryptText(settings.forceCryptotext)
  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      <View
        style={{
          marginTop: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
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
            {language(settings.language, 'Тип форсирования')}
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
              selectedValue={settings.forceType}
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
                updateSettings({ forceType: itemValue })
              }
              mode="dropdown"
              dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
            >
              <Picker.Item
                label={language(settings.language, 'Дата')}
                value="date"
              />
              <Picker.Item
                label={language(settings.language, 'Число')}
                value="number"
              />
              <Picker.Item
                label={language(settings.language, 'Криптотекст')}
                value="cryptotext"
              />
            </Picker>
          </View>
        </View>
      </View>
      {/* </View>
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
        <ItemCheckBox
          title="Форс криптотекста"
          value={settings.forceType === 'cryptotext'}
          onValueChange={() => updateSettings({ forceType: 'cryptotext' })}
          isDarkTheme={settings.isDarkTheme}
        />
      </View> */}
      {settings.forceType === 'date' && (
        <>
          <ItemInputNumber
            title={language(settings.language, 'Отклонение от даты на, сек')}
            number={settings.forceDateDelay}
            onChangeNumber={(value) =>
              updateSettings({ forceDateDelay: value })
            }
            isDarkTheme={settings.isDarkTheme}
          />
          <ItemInputText
            title={`${language(settings.language, 'Формат даты')}*`}
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
            {`${language(settings.language, 'Результат')}: ${formatDateTime(
              Date.now(),
              settings.dateFormat
            )}`}
          </Text>
          {/* <View
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: settings.isDarkTheme ? 'white' : 'black',
              borderRadius: 8,
            }}
          >
            <Picker
              selectedValue={settings.hoursFormat}
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
                updateSettings({ hoursFormat: itemValue })
              }
              mode="dropdown"
              dropdownIconColor={settings.isDarkTheme ? 'white' : 'black'}
            >
              <Picker.Item
                label={'12'}
                value="12"
              />
              <Picker.Item
                label={'24'}
                value="24"
              />
            </Picker>
          </View> */}
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
            {`  *  d, dd - ${language(
              settings.language,
              'день'
            )};\n      M, MM - ${language(
              settings.language,
              'месяц'
            )};\n      y, yy - ${language(
              settings.language,
              'год'
            )};\n      m, mm - ${language(
              settings.language,
              'минуты'
            )};\n      h, hh - ${language(
              settings.language,
              'часы (12 часовой формат)'
            )};\n      H, HH - ${language(
              settings.language,
              'часы (24 часовой формат)'
            )}.`}
          </Text>
        </>
      )}

      {settings.forceType === 'number' && (
        <ItemInputNumber
          title={language(settings.language, 'Форсируемое число')}
          number={settings.forceNumber}
          onChangeNumber={(value) => updateSettings({ forceNumber: value })}
          isDarkTheme={settings.isDarkTheme}
          inputStyle={{ flex: 1 }}
        />
      )}
      {settings.forceType === 'cryptotext' && (
        <>
          <ItemInputText
            title={language(settings.language, 'Форсируемое слово')}
            text={settings.forceCryptotext}
            onChangeText={(value) => updateSettings({ forceCryptotext: value })}
            isDarkTheme={settings.isDarkTheme}
            inputStyle={{ flex: 1 }}
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
            {`${language(
              settings.language,
              'Результат'
            )}: ${decryptedText} (${getNoun(
              decryptedText.length,
              language(settings.language, 'цифра'),
              language(settings.language, 'цифры'),
              language(settings.language, 'цифр')
            )})`}
          </Text>
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
            {`${language(settings.language, 'Как написать')}:`}
          </Text>
          <Text
            style={{
              ...styles.text,
              flex: 1,
              textAlign: 'center',
              fontSize: 70,
              marginBottom: 8,
              // marginTop: -4,
              fontFamily: 'cryptext',
              transform: [{ rotate: '180deg' }],
              color: settings.isDarkTheme ? 'white' : 'black',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {settings.forceCryptotext.toUpperCase()}
          </Text>
          {!!(decryptedText && decryptedText[0] === '0') && (
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
              {`${language(
                settings.language,
                'Внимание! Слово не может заканчиваться на букву "О", "C" , "D", "U" и "P", так как форсируемый результат (число) начинается с нуля "0", что не может быть отображено в результате вычисления в калькуляторе.'
              )}`}
            </Text>
          )}
        </>
      )}
    </ScrollView>
  )
}

export default function Settings(generalProps) {
  const { settings, setScreen } = generalProps
  const orientation =
    settings.screenOrientation === 'horizontal'
      ? 'landscape'
      : settings.screenOrientation === 'vertical'
      ? 'portrait'
      : 'default'

  const screenProps = {
    orientation,
    headerStyle: {
      backgroundColor: settings?.isDarkTheme ? '#202020' : 'white',
    },
    headerTintColor: settings?.isDarkTheme ? 'white' : 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    animation: 'slide_from_right',
  }

  const headerRight = (props) => (
    <View
      {...props}
      style={{
        // marginRight: -4,
        height: 40,
        width: 40,
        borderRadius: 40,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome5
        style={{
          borderRadius: 40,
          overflow: 'hidden',
        }}
        name="calculator"
        size={20}
        color={settings?.isDarkTheme ? 'white' : '#202020'}
        onPress={() => setScreen('calc')}
      />
    </View>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Menu" component={SettingsMenu} /> */}
        <Stack.Screen
          name="Menu"
          options={{
            title: language(settings.language, 'Настройки'),
            // headerLeftContainerStyle: { padding: 10 },
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                style={{ marginLeft: 0, marginRight: 25 }}
                onPress={() => setScreen('calc')}
              />
            ),
            headerRight,
            ...screenProps,
          }}
        >
          {(props) => <SettingsMenu {...props} {...generalProps} />}
        </Stack.Screen>
        <Stack.Screen
          name="Theme"
          options={{
            title: language(settings.language, 'Внешний вид'),
            headerRight,
            ...screenProps,
          }}
        >
          {(props) => <SettingsTheme {...props} {...generalProps} />}
        </Stack.Screen>
        <Stack.Screen
          name="Force"
          options={{
            title: language(settings.language, 'Параметры форсирования'),
            headerRight,
            ...screenProps,
          }}
        >
          {(props) => <SettingsForce {...props} {...generalProps} />}
        </Stack.Screen>
        <Stack.Screen
          name="Instructions"
          options={{
            title: language(settings.language, 'Инструкция'),
            headerRight,
            ...screenProps,
          }}
        >
          {(props) => <SettingsInstructions {...props} {...generalProps} />}
        </Stack.Screen>
        <Stack.Screen
          name="About"
          options={{
            title: language(settings.language, 'О приложении'),
            headerRight,
            ...screenProps,
          }}
        >
          {(props) => <AboutScreen {...props} {...generalProps} />}
        </Stack.Screen>
        <Stack.Screen
          name="License"
          options={{
            title: language(settings.language, 'Лицензия'),
            headerRight,
            ...screenProps,
          }}
        >
          {(props) => <LicenseScreen {...props} {...generalProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
})
