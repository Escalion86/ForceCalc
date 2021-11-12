import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'
import formatDateTime from './helpers/formatDateTime'

const onSwipe = (gestureName, gestureState) => {
  const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections
  // this.setState({gestureName: gestureName});
  switch (gestureName) {
    case SWIPE_UP:
      // this.setState({backgroundColor: 'red'});
      console.log(`swipeUp`)
      break
    case SWIPE_DOWN:
      console.log(`swipeDown`)
      break
    case SWIPE_LEFT:
      console.log(`swipeLeft`)
      break
    case SWIPE_RIGHT:
      console.log(`swipeRight`)
      break
  }
}

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

const textToFloat = (text) =>
  text ? parseFloat(text.replace(/[^\,\d]/g, '').replace(',', separateChar)) : 0

const calcPercent = (text) =>
  text ? String(parseFloat(text) / 100).replace(separateChar, ',') : '0'

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
    timer = setTimeout(() => onLongPress(), 3000)
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

export default function Calc({ goToSettings, settings, separateChar = '.' }) {
  const [text, setText] = useState('')
  const [minus, setMinus] = useState(false)
  const [activeFunc, setActiveFunc] = useState(null)
  const [hiddenActiveFunc, setHiddenActiveFunc] = useState(null)
  const [lastUsedFunc, setLastUsedFunc] = useState(null)
  const [prevText, setPrevText] = useState(null)
  const [nextResultIsPrepared, setNextResultIsPrepared] = useState(false)

  // console.log(`nextResultIsPrepared`, nextResultIsPrepared)
  // console.log(`Date.now().getSeconds()`, new Date(Date.now()).getSeconds())
  let result
  let preparedResult
  let neededFunc = '+'
  if (nextResultIsPrepared) {
    if (settings.forceType === 'date')
      preparedResult = formatDateTime(
        Date.now() + settings.forceDateDelay * 1000
      )
    if (settings.forceType === 'number') preparedResult = settings.forceNumber

    result = String(
      Number(preparedResult) - Number(hiddenActiveFunc ? prevText : text)
    )
    if (result < 0) {
      neededFunc = '-'
      result = String(-result)
    }
  }

  const toggleMinus = () => {
    if (!nextResultIsPrepared) setMinus(!minus)
  }

  const useFunc = (func) => {
    if (!nextResultIsPrepared || func === '-' || func === '+') {
      setLastUsedFunc(activeFunc)
      setActiveFunc(func)
    }
  }

  const addChar = (char) => {
    let activeText = text
    if (activeFunc) {
      setHiddenActiveFunc(activeFunc)
      setActiveFunc(null)
      setPrevText(text)
      activeText = '0'
    }

    if (nextResultIsPrepared) {
      if (activeFunc) {
        setText(result[0])
      } else {
        if (activeText.length < result.length)
          setText(activeText + result[activeText.length])
      }
      // setText(
      //   (activeText === '0' ? '' : activeText) +
      //     String(Number(preparedResult) - Number(activeFunc ? text : prevText))[
      //       activeText === '0' ? 0 : activeText.length
      //     ]
      // )
    } else {
      if (
        char === '0' &&
        (!activeText[0] || activeText === '0') &&
        activeText[1] !== ','
      )
        return text !== activeText ? setText(activeText) : null
      if (char === ',' && (!activeText[0] || activeText === '0'))
        return setText('0,')
      if (activeText.length < (activeText.includes(',') ? 10 : 9))
        setText((activeText === '0' ? '' : activeText) + char)
    }
  }

  const deleteChar = () => setText(text.substr(0, text.length - 1))

  const getResult = () => {
    if (!nextResultIsPrepared || result.length === text.length) {
      if (nextResultIsPrepared) setNextResultIsPrepared(false)
      setLastUsedFunc('=')
      let result = '0'
      if (prevText) {
        const prevText2 = prevText
        if (lastUsedFunc !== '=') {
          setPrevText(text)
        }

        if (hiddenActiveFunc === '+')
          result = String(parseFloat(prevText2) + parseFloat(text)).replace(
            separateChar,
            ','
          )

        if (hiddenActiveFunc === '-')
          result = String(parseFloat(prevText2) - parseFloat(text)).replace(
            separateChar,
            ','
          )

        if (hiddenActiveFunc === '*')
          result = String(parseFloat(prevText2) * parseFloat(text)).replace(
            separateChar,
            ','
          )

        if (hiddenActiveFunc === '/')
          result = String(parseFloat(prevText2) / parseFloat(text)).replace(
            separateChar,
            ','
          )
        // }
      } else {
        let prevText2 = text
        if (lastUsedFunc !== '=') {
          setPrevText(text)
          // setLastUsedFunc(hiddenActiveFunc)
        } else {
          prevText2 = prevText
        }

        if (activeFunc === '+')
          result = String(parseFloat(prevText2) + parseFloat(text)).replace(
            separateChar,
            ','
          )

        if (activeFunc === '-')
          result = String(parseFloat(prevText2) - parseFloat(text)).replace(
            separateChar,
            ','
          )

        if (activeFunc === '*')
          result = String(parseFloat(prevText2) * parseFloat(text)).replace(
            separateChar,
            ','
          )

        if (activeFunc === '/')
          result = String(parseFloat(prevText2) / parseFloat(text)).replace(
            separateChar,
            ','
          )
      }

      if (result.includes(',')) result = result.substr(0, 10)
      else result = result.substr(0, 9)

      setText(result)
      setHiddenActiveFunc(null)
      setActiveFunc(null)
    }
  }

  const reset = () => {
    if (!nextResultIsPrepared) {
      setHiddenActiveFunc(null)
      setActiveFunc(null)
      setPrevText(null)
      setMinus(false)
      setText('0')
      setLastUsedFunc(null)
      setNextResultIsPrepared(false)
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
            title={!text || text === '0' ? 'AC' : 'C'}
            alt
          />
          <FuncButton onPress={toggleMinus} title="±" alt />
          <FuncButton
            onPress={() => {
              if (!nextResultIsPrepared) setText(calcPercent())
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
