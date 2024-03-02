import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ToastAndroid,
  // Dimensions,
} from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'
import formatText from '../../helpers/formatText'
import FuncButton from '../FuncButton'
import language from '../../helpers/language'

function CalcVertical({
  btnClick,
  btnStartPress,
  deleteChar,
  settings,
  trigger,
  startTrigger,
  nextResultNumsCountToReady,
  neededFunc,
  minus,
  text,
  separateChar,
  goToSettings,
  secondArg,
  firstArg,
  config,
  highlightFunc,
  triggerColor,
  updateSettings,
}) {
  // const windowWidth = Dimensions.get('window').width
  // const btnSize = windowWidth / 4 + 10

  return (
    <>
      <View
        style={{
          position: 'relative',
          flex: 1,
          flexDirection: 'column',
          // alignItems: 'flex-end',
          justifyContent: 'flex-end',
          width: '100%',
          backgroundColor: settings.theme === 'classic' ? '#202020' : '#000000',
          // backgroundColor: settings.isDarkTheme ? '#202020' : '#efefef',
          // borderWidth: 1,
          // borderColor: 'blue',
        }}
      >
        {trigger && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 3,
              width: 3,
              backgroundColor:
                nextResultNumsCountToReady === 0
                  ? '#888888'
                  : neededFunc === '+'
                  ? 'green'
                  : 'red',
            }}
          />
        )}
        {/* <Text
          style={{
            color: settings.isDarkTheme ? 'white' : 'black',
            width: 'auto',
            minHeight: 40,
            marginHorizontal: 8,
            fontSize: 34,
            textAlign: 'right',
            fontFamily: 'helvetica-thin',
          }}
          onPress={() => setTrigger((state) => !state)}
        >
          {(startNewNumber ? 'true   ' : 'false   ') +
            String(firstArg ?? 0) +
            ' ' +
            activeFunc +
            ' ' +
            String(secondArg ?? 0)}
        </Text> */}
        <GestureRecognizer
          // onSwipe={(direction, state) => onSwipe(direction, state)}
          // onSwipeUp={(state) => onSwipe(state)}
          // onSwipeDown={(state) => onSwipe(state)}
          // onSwipeLeft={(state) => onSwipe(state)}
          onSwipeRight={(state) => deleteChar()}
          config={config}
          style={{
            position: 'relative',
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'flex-end',
            width: 'auto',
            minHeight: 80,
            marginHorizontal: '7%',
            // backgroundColor: 'blue',
            // borderWidth: 1,
            // borderColor: 'blue',
            // paddingHorizontal: '5%',
          }}
        >
          <Text
            style={{
              // flex: 1,
              // color: settings.isDarkTheme ? 'white' : 'black',
              color: 'white',
              // width: '90%',
              // backgroundColor: 'black',
              // borderWidth: 1,
              // borderColor: 'red',
              fontSize: 78,
              textAlign: 'right',
              // fontWeight: '300',

              fontFamily: 'helvetica-thin',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
            // onPress={() => {
            //   if (!trigger)
            //     setTrigger((state) => !state)
            // }}
          >
            {(minus ? '-' : '') + formatText(text, separateChar)}
          </Text>
          <TouchableWithoutFeedback onPress={startTrigger}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                width: '100%',
                position: 'absolute',
                // left: '5%',
                height: '100%',
                zIndex: 10,
              }}
            />
          </TouchableWithoutFeedback>
        </GestureRecognizer>
      </View>
      <View
        style={{
          backgroundColor: settings.theme === 'classic' ? '#202020' : '#000000',
        }}
      >
        <View style={styles.bottonsRow}>
          <FuncButton
            onPress={() => {
              // !trigger && !secondArg && !firstArg && setTimer()
              btnClick('C')
            }}
            onPressIn={() => btnStartPress('C')}
            func="c"
            onLongPress={!trigger && !secondArg && !firstArg && goToSettings}
            iconName={!secondArg && !firstArg ? 'AC' : 'C'}
            colorNum={1}
            // onTouchEnd={clearTimer}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('±')}
            onPressIn={() => btnStartPress('±')}
            func="+-"
            iconName={'+-'}
            colorNum={1}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('%')}
            onPressIn={() => btnStartPress('%')}
            func="%"
            iconName={'%'}
            colorNum={1}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('÷')}
            onPressIn={() => btnStartPress('÷')}
            func="/"
            iconName={'/'}
            active={highlightFunc === '/'}
            colorNum={2}
            square
            theme={settings.theme}
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 7
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('7')}
            onPressIn={() => btnStartPress('7')}
            func="7"
            iconName={'7'}
            square
            theme={settings.theme}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 8
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('8')}
            onPressIn={() => btnStartPress('8')}
            func="8"
            iconName={'8'}
            square
            theme={settings.theme}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 9
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('9')}
            onPressIn={() => btnStartPress('9')}
            func="9"
            iconName={'9'}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('*')}
            iconName={'*'}
            onPressIn={() => btnStartPress('*')}
            func="*"
            colorNum={2}
            active={highlightFunc === '*'}
            square
            theme={settings.theme}
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 4
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('4')}
            onPressIn={() => btnStartPress('4')}
            func="4"
            iconName={'4'}
            square
            theme={settings.theme}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 5
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('5')}
            onPressIn={() => btnStartPress('5')}
            func="5"
            iconName={'5'}
            square
            theme={settings.theme}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 6
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('6')}
            onPressIn={() => btnStartPress('6')}
            func="6"
            iconName={'6'}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('-')}
            onPressIn={() => btnStartPress('-')}
            func="-"
            iconName={'-'}
            active={highlightFunc === '-'}
            colorNum={2}
            square
            theme={settings.theme}
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 1
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('1')}
            onPressIn={() => btnStartPress('1')}
            func="1"
            iconName={'1'}
            square
            theme={settings.theme}
            onLongPress={() => {
              if (!trigger && !secondArg && !firstArg) {
                updateSettings({ forceType: 'date' })
                ToastAndroid.show('Режим: Дата', ToastAndroid.SHORT)
              }
            }}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 2
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('2')}
            onPressIn={() => btnStartPress('2')}
            func="2"
            iconName={'2'}
            square
            theme={settings.theme}
            onLongPress={() => {
              if (!trigger && !secondArg && !firstArg) {
                updateSettings({ forceType: 'number' })
                ToastAndroid.show(
                  `Режим: Число (${settings.forceNumber})`,
                  ToastAndroid.SHORT
                )
              }
            }}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 3
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('3')}
            onPressIn={() => btnStartPress('3')}
            func="3"
            iconName={'3'}
            square
            theme={settings.theme}
            onLongPress={() => {
              if (!trigger && !secondArg && !firstArg) {
                updateSettings({ forceType: 'cryptotext' })
                ToastAndroid.show(
                  `Режим: Криптотекст (${settings.forceCryptotext})`,
                  ToastAndroid.SHORT
                )
              }
            }}
          />
          <FuncButton
            onPress={() => btnClick('+')}
            iconName={'+'}
            onPressIn={() => btnStartPress('+')}
            func="+"
            colorNum={2}
            active={highlightFunc === '+'}
            square
            theme={settings.theme}
          />
          {/* <NumButton
            style={nextResultNumsCountToReady === 1 ? styles.trigger : {}}
            onPress={() => btnClick('1')}
            title="1"
            square
          />
          <NumButton
            style={nextResultNumsCountToReady === 2 ? styles.trigger : {}}
            onPress={() => btnClick('2')}
            title="2"
            square
          />
          <NumButton
            style={nextResultNumsCountToReady === 3 ? styles.trigger : {}}
            onPress={() => btnClick('3')}
            title="3"
            square
          />
          <FuncButton
            onPress={() => btnClick('+')}
            title="+"
            active={highlightFunc === '+'}
            square
          /> */}
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 0
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('0')}
            onPressIn={() => btnStartPress('0')}
            func="0"
            iconName={'0'}
            square
            theme={settings.theme}
            big
            onLongPress={() => {
              if (!trigger && !secondArg && !firstArg)
                if (settings.forceType === 'date') {
                  ToastAndroid.show(
                    `${language(settings.language, 'Режим')}: ${language(
                      settings.language,
                      'Дата'
                    )}`,
                    ToastAndroid.SHORT
                  )
                } else if (settings.forceType === 'cryptotext') {
                  ToastAndroid.show(
                    `${language(settings.language, 'Режим')}: ${language(
                      settings.language,
                      'Криптотекст'
                    )} (${settings.forceCryptotext})`,
                    ToastAndroid.SHORT
                  )
                } else if (settings.forceType === 'number') {
                  ToastAndroid.show(
                    `${language(settings.language, 'Режим')}: ${language(
                      settings.language,
                      'Число'
                    )} (${settings.forceNumber})`,
                    ToastAndroid.SHORT
                  )
                }
            }}
          />
          <FuncButton
            onPress={() => btnClick(',')}
            onPressIn={() => btnStartPress(',')}
            func=","
            iconName={','}
            square
            theme={settings.theme}
            style={
              nextResultNumsCountToReady >= 10
                ? { backgroundColor: triggerColor }
                : {}
            }
            onLongPress={() => {
              if (!trigger) {
                updateSettings({ forceType: 'number', forceNumber: text })
                ToastAndroid.show(`Режим: Число (${text})`, ToastAndroid.SHORT)
              }
            }}
          />
          <FuncButton
            onPress={() => btnClick('=')}
            iconName={'='}
            onPressIn={() => btnStartPress('=')}
            func="="
            colorNum={2}
            square
            theme={settings.theme}
          />
          {/* <NumButton
            style={nextResultNumsCountToReady === 0 ? styles.trigger : {}}
            onPress={() => btnClick('0')}
            title="0"
            big
            square
          />
          <NumButton onPress={() => btnClick(',')} title="," square />
          <FuncButton onPress={() => btnClick('=')} title="=" square /> */}
        </View>
      </View>
    </>
  )
}

export default CalcVertical

const styles = StyleSheet.create({
  bottonsRow: {
    flexDirection: 'row',
  },
})
