import React from 'react'
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'
import formatText from '../../helpers/formatText'
import FuncButton from '../FuncButton'
import language from '../../helpers/language'

const HorizontalButton = (props) => <FuncButton orientation="h" {...props} />

function CalcHorizontal({
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
  setTimer,
  clearTimer,
  triggerColor,
  updateSettings,
}) {
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
            width: 'auto',
            minHeight: 80,
            marginHorizontal: 8,
            paddingHorizontal: '4%',
            // backgroundColor: 'blue',
          }}
        >
          <View
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                // flex: 1,
                // color: settings.isDarkTheme ? 'white' : 'black',
                color: 'white',
                width: '100%',
                // backgroundColor: 'black',
                // borderWidth: 1,
                // borderColor: 'red',
                fontSize: 52,
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
                  width: '90%',
                  position: 'absolute',
                  left: '5%',
                  height: '100%',
                  zIndex: 10,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </GestureRecognizer>
      </View>
      <View
        style={{
          display: 'flex',
          height: '80%',
          marginLeft: 0,
          backgroundColor: settings.theme === 'classic' ? '#202020' : '#000000',
        }}
      >
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            func="("
            onPressIn={() => btnStartPress('(')}
            onPress={() => btnClick('(')}
            // iconName="("
            // title="("
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress(')')}
            onPress={() => btnClick(')')}
            // iconName=")"
            func=")"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('mc')}
            onPress={() => btnClick('mc')}
            // iconName={'mc'}
            func="mc"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('m+')}
            onPress={() => btnClick('m+')}
            func="m+"
            // iconName={'m+'}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('m-')}
            onPress={() => btnClick('m-')}
            // iconName={'m-'}
            func="m-"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('mr')}
            onPress={() => btnClick('mr')}
            // iconName={'mr'}
            func="mr"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onLongPress={!trigger && !secondArg && !firstArg && goToSettings}
            onPressIn={() => btnStartPress('C')}
            onPress={() => {
              // !trigger && !secondArg && !firstArg && setTimer()
              btnClick('C')
            }}
            // onLongPress={goToSettings}
            // iconName="ac"
            func={!secondArg && !firstArg ? 'AC' : 'C'}
            colorNum={1}
            // onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('±')}
            onPress={() => btnClick('±')}
            // iconName="+-"
            func="􀅺"
            colorNum={1}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('%')}
            onPress={() => btnClick('%')}
            // iconName="%"
            func="%"
            colorNum={1}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('÷')}
            onPress={() => btnClick('÷')}
            active={highlightFunc === '/'}
            colorNum={2}
            // iconName="/"
            func="􀅿"
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('2nd')}
            onPress={() => btnClick('2nd')}
            // iconName={'2nd'}
            func="2nd"
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>2</Text>
                <Text
                  style={{ marginBottom: 12, fontSize: 8, color: style.color }}
                >
                  nd
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('x2')}
            onPress={() => btnClick('x2')}
            func={'x2'}
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>x</Text>
                <Text
                  style={{ marginBottom: 12, fontSize: 8, color: style.color }}
                >
                  2
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('x3')}
            onPress={() => btnClick('x3')}
            func="x3"
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>x</Text>
                <Text
                  style={{ marginBottom: 12, fontSize: 8, color: style.color }}
                >
                  3
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('xy')}
            onPress={() => btnClick('xy')}
            func="xy"
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>x</Text>
                <Text
                  style={{ marginBottom: 12, fontSize: 8, color: style.color }}
                >
                  y
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('ex')}
            onPress={() => btnClick('ex')}
            func="ex"
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>e</Text>
                <Text
                  style={{ marginBottom: 12, fontSize: 8, color: style.color }}
                >
                  x
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('10x')}
            onPress={() => btnClick('10x')}
            func="10x"
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>10</Text>
                <Text
                  style={{ marginBottom: 12, fontSize: 8, color: style.color }}
                >
                  x
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            style={{
              fontSize: 20,
              ...(nextResultNumsCountToReady === 7
                ? { backgroundColor: triggerColor }
                : {}),
            }}
            onPressIn={() => btnStartPress('7')}
            onPress={() => btnClick('7')}
            func="7"
          />
          <HorizontalButton
            theme={settings.theme}
            style={
              nextResultNumsCountToReady === 8
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPressIn={() => btnStartPress('8')}
            onPress={() => btnClick('8')}
            func="8"
          />
          <HorizontalButton
            theme={settings.theme}
            style={
              nextResultNumsCountToReady === 9
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPressIn={() => btnStartPress('9')}
            onPress={() => btnClick('9')}
            func="9"
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('*')}
            onPress={() => btnClick('*')}
            func="􀅾"
            colorNum={2}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('1/x')}
            onPress={() => btnClick('1/x')}
            func="1/x"
            iconName="1/x"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('2sqrx')}
            onPress={() => btnClick('2sqrx')}
            func="2sqrx"
            iconName="2sqrx"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('3sqrx')}
            onPress={() => btnClick('3sqrx')}
            func="3sqrx"
            iconName={'3sqrx'}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('ysqrx')}
            onPress={() => btnClick('ysqrx')}
            func="ysqrx"
            iconName={'ysqrx'}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('ln')}
            onPress={() => btnClick('ln')}
            func="ln"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('log10')}
            onPress={() => btnClick('log10')}
            func="log10"
            component={({ style }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginTop: 10,
                }}
              >
                <Text style={style}>log</Text>
                <Text
                  style={{ marginBottom: -12, fontSize: 8, color: style.color }}
                >
                  10
                </Text>
              </View>
            )}
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            style={
              nextResultNumsCountToReady === 4
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPressIn={() => btnStartPress('4')}
            onPress={() => btnClick('4')}
            func="4"
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('5')}
            onPress={() => btnClick('5')}
            style={
              nextResultNumsCountToReady === 5
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="5"
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('6')}
            onPress={() => btnClick('6')}
            style={
              nextResultNumsCountToReady === 6
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="6"
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('-')}
            onPress={() => btnClick('-')}
            func="—"
            // titleStyle={{ fontSize: 18 }}
            colorNum={2}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('x!')}
            onPress={() => btnClick('x!')}
            func="x!"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('sin')}
            onPress={() => btnClick('sin')}
            func="sin"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('cos')}
            onPress={() => btnClick('cos')}
            func="cos"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('tan')}
            onPress={() => btnClick('tan')}
            func="tan"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('e')}
            onPress={() => btnClick('e')}
            func="e"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('ee')}
            onPress={() => btnClick('ee')}
            func="EE"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('1')}
            onPress={() => btnClick('1')}
            style={
              nextResultNumsCountToReady === 1
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="1"
            onLongPress={() => {
              if (!trigger && !secondArg && !firstArg) {
                updateSettings({ forceType: 'date' })
                ToastAndroid.show('Режим: Дата', ToastAndroid.SHORT)
              }
            }}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('2')}
            onPress={() => btnClick('2')}
            style={
              nextResultNumsCountToReady === 2
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="2"
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
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('3')}
            onPress={() => btnClick('3')}
            style={
              nextResultNumsCountToReady === 3
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="3"
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
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('+')}
            onPress={() => btnClick('+')}
            func="+"
            titleStyle={{ fontSize: 24, marginTop: -3 }}
            colorNum={2}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('deg')}
            onPress={() => btnClick('deg')}
            func="Deg"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('sinh')}
            onPress={() => btnClick('sinh')}
            func="sinh"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('cosh')}
            onPress={() => btnClick('cosh')}
            func="cosh"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('tanh')}
            onPress={() => btnClick('tanh')}
            func="tanh"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('pi')}
            onPress={() => btnClick('pi')}
            func="π"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('rand')}
            onPress={() => btnClick('rand')}
            func="Rand"
            colorNum={3}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('0')}
            onPress={() => btnClick('0')}
            style={
              nextResultNumsCountToReady === 0
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="0"
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
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress(',')}
            onPress={() => btnClick(',')}
            func=","
            // titleStyle={{ fontSize: 20 }}

            onLongPress={() => {
              if (!trigger) {
                updateSettings({ forceType: 'number', forceNumber: text })
                ToastAndroid.show(`Режим: Число (${text})`, ToastAndroid.SHORT)
              }
            }}
          />
          <HorizontalButton
            theme={settings.theme}
            onPressIn={() => btnStartPress('=')}
            onPress={() => btnClick('=')}
            func="="
            titleStyle={{ fontSize: 22 }}
            colorNum={2}
          />
        </View>
      </View>
    </>
  )
}

export default CalcHorizontal

const styles = StyleSheet.create({
  bottonsRow: {
    display: 'flex',
    flexDirection: 'row',
    // flex: 1,
    height: '20%',
  },
  trigger: {
    backgroundColor: '#c6c6c8',
  },
})
