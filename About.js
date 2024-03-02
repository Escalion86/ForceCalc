import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Button from './components/Button'
import { ContactIcon } from './components/infoComponents'
import language from './helpers/language'
const appJson = require('./app.json')

const AboutScreen = ({ setScreen, settings }) => {
  const textColor = settings.isDarkTheme ? 'white' : 'black'
  const fontSize = 20

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      <ScrollView>
        <View style={styles.content}>
          <Text
            style={{
              ...styles.title,
              color: settings.isDarkTheme ? 'white' : 'black',
            }}
          >
            Force Calc
          </Text>
          {/* <Text
          style={{
            ...styles.title,
            color: settings.isDarkTheme ? 'white' : 'black',
          }}
        >
          О приложении
        </Text> */}
          <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            <Text
              style={{
                ...styles.paragraph,
                fontSize: fontSize,
                color: textColor,
              }}
            >
              {`\t\t\t\t ${language(
                settings.language,
                'Приложение для форсирования определенного числа или текущей даты и времени'
              )}.`}
            </Text>
            <Text
              style={{
                ...styles.paragraph,
                fontSize: fontSize,
                color: textColor,
              }}
            >
              {' '}
              {`\t\t\t\t ${language(
                settings.language,
                'Если у Вас появились предложения или замечания по приложению, то сообщите об этом разработчику напрямую'
              )}:`}
            </Text>
          </View>
          <View style={styles.contacts}>
            <ContactIcon
              iconName="telegram"
              backgroundColor="#0088cc"
              url="http://t.me/escalion"
              data="@Escalion"
              textColor={textColor}
            />
          </View>
          <View style={{ ...styles.developer, borderColor: 'gray' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.paragraph,
                  fontSize: fontSize,
                  color: textColor,
                }}
              >
                {`${language(settings.language, 'Разработчик')}:`}
              </Text>
              <Text
                style={{
                  ...styles.paragraph,
                  fontSize: fontSize,
                  fontStyle: 'italic',
                  color: textColor,
                }}
              >
                {language(settings.language, 'Алексей Белинский')}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://escalion.ru')}
              >
                <Text
                  style={{
                    ...styles.paragraph,
                    fontStyle: 'italic',
                    fontSize: fontSize,
                    color: '#aa77ff',
                  }}
                >
                  https://Escalion.ru
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              // onPressIn={() => setStartToOpenDev(new Date())}
              // onPressOut={() => endToOpenDev()}
            >
              <Image
                style={{
                  width: 96,
                  height: 96,
                }}
                source={require('./assets/logo-dev.png')}
                // resizeMethod="scale"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <Button
            title={language(settings.language, 'Поблагодарить разработчика')}
            color="#aa77ff"
            onPress={() =>
              Linking.openURL(
                'https://www.tinkoff.ru/rm/belinskiy.aleksey5/5Yi7i79252'
              )
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={{ ...styles.bottom, borderColor: 'gray' }}>
        <Text style={{ fontSize: 16, color: textColor }}>
          {`${language(settings.language, 'Версия')}: ${appJson.expo.version}`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  developer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  contacts: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  paragraph: {
    marginBottom: 6,
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  bottom: {
    // height: 36,
    // flex: 1,
    // borderLeftColor: 'red',
    // borderLeftWidth: 3,
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
  },
})
