import React, { useState, useRef } from 'react'

import { View } from 'react-native'

import formatDateTime from './helpers/formatDateTime'
import CalcVertical from './components/calcScreens/CalcVertical'
import CalcHorizontal from './components/calcScreens/CalcHorizontal'
import decryptText from './helpers/decryptText'
import pressedTriggeredButtonAtom from './state/atoms/pressedTriggeredButtonAtom'
import triggerAtom from './state/atoms/triggerAtom'

import { useSetRecoilState, useRecoilState } from 'recoil'

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

export default function Calc({
  goToSettings,
  settings,
  separateChar = '.',
  updateSettings,
  screenOrientation,
}) {
  const [pressedTriggeredButton, setPressedTriggeredButton] = useRecoilState(
    pressedTriggeredButtonAtom
  )
  console.log('pressedTriggeredButton :>> ', pressedTriggeredButton)
  const [trigger, setTrigger] = useRecoilState(triggerAtom)

  const [text, setText] = useState('0')
  const [firstArg, setFirstArg] = useState(null)
  const [secondArg, setSecondArg] = useState(null)
  const [minus, setMinus] = useState(false)
  const [startNewNumber, setStartNewNumber] = useState(true)
  const [activeFunc, setActiveFunc] = useState(null)
  const [highlightFunc, setHighlightFunc] = useState(null)
  const [triggerFuncIsActive, setTriggerFuncIsActive] = useState(false)
  const [triggerFirstCharIsSet, setTriggerFirstCharIsSet] = useState(false)
  const [neededFunc, setNeededFunc] = useState('+')
  const [neededNumber, setNeededNumber] = useState('')

  const timer = useRef(null)
  const setTimer = () => {
    timer.current = setTimeout(() => {
      goToSettings()
    }, 2000)
  }

  const clearTimer = () => timer?.current && clearTimeout(timer.current)

  let nextResultNumsCountToReady = -1

  if (settings.highlightNumber && trigger) {
    nextResultNumsCountToReady =
      (!startNewNumber && !triggerFuncIsActive) || startNewNumber
        ? String(neededNumber ?? 0).length
        : String(neededNumber ?? 0).length - (text ? text.length : 0)
  }

  const btnStartPress = (char) => {
    console.log('1 :>> ', 1)
    if (trigger) {
      if (!triggerFuncIsActive) {
        // Если до этого небыло набрано ни одной цифры
        if (!secondArg) {
          return (
            settings.pressTriggerButtons &&
            setPressedTriggeredButton(neededNumber[0])
          )
        }
        return (
          settings.pressTriggerButtons && setPressedTriggeredButton(neededFunc)
        )
      }
      if (triggerFuncIsActive) {
        if (!triggerFirstCharIsSet) {
          settings.pressTriggerButtons &&
            setPressedTriggeredButton(neededNumber[0])
        } else {
          if (String(secondArg).length !== String(neededNumber).length) {
            const charToAdd = String(neededNumber)[String(secondArg).length]
            settings.pressTriggerButtons && setPressedTriggeredButton(charToAdd)
          } else if (char === '=') {
            settings.pressTriggerButtons && setPressedTriggeredButton('=')
          }
        }

        return
      }
    }
  }

  const btnClick = (char) => {
    if (trigger) {
      if (!triggerFuncIsActive) {
        // Если до этого небыло набрано ни одной цифры
        if (!secondArg) {
          // settings.pressTriggerButtons &&
          //   setPressedTriggeredButton(neededNumber[0])
          addChar(neededNumber[0])
          setTriggerFuncIsActive(true)
          setTriggerFirstCharIsSet(true)
          return
        }
        useFunc(neededFunc)
        // settings.pressTriggerButtons && setPressedTriggeredButton(neededFunc)
        setTriggerFuncIsActive(true)

        return
      }
      if (triggerFuncIsActive) {
        if (!triggerFirstCharIsSet) {
          // settings.pressTriggerButtons &&
          //   setPressedTriggeredButton(neededNumber[0])
          addChar(neededNumber[0])
          setTriggerFirstCharIsSet(true)
        } else {
          if (String(secondArg).length !== String(neededNumber).length) {
            const charToAdd = String(neededNumber)[String(secondArg).length]
            // settings.pressTriggerButtons && setPressedTriggeredButton(charToAdd)
            addChar(charToAdd)
          } else if (char === '=') {
            setTrigger(false)
            getResult()
            // settings.pressTriggerButtons && setPressedTriggeredButton('=')
          }
        }

        return
      }
    }

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char))
      return addChar(char)
    switch (char) {
      case '±':
        return toggleMinus()
      case '%':
        return calcPercent()
      case '÷':
        return useFunc('/')
      case '+':
        return useFunc('+')
      case '-':
        return useFunc('-')
      case '*':
        return useFunc('*')
      case '=':
        return getResult()
      case ',': {
        if (!text.includes(',')) addChar(',')
        return
      }
      case 'C':
        return reset()
      default:
        return
    }
  }

  const startTrigger = () => {
    if (!trigger) {
      setPressedTriggeredButton(null)
      setTriggerFuncIsActive(false)
      setTriggerFirstCharIsSet(false)
      setTrigger(true)

      let newNeededResult

      if (settings.forceType === 'date')
        newNeededResult = formatDateTime(
          Date.now() + settings.forceDateDelay * 1000,
          settings.dateFormat
        )

      if (settings.forceType === 'cryptotext')
        newNeededResult = decryptText(settings.forceCryptotext)
      if (settings.forceType === 'number')
        newNeededResult = settings.forceNumber

      setNeededNumber(
        String(
          Math.abs(
            Number(newNeededResult) -
              Number(
                !startNewNumber && firstArg && secondArg
                  ? calcArgs(firstArg, secondArg, activeFunc)
                  : firstArg
                  ? firstArg
                  : secondArg
                  ? secondArg
                  : 0
              )
          )
        )
      )

      setNeededFunc(
        Number(newNeededResult) <
          Number(firstArg ? firstArg : secondArg ? secondArg : 0)
          ? '-'
          : '+'
      )
    }
  }

  const calcPercent = () =>
    setText(
      text
        ? String(parseFloat(text.replace(',', '.')) / 100).replace('.', ',')
        : '0'
    )

  const toggleMinus = () => {
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

  const useFunc = (func) => {
    if (activeFunc && !startNewNumber) {
      getResult()
    } else {
      setFirstArg(parseFloat(text.replace(',', '.')) * (minus ? -1 : 1))
    }
    setHighlightFunc(func)
    setActiveFunc(func)
    setStartNewNumber(true)
  }

  const addChar = (char) => {
    if (char === '0' && (!text || text === '0')) return

    setHighlightFunc(null)
    if (char === ',' && (!text || text === '0')) {
      setText('0,')
      setSecondArg(0)
      setStartNewNumber(false)
      return
    }

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

  const deleteChar = () => {
    const newText = text.substr(0, text.length - 1)
    setSecondArg(parseFloat(newText.replace(',', '.')))
    setText(newText)
  }

  const getResult = () => {
    if (!activeFunc) return
    const calcResult = calcArgs(firstArg, secondArg, activeFunc)
    let result = String(Math.abs(calcResult)).replace('.', ',')

    setFirstArg(calcResult)
    setText(result)
    setStartNewNumber(true)
    setMinus(calcResult < 0)
  }

  const reset = () => {
    setActiveFunc(null)
    setHighlightFunc(null)
    setText('0')
    setTrigger(false)
    setStartNewNumber(true)
    setMinus(false)
    setFirstArg(0)
    setSecondArg(0)
  }

  var triggerColor
  if (settings.theme === 'classic' || !settings.theme) {
    if (settings.highlightNumberIntensity === 'veryhigh')
      triggerColor = '#c7c8ca'
    else if (settings.highlightNumberIntensity === 'high')
      triggerColor = '#cacbcc'
    else if (settings.highlightNumberIntensity === 'normal')
      triggerColor = '#cdcdcf'
    else if (settings.highlightNumberIntensity === 'light')
      triggerColor = '#d0d0d2'
  }
  if (settings.theme === 'standart') {
    if (settings.highlightNumberIntensity === 'veryhigh')
      triggerColor = '#3c3c3c'
    else if (settings.highlightNumberIntensity === 'high')
      triggerColor = '#3a3a3a'
    else if (settings.highlightNumberIntensity === 'normal')
      triggerColor = '#383838'
    else if (settings.highlightNumberIntensity === 'light')
      triggerColor = '#363636'
  }

  const calcProps = {
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
    setTimer,
    clearTimer,
    updateSettings,
  }

  return (
    <View
      style={{
        backgroundColor: settings.isDarkTheme ? 'black' : 'white',
        flex: 1,
      }}
    >
      {screenOrientation === 'vertical' ? (
        <CalcVertical {...calcProps} />
      ) : (
        <CalcHorizontal {...calcProps} />
      )}
    </View>
  )
}
