import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'
import formatText from '../../helpers/formatText'
import FuncButton from '../FuncButton'

function CalcVertical({
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
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: 'auto',
            minHeight: 80,
            marginHorizontal: 8,
            // backgroundColor: 'blue',
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
                width: '90%',
                position: 'absolute',
                left: '5%',
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
          {/* <FuncButton
            onPress={() => btnClick('c')}
            onLongPress={goToSettings}
            title={!secondArg && !firstArg ? 'AC' : 'c'}
            alt
            square
          /> */}
          <FuncButton
            onPress={() => {
              !trigger && !secondArg && !firstArg && setTimer()
              btnClick('C')
            }}
            func="c"
            // onLongPress={goToSettings}
            iconName={!secondArg && !firstArg ? 'AC' : 'C'}
            colorNum={1}
            onTouchEnd={clearTimer}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('±')}
            func="+-"
            iconName={'+-'}
            colorNum={1}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('%')}
            func="%"
            iconName={'%'}
            colorNum={1}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('÷')}
            func="/"
            iconName={'/'}
            active={highlightFunc === '/'}
            colorNum={2}
            square
            theme={settings.theme}
          />
          {/* <FuncButton onPress={() => btnClick('±')} title="±" alt square />
          <FuncButton onPress={() => btnClick('%')} title="%" alt square />
          <FuncButton
            onPress={() => btnClick('÷')}
            title="÷"
            active={highlightFunc === '/'}
            square
          /> */}
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 7
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('7')}
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
            func="9"
            iconName={'9'}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('*')}
            iconName={'*'}
            func="*"
            colorNum={2}
            active={highlightFunc === '*'}
            square
            theme={settings.theme}
          />
          {/* <NumButton
            style={nextResultNumsCountToReady === 7 ? styles.trigger : {}}
            onPress={() => btnClick('7')}
            title="7"
            square
          />
          <NumButton
            style={nextResultNumsCountToReady === 8 ? styles.trigger : {}}
            onPress={() => btnClick('8')}
            title="8"
            square
          />
          <NumButton
            style={nextResultNumsCountToReady === 9 ? styles.trigger : {}}
            onPress={() => btnClick('9')}
            title="9"
            square
          />
          <FuncButton
            onPress={() => btnClick('*')}
            title="×"
            active={highlightFunc === '*'}
            square
          /> */}
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 4
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('4')}
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
            func="6"
            iconName={'6'}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('-')}
            func="-"
            iconName={'-'}
            active={highlightFunc === '-'}
            colorNum={2}
            square
            theme={settings.theme}
          />
          {/* <NumButton
            style={nextResultNumsCountToReady === 4 ? styles.trigger : {}}
            onPress={() => btnClick('4')}
            title="4"
            square
          />
          <NumButton
            style={nextResultNumsCountToReady === 5 ? styles.trigger : {}}
            onPress={() => btnClick('5')}
            title="5"
            square
          />
          <NumButton
            style={nextResultNumsCountToReady === 6 ? styles.trigger : {}}
            onPress={() => btnClick('6')}
            title="6"
            square
          />
          <FuncButton
            onPress={() => btnClick('-')}
            title="-"
            active={highlightFunc === '-'}
            square
          /> */}
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            style={
              nextResultNumsCountToReady === 1
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('1')}
            func="1"
            iconName={'1'}
            square
            theme={settings.theme}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 2
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('2')}
            func="2"
            iconName={'2'}
            square
            theme={settings.theme}
          />
          <FuncButton
            style={
              nextResultNumsCountToReady === 3
                ? { backgroundColor: triggerColor }
                : {}
            }
            onPress={() => btnClick('3')}
            func="3"
            iconName={'3'}
            square
            theme={settings.theme}
          />
          <FuncButton
            onPress={() => btnClick('+')}
            iconName={'+'}
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
            func="0"
            iconName={'0'}
            square
            theme={settings.theme}
            big
          />
          <FuncButton
            onPress={() => btnClick(',')}
            func=","
            iconName={','}
            square
            theme={settings.theme}
            style={
              nextResultNumsCountToReady >= 10
                ? { backgroundColor: triggerColor }
                : {}
            }
          />
          <FuncButton
            onPress={() => btnClick('=')}
            iconName={'='}
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
