import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Button from './components/Button'
import { ContactIcon } from './components/infoComponents'
import language from './helpers/language'
import { OtpInput } from 'react-native-otp-entry'
import LanguagePicker from './components/LanguagePicker'
import { useState } from 'react'
import formatDateTime from './helpers/formatDateTime'
import getDataCode from './helpers/getDataCode'

const LicenseScreen = ({ setScreen, settings, updateSettings }) => {
  const textColor = settings.isDarkTheme ? 'white' : 'black'

  const [error, setError] = useState()
  const [waitResponce, setWaitResponce] = useState(false)
  const [licenseUserName, setLicenseUserName] = useState(
    settings?.licenseUserName
  )
  const [licenseExpiredDate, setLicenseExpiredDate] = useState(
    settings?.licenseExpiredDate
  )

  var isLicenseExpired = false
  if (licenseExpiredDate) {
    const expDate = new Date(licenseExpiredDate)
    const now = new Date()
    isLicenseExpired = expDate.getTime() - now.getTime() < 0
  }

  const onFilled = async (code) => {
    setWaitResponce(true)
    const data = await getDataCode(code)
    if (data?.error) {
      if (data.errorCode === 'too many tries') {
        setError(
          `${language(
            settings.language,
            'Слишком много попыток ввода кода'
          )}.\n${language(
            settings.language,
            'Следующая попытка'
          )}: ${formatDateTime(data.data?.nextTryDate, 'dd.MM.yy hh:mm')}`
        )
      } else if (
        data.errorCode === 'wrong code' ||
        data.errorCode === 'code not exist'
      ) {
        setError(
          `${language(settings.language, 'Код не верный')}.\n${language(
            settings.language,
            'Проверте код и попробуйте еще раз'
          )}.`
        )
      }
    } else if (data?.data?.userName) {
      setError()
      updateSettings({
        licenseCode: code,
        licenseUserName: data.data.userName,
        licenseExpiredDate: data.data?.expiredDate,
      })
      setLicenseUserName(data.data.userName)
      setLicenseExpiredDate(data.data?.expiredDate)
    }

    setWaitResponce(false)
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
      }}
    >
      {(!settings?.licenseCode || !licenseUserName) && (
        <LanguagePicker settings={settings} updateSettings={updateSettings} />
      )}
      <View style={styles.content}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
            gap: 15,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 40,
              textAlign: 'center',
              color: settings.isDarkTheme ? 'white' : 'black',
            }}
          >
            Force Calc
          </Text>

          {!isLicenseExpired && settings?.licenseCode && licenseUserName ? (
            <View style={{ paddingHorizontal: 10 }}>
              <Text
                style={{
                  color: settings.isDarkTheme ? 'white' : 'black',
                  fontSize: 18,
                }}
              >{`${language(
                settings.language,
                'Приветствую вас'
              )} ${licenseUserName}!\n${language(
                settings.language,
                'Спасибо что приобрели это замечательное приложение'
              )}`}</Text>
              <Button
                title={language(settings.language, 'Начать пользоваться')}
                color="#aa77ff"
                onPress={() => setScreen('settings')}
              />
            </View>
          ) : waitResponce ? (
            <ActivityIndicator size="large" color="#aa77ff" />
          ) : (
            <View
              style={{
                gap: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text
                style={{
                  // ...styles.paragraph,
                  fontSize: 18,
                  color: textColor,
                }}
              >
                {`${language(settings.language, 'Введите выданный вам код')}:`}
              </Text>
              <OtpInput
                numberOfDigits={8}
                // onTextChange={(text) => console.log(text)}
                onFilled={onFilled}
                theme={{
                  containerStyle: {
                    width: '100%',
                    maxWidth: 350,
                    // rowGap: 40,
                  },
                  //  inputsContainerStyle: styles.inputsContainer,
                  pinCodeContainerStyle: {
                    width: 34,
                    height: 48,
                  },
                  pinCodeTextStyle: { color: textColor },
                  //  focusStickStyle: styles.focusStick,
                  //  focusedPinCodeContainerStyle: styles.activePinCodeContainer
                }}
              />
            </View>
          )}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {isLicenseExpired && (
            <Text style={{ color: 'red', paddingHorizontal: 10 }}>
              {language(
                settings.language,
                'Срок вашей лецензии истек! Для продления и других вопросов обратитесь к разработчику'
              )}
            </Text>
          )}
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text
          style={{
            // ...styles.paragraph,
            fontSize: 18,
            color: textColor,
          }}
        >
          {`${language(settings.language, 'Связаться с разработчиком')}:`}
        </Text>

        <View style={styles.contacts}>
          <ContactIcon
            iconName="telegram"
            backgroundColor="#0088cc"
            url="http://t.me/escalion"
            data="@Escalion"
            textColor={textColor}
          />
        </View>
      </View>
    </View>
  )
}

export default LicenseScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    // borderColor: 'red',
    // borderWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
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
  paragraph: {
    marginBottom: 6,
  },
  content: {
    flex: 1,
    // flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
  },
  bottom: {
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
  },
})
