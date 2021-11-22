import React, { useState } from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import GestureRecognizer from 'react-native-swipe-gestures'
import formatDateTime from './helpers/formatDateTime'

const formatText = (text, separateChar) => {
  if (!text) return '0'
  const endIndex = text.includes(',') ? text.indexOf(',') : text.length

  let newText = text

  if (endIndex > 3) {
    newText =
      newText.slice(0, endIndex - 3) +
      separateChar +
      newText.slice(endIndex - 3)
  }
  if (endIndex > 6) {
    newText =
      newText.slice(0, endIndex - 6) +
      separateChar +
      newText.slice(endIndex - 6)
  }
  return newText
}

const FuncButton = ({
  title,
  style = {},
  onPress,
  active = false,
  alt = false,
  onLongPress,
}) => {
  let timer
  const setTimer = () => {
    timer = setTimeout(() => onLongPress(), 2000)
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={alt ? styles.altFuncButton : styles.funcButton}
      onLongPress={() => onLongPress && setTimer()}
      onPressOut={() => onLongPress && timer && clearTimeout(timer)}
      //  onLongPress={ () => console.warn('STARTED LONG PRESS') }
      activeOpacity={0.2}
    >
      <View
        style={{
          borderWidth: active ? 1 : 0.5,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            ...(alt ? styles.altFuncButtonText : styles.funcButtonText),
            ...style,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const NumButton = ({
  title,
  style = {},
  textStyle = {},
  onPress,
  big = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ ...(big ? styles.bigNumButton : styles.numButton), ...style }}
  >
    <View
      style={{
        borderWidth: 0.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ ...styles.numButtonText, ...textStyle }}>{title}</Text>
    </View>
  </TouchableOpacity>
)

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
}

const calcArgs = (firstArg = 0, secondArg = 0, func) => {
  switch (func) {
    case '+':
      return parseFloat(firstArg) + parseFloat(secondArg)
    case '-':
      return parseFloat(firstArg) - parseFloat(secondArg)
    case '*':
      return parseFloat(firstArg) * parseFloat(secondArg)
    case '/':
      return parseFloat(firstArg) / parseFloat(secondArg)
    default:
      return 0
  }
}

export default function Calc({ goToSettings, settings, separateChar = '.' }) {
  const [text, setText] = useState('0')
  const [firstArg, setFirstArg] = useState(null)
  const [secondArg, setSecondArg] = useState(null)
  const [minus, setMinus] = useState(false)
  const [startNewNumber, setStartNewNumber] = useState(true)
  const [activeFunc, setActiveFunc] = useState(null)
  const [nextResultIsPrepared, setNextResultIsPrepared] = useState(false)

  let result
  let preparedResult
  let neededFunc = '+'
  if (nextResultIsPrepared) {
    if (settings.forceType === 'date')
      preparedResult = formatDateTime(
        Date.now() + settings.forceDateDelay * 1000
      )
    if (settings.forceType === 'number') preparedResult = settings.forceNumber

    result = String(Number(preparedResult) - firstArg)
    if (result < 0) {
      neededFunc = '-'
      result = String(-result)
    }
  }

  const calcPercent = () =>
    setText(
      text
        ? String(parseFloat(text.replace(',', '.')) / 100).replace('.', ',')
        : '0'
    )

  const toggleMinus = () => {
    if (!nextResultIsPrepared) {
      if (startNewNumber) {
        setText('0')
        setMinus(true)
        setSecondArg(0)
      } else {
        setMinus(!minus)
        setSecondArg(Math.abs(secondArg) * (!minus ? -1 : 1))
      }
      setStartNewNumber(false)
    }
  }

  const useFunc = (func) => {
    if (!nextResultIsPrepared || startNewNumber) {
      if (activeFunc && !startNewNumber) {
        getResult()
      } else {
        setFirstArg(parseFloat(text.replace(',', '.')) * (minus ? -1 : 1))
      }
      setActiveFunc(func)
      setStartNewNumber(true)
      // setMinus(false)
    }
  }

  const nextResultNumsCountToReady = settings.highlightNumber
    ? nextResultIsPrepared
      ? startNewNumber
        ? String(result ?? 0).length
        : (result ?? 0) - (text ? Number(text) : 0) === 0
        ? 0
        : String((result ?? 0) - (text ? Number(text) : 0)).length -
          (text ? text.length : 0)
      : -1
    : -1

  const addChar = (char) => {
    let activeText = text

    if (nextResultIsPrepared) {
      let secondArgTemp
      if (startNewNumber) {
        secondArgTemp = result[0]
        setText(secondArgTemp)
        setSecondArg(parseFloat(secondArgTemp) * (minus ? -1 : 1))
        setStartNewNumber(false)

        // setMinus(false)
      } else {
        if (activeText.length < result.length) {
          secondArgTemp = activeText + result[activeText.length]
          setText(secondArgTemp)
          setSecondArg(
            parseFloat(secondArgTemp.replace(',', '.')) * (minus ? -1 : 1)
          )
          setStartNewNumber(false)
        }
      }
    } else {
      if (char === '0' && (!text || text === '0')) return
      if (char === ',' && (!text || text === '0')) {
        setText('0,')
        setSecondArg(0)
        setStartNewNumber(false)
        // setMinus(false)
        return
      }
      const secongArgString = String(Math.abs(secondArg))
      if (
        startNewNumber ||
        secongArgString.length < (secongArgString.includes(',') ? 10 : 9)
      ) {
        const newText = (startNewNumber || text === '0' ? '' : text) + char
        setText(newText)

        if (startNewNumber) {
          setMinus(false)
          setSecondArg(parseFloat(newText.replace(',', '.')))
          setMinus(false)
          setStartNewNumber(false)
        } else {
          setSecondArg(parseFloat(newText.replace(',', '.')) * (minus ? -1 : 1))
        }
      }
    }
  }

  const deleteChar = () => {
    const newText = text.substr(0, text.length - 1)
    setSecondArg(parseFloat(newText.replace(',', '.')))
    setText(newText)
  }

  const getResult = () => {
    if (!nextResultIsPrepared || text.length >= result.length) {
      if (nextResultIsPrepared) setNextResultIsPrepared(false)
      if (!activeFunc) return
      const calcResult = calcArgs(firstArg, secondArg, activeFunc)
      let result = String(Math.abs(calcResult)).replace('.', ',')

      // Обрезаем лишние цифры что не влезли
      if (result.includes(',')) result = result.substr(0, 10)
      else result = result.substr(0, 9)
      setFirstArg(calcResult)
      setText(result)
      setStartNewNumber(true)
      setMinus(calcResult < 0)
    }
  }

  const reset = () => {
    if (!nextResultIsPrepared) {
      setActiveFunc(null)
      setText('0')
      setNextResultIsPrepared(false)
      setStartNewNumber(true)
      setMinus(false)
      setFirstArg(0)
      setSecondArg(0)
    }
  }

  console.log(`nextResultNumsCountToReady`, nextResultNumsCountToReady)

  return (
    <View
      style={{
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
        flex: 1,
      }}
    >
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
        {nextResultIsPrepared && (
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
          onPress={() => setNextResultIsPrepared((state) => !state)}
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
          <Text
            style={{
              // flex: 1,
              color: settings.isDarkTheme ? 'white' : 'black',
              width: '100%',
              // backgroundColor: 'black',
              // borderWidth: 1,
              // borderColor: 'red',
              fontSize: 88,
              textAlign: 'right',
              // fontWeight: '300',

              fontFamily: 'helvetica-thin',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
            // onPress={() => {
            //   if (!nextResultIsPrepared)
            //     setNextResultIsPrepared((state) => !state)
            // }}
          >
            {(minus ? '-' : '') + formatText(text, separateChar)}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!nextResultIsPrepared)
                setNextResultIsPrepared((state) => !state)
            }}
          >
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
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.bottonsRow}>
          <FuncButton
            onPress={reset}
            onLongPress={goToSettings}
            title={!secondArg && !firstArg ? 'AC' : 'C'}
            alt
          />
          <FuncButton onPress={toggleMinus} title="±" alt />
          <FuncButton
            onPress={() => {
              if (!nextResultIsPrepared) calcPercent()
            }}
            title="%"
            alt
          />
          <FuncButton
            onPress={() => useFunc('/')}
            title="÷"
            active={activeFunc === '/'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton
            style={nextResultNumsCountToReady === 7 ? styles.trigger : {}}
            onPress={() => addChar('7')}
            title="7"
          />
          <NumButton
            style={nextResultNumsCountToReady === 8 ? styles.trigger : {}}
            onPress={() => addChar('8')}
            title="8"
          />
          <NumButton
            style={nextResultNumsCountToReady === 9 ? styles.trigger : {}}
            onPress={() => addChar('9')}
            title="9"
          />
          <FuncButton
            onPress={() => useFunc('*')}
            title="×"
            active={activeFunc === '*'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton
            style={nextResultNumsCountToReady === 4 ? styles.trigger : {}}
            onPress={() => addChar('4')}
            title="4"
          />
          <NumButton
            style={nextResultNumsCountToReady === 5 ? styles.trigger : {}}
            onPress={() => addChar('5')}
            title="5"
          />
          <NumButton
            style={nextResultNumsCountToReady === 6 ? styles.trigger : {}}
            onPress={() => addChar('6')}
            title="6"
          />
          <FuncButton
            onPress={() => useFunc('-')}
            title="-"
            active={activeFunc === '-'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton
            style={nextResultNumsCountToReady === 1 ? styles.trigger : {}}
            onPress={() => addChar('1')}
            title="1"
          />
          <NumButton
            style={nextResultNumsCountToReady === 2 ? styles.trigger : {}}
            onPress={() => addChar('2')}
            title="2"
          />
          <NumButton
            style={nextResultNumsCountToReady === 3 ? styles.trigger : {}}
            onPress={() => addChar('3')}
            title="3"
          />
          <FuncButton
            onPress={() => useFunc('+')}
            title="+"
            active={activeFunc === '+'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton
            style={nextResultNumsCountToReady === 0 ? styles.trigger : {}}
            onPress={() => addChar('0')}
            title="0"
            big
          />
          <NumButton
            onPress={() => {
              if (!text.includes(',')) addChar(',')
            }}
            title=","
          />
          <FuncButton onPress={getResult} title="=" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottonsRow: {
    flexDirection: 'row',
  },
  funcButton: {
    flex: 1,
    backgroundColor: '#ff9933',
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    aspectRatio: 1,
    fontFamily: 'helvetica-thin',
    // borderColor: '#333333',
    // borderWidth: 1,
  },
  altFuncButton: {
    flex: 1,
    backgroundColor: '#bbbbbb',
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    aspectRatio: 1,
    fontFamily: 'helvetica-thin',
    // borderColor: '#333333',
    // borderWidth: 1,
  },
  numButton: {
    flex: 1,
    backgroundColor: '#cccccc',
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    aspectRatio: 1,
    fontFamily: 'helvetica-thin',
    // borderColor: '#333333',
    // borderWidth: 1,
  },
  bigNumButton: {
    flex: 2,
    backgroundColor: '#cccccc',
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    aspectRatio: 2,
    fontFamily: 'helvetica-thin',
    // borderColor: '#333333',
    // borderWidth: 1,
  },
  numButtonText: {
    fontSize: 32,
    color: '#222222',
    fontFamily: 'helvetica-light',
  },
  trigger: {
    backgroundColor: '#c6c6c8',
  },
  funcButtonText: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'helvetica-light',
  },
  altFuncButtonText: {
    fontSize: 30,
    color: '#222222',
    fontFamily: 'helvetica-thin',
  },
})
