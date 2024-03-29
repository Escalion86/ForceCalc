import React, { useCallback } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'
import formatDateTime from '../../helpers/formatDateTime'
import formatText from '../../helpers/formatText'
import FuncButton from '../FuncButton'
import NumButton from '../NumButton'

const HorizontalButton = (props) => <FuncButton orientation="h" {...props} />

function CalcHorizontal({
  btnClick,
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
          backgroundColor: '#202020',
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
          height: '64%',
          marginLeft: 0,
          backgroundColor: '#202020',
        }}
      >
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            func="("
            onPress={() => btnClick('(')}
            // iconName="("
            // title="("
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick(')')}
            // iconName=")"
            func=")"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('mc')}
            // iconName={'mc'}
            func="mc"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('m+')}
            func="m+"
            // iconName={'m+'}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('m-')}
            // iconName={'m-'}
            func="m-"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('mr')}
            // iconName={'mr'}
            func="mr"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => {
              !trigger && !secondArg && !firstArg && setTimer()
              btnClick('C')
            }}
            // onLongPress={goToSettings}
            // iconName="ac"
            func={!secondArg && !firstArg ? 'AC' : 'C'}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('±')}
            // iconName="+-"
            func="􀅺"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('%')}
            // iconName="%"
            func="%"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('÷')}
            active={highlightFunc === '/'}
            colorNum={2}
            // iconName="/"
            func="􀅿"
            onTouchEnd={clearTimer}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: 12, fontSize: 8 }}>nd</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: 12, fontSize: 8 }}>2</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: 12, fontSize: 8 }}>3</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: 12, fontSize: 8 }}>y</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: 12, fontSize: 8 }}>x</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: 12, fontSize: 8 }}>x</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            style={{
              fontSize: 20,
              ...(nextResultNumsCountToReady === 7
                ? { backgroundColor: triggerColor }
                : {}),
            }}
            onPress={() => btnClick('7')}
            func="7"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            style={
              nextResultNumsCountToReady === 8
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('8')}
            func="8"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            style={
              nextResultNumsCountToReady === 9
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('9')}
            func="9"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('*')}
            func="􀅾"
            colorNum={2}
            onTouchEnd={clearTimer}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('1/x')}
            func="1/x"
            iconName="1/x"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('2sqrx')}
            func="2sqrx"
            iconName="2sqrx"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('3sqrx')}
            func="3sqrx"
            iconName={'3sqrx'}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('ysqrx')}
            func="ysqrx"
            iconName={'ysqrx'}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('ln')}
            func="ln"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
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
                <Text style={{ marginBottom: -12, fontSize: 8 }}>10</Text>
              </View>
            )}
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            style={
              nextResultNumsCountToReady === 4
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('4')}
            func="4"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('5')}
            style={
              nextResultNumsCountToReady === 5
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="5"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('6')}
            style={
              nextResultNumsCountToReady === 6
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="6"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('-')}
            func="—"
            // titleStyle={{ fontSize: 18 }}
            colorNum={2}
            onTouchEnd={clearTimer}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('x!')}
            func="x!"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('sin')}
            func="sin"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('cos')}
            func="cos"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('tan')}
            func="tan"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('e')}
            func="e"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('ee')}
            func="EE"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('1')}
            style={
              nextResultNumsCountToReady === 1
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="1"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('2')}
            style={
              nextResultNumsCountToReady === 2
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="2"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('3')}
            style={
              nextResultNumsCountToReady === 3
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="3"
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('+')}
            func="+"
            titleStyle={{ fontSize: 24, marginTop: -3 }}
            colorNum={2}
            onTouchEnd={clearTimer}
          />
        </View>
        <View style={styles.bottonsRow}>
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('deg')}
            func="Deg"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('sinh')}
            func="sinh"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('cosh')}
            func="cosh"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('tanh')}
            func="tanh"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('pi')}
            func="π"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('rand')}
            func="Rand"
            colorNum={1}
            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('0')}
            style={
              nextResultNumsCountToReady === 0
                ? { backgroundColor: triggerColor }
                : {}
            }
            func="0"
            big
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick(',')}
            func=","
            // titleStyle={{ fontSize: 20 }}

            onTouchEnd={clearTimer}
          />
          <HorizontalButton
            theme={settings.theme}
            onPress={() => btnClick('=')}
            func="="
            titleStyle={{ fontSize: 22 }}
            colorNum={2}
            onTouchEnd={clearTimer}
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
