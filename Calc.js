import React, { useState } from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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

const NumButton = ({ title, style = {}, onPress, big = false }) => (
  <TouchableOpacity
    onPress={onPress}
    style={big ? styles.bigNumButton : styles.numButton}
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
      <Text style={{ ...styles.numButtonText, ...style }}>{title}</Text>
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
    if (!nextResultIsPrepared) setMinus(!minus)
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

  const addChar = (char) => {
    let activeText = text

    if (nextResultIsPrepared) {
      let secondArgTemp
      if (startNewNumber) {
        secondArgTemp = result[0]
        setText(secondArgTemp)
        setSecondArg(parseFloat(secondArgTemp) * (minus ? -1 : 1))
        setStartNewNumber(false)
        setMinus(false)
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
        setMinus(false)
        return
      }
      const secongArgString = String(Math.abs(secondArg))
      if (
        startNewNumber ||
        secongArgString.length < (secongArgString.includes(',') ? 10 : 9)
      ) {
        const newText = (startNewNumber ? '' : text) + char
        setText(newText)

        if (startNewNumber) {
          setSecondArg(parseFloat(newText.replace(',', '.')))
          setMinus(false)
          setStartNewNumber(false)
        } else {
          setSecondArg(parseFloat(newText.replace(',', '.')) * (minus ? -1 : 1))
        }
      }
    }
  }

  const deleteChar = () => setText(text.substr(0, text.length - 1))

  const getResult = () => {
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
              backgroundColor: neededFunc === '+' ? 'green' : 'red',
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
          {String(firstArg ?? 0) +
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
            onPress={() => setNextResultIsPrepared((state) => !state)}
          >
            {(minus ? '-' : '') + formatText(text, separateChar)}
          </Text>
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
          <NumButton onPress={() => addChar('7')} title="7" />
          <NumButton onPress={() => addChar('8')} title="8" />
          <NumButton onPress={() => addChar('9')} title="9" />
          <FuncButton
            onPress={() => useFunc('*')}
            title="×"
            active={activeFunc === '*'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton onPress={() => addChar('4')} title="4" />
          <NumButton onPress={() => addChar('5')} title="5" />
          <NumButton onPress={() => addChar('6')} title="6" />
          <FuncButton
            onPress={() => useFunc('-')}
            title="-"
            active={activeFunc === '-'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton onPress={() => addChar('1')} title="1" />
          <NumButton onPress={() => addChar('2')} title="2" />
          <NumButton onPress={() => addChar('3')} title="3" />
          <FuncButton
            onPress={() => useFunc('+')}
            title="+"
            active={activeFunc === '+'}
          />
        </View>
        <View style={styles.bottonsRow}>
          <NumButton onPress={() => addChar('0')} title="0" big />
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
