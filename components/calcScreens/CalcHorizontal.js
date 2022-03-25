import React from 'react'
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
          // backgroundColor: 'black',
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
                color: settings.isDarkTheme ? 'white' : 'black',
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
          height: '70%',
          marginLeft: 0,
          backgroundColor: 'white',
        }}
      >
        <View style={styles.bottonsRow}>
          <FuncButton onPress={() => btnClick('(')} iconName="(" colorNum={1} />
          <FuncButton onPress={() => btnClick(')')} iconName=")" colorNum={1} />
          <FuncButton
            onPress={() => btnClick('mc')}
            iconName={'mc'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m+')}
            iconName={'m+'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m-')}
            iconName={'m-'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'mr'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('c')}
            onLongPress={goToSettings}
            iconName="ac"
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('±')}
            iconName="+-"
            colorNum={1}
          />
          <FuncButton onPress={() => btnClick('%')} iconName="%" colorNum={1} />
          <FuncButton
            onPress={() => btnClick('÷')}
            active={highlightFunc === '/'}
            colorNum={1}
            iconName="/"
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            onPress={() => btnClick('(')}
            iconName={'2nd'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick(')')}
            iconName={'x2'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mc')}
            iconName={'x3'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m+')}
            iconName={'xy'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m-')}
            iconName={'ex'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'10x'}
            colorNum={1}
          />
          <FuncButton onPress={() => btnClick('mr')} iconName={'7'} />
          <FuncButton onPress={() => btnClick('mr')} iconName={'8'} />
          <FuncButton onPress={() => btnClick('mr')} iconName={'9'} />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'*'}
            colorNum={2}
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            onPress={() => btnClick('(')}
            iconName={'1/x'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick(')')}
            iconName={'2sqrx'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mc')}
            iconName={'3sqrx'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m+')}
            iconName={'ysqrx'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m-')}
            iconName={'ln'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'log10'}
            colorNum={1}
          />
          <FuncButton onPress={() => btnClick('mr')} iconName={'4'} />
          <FuncButton onPress={() => btnClick('mr')} iconName={'5'} />
          <FuncButton onPress={() => btnClick('mr')} iconName={'6'} />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'-'}
            colorNum={2}
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            onPress={() => btnClick('(')}
            iconName={'x!'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick(')')}
            iconName={'sin'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mc')}
            iconName={'cos'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m+')}
            iconName={'tan'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m-')}
            iconName={'e'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'ee'}
            colorNum={1}
          />
          <FuncButton onPress={() => btnClick('mr')} iconName={'1'} />
          <FuncButton onPress={() => btnClick('mr')} iconName={'2'} />
          <FuncButton onPress={() => btnClick('mr')} iconName={'3'} />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'+'}
            colorNum={2}
          />
        </View>
        <View style={styles.bottonsRow}>
          <FuncButton
            onPress={() => btnClick('(')}
            iconName={'deg'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick(')')}
            iconName={'sinh'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mc')}
            iconName={'cosh'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m+')}
            iconName={'tanh'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('m-')}
            iconName={'pi'}
            colorNum={1}
          />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'rand'}
            colorNum={1}
          />
          <FuncButton onPress={() => btnClick('mr')} iconName={'0'} big />
          <FuncButton onPress={() => btnClick('mr')} iconName={','} />
          <FuncButton
            onPress={() => btnClick('mr')}
            iconName={'='}
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
    flex: 1,
  },
  trigger: {
    backgroundColor: '#c6c6c8',
  },
})
