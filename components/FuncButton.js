import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  // StyleSheet,
  // Image,
} from 'react-native'

import { useRecoilState, useRecoilValue } from 'recoil'
import pressedButtonAtomFamily from '../state/atoms/pressedButtonAtomFamily'
import pressedTriggeredButtonAtom from '../state/atoms/pressedTriggeredButtonAtom'
import triggerAtom from '../state/atoms/triggerAtom'

import {
  // IconH1,
  // IconH2,
  // IconH3,
  // IconH4,
  // IconH5,
  // IconH6,
  // IconH7,
  // IconH8,
  // IconH9,
  // IconH10,
  // IconH11,
  // IconH12,
  // IconH13,
  // IconH14,
  // IconH15,
  // IconH16,
  // IconH17,
  // IconH18,
  // IconH19,
  // IconH20,
  IconH21,
  IconH22,
  IconH23,
  IconH24,
  // IconH25,
  // IconH26,
  // IconH27,
  // IconH28,
  // IconH29,
  // IconH30,
  // IconH31,
  // IconH32,
  // IconH33,
  // IconH34,
  // IconH35,
  // IconH36,
  // IconH37,
  // IconH38,
  // IconH39,
  // IconH40,
  // IconH41,
  // IconH42,
  // IconH43,
  // IconH44,
  // IconH45,
  // IconH46,
  // IconH47,
  // IconH48,
  // IconH49,
} from '../svgH'
import {
  IconV1,
  IconV1_1,
  IconV2,
  IconV3,
  IconV4,
  IconV5,
  IconV6,
  IconV7,
  IconV8,
  IconV9,
  IconV10,
  IconV11,
  IconV12,
  IconV13,
  IconV14,
  IconV15,
  IconV16,
  IconV17,
  IconV18,
  IconV19,
} from '../svgV'
import settingsAtom from '../state/atoms/settingsAtom'

const icons = {
  h: {
    // '(': <IconH1 fill="#000000" height="100%" />,
    // ')': <IconH2 fill="#000000" height="100%" />,
    // mc: <IconH3 fill="#000000" height="100%" />,
    // 'm+': <IconH4 fill="#000000" height="100%" />,
    // 'm-': <IconH5 fill="#000000" height="100%" />,
    // mr: <IconH6 fill="#000000" height="100%" />,
    // AC: <IconH7 fill="#000000" height="100%" />,
    // '+-': <IconH8 fill="#000000" height="100%" />,
    // '%': <IconH9 fill="#000000" height="100%" />,
    // '/': <IconH10 fill="#000000" height="100%" />,
    // '2nd': <IconH11 fill="#000000" height="100%" />,
    // x2: <IconH12 fill="#000000" height="100%" />,
    // x3: <IconH13 fill="#000000" height="100%" />,
    // xy: <IconH14 fill="#000000" height="100%" />,
    // ex: <IconH15 fill="#000000" height="100%" />,
    // '10x': <IconH16 fill="#000000" height="100%" />,
    // 7: <IconH17 fill="#000000" height="100%" />,
    // 8: <IconH18 fill="#000000" height="100%" />,
    // 9: <IconH19 fill="#000000" height="100%" />,
    // '*': <IconH20 fill="#000000" height="100%" />,
    '1/x': (props) => <IconH21 height="100%" {...props} />,
    '2sqrx': (props) => <IconH22 height="100%" {...props} />,
    '3sqrx': (props) => <IconH23 height="100%" {...props} />,
    ysqrx: (props) => <IconH24 height="100%" {...props} />,
    // ln: <IconH25 fill="#000000" height="100%" />,
    // log10: <IconH26 fill="#000000" height="100%" />,
    // 4: <IconH27 fill="#000000" height="100%" />,
    // 5: <IconH28 fill="#000000" height="100%" />,
    // 6: <IconH29 fill="#000000" height="100%" />,
    // '-': <IconH30 fill="#000000" height="100%" />,
    // 'x!': <IconH31 fill="#000000" height="100%" />,
    // sin: <IconH32 fill="#000000" height="100%" />,
    // cos: <IconH33 fill="#000000" height="100%" />,
    // tan: <IconH34 fill="#000000" height="100%" />,
    // e: <IconH35 fill="#000000" height="100%" />,
    // ee: <IconH36 fill="#000000" height="100%" />,
    // 1: <IconH37 fill="#000000" height="100%" />,
    // 2: <IconH38 fill="#000000" height="100%" />,
    // 3: <IconH39 fill="#000000" height="100%" />,
    // '+': <IconH40 fill="#000000" height="100%" />,
    // deg: <IconH41 fill="#000000" height="100%" />,
    // sinh: <IconH42 fill="#000000" height="100%" />,
    // cosh: <IconH43 fill="#000000" height="100%" />,
    // tanh: <IconH44 fill="#000000" height="100%" />,
    // pi: <IconH45 fill="#000000" height="100%" />,
    // rand: <IconH46 fill="#000000" height="100%" />,
    // 0: <IconH47 fill="#000000" height="100%" />,
    // ',': <IconH48 fill="#000000" height="100%" />,
    // '=': <IconH49 fill="#000000" height="100%" />,
  },
  v: {
    AC: (props) => <IconV1 fill="#000000" height="100%" {...props} />,
    C: (props) => <IconV1_1 fill="#000000" height="100%" {...props} />,
    '+-': (props) => <IconV2 fill="#000000" height="100%" {...props} />,
    '%': (props) => <IconV3 fill="#000000" height="100%" {...props} />,
    '/': (props) => <IconV4 fill="#ffffff" height="100%" {...props} />,
    7: (props) => <IconV5 fill="#000000" height="100%" {...props} />,
    8: (props) => <IconV6 fill="#000000" height="100%" {...props} />,
    9: (props) => <IconV7 fill="#000000" height="100%" {...props} />,
    '*': (props) => <IconV8 fill="#ffffff" height="100%" {...props} />,
    4: (props) => <IconV9 fill="#000000" height="100%" {...props} />,
    5: (props) => <IconV10 fill="#000000" height="100%" {...props} />,
    6: (props) => <IconV11 fill="#000000" height="100%" {...props} />,
    '-': (props) => <IconV12 fill="#ffffff" height="100%" {...props} />,
    1: (props) => <IconV13 fill="#000000" height="100%" {...props} />,
    2: (props) => <IconV14 fill="#000000" height="100%" {...props} />,
    3: (props) => <IconV15 fill="#000000" height="100%" {...props} />,
    '+': (props) => <IconV16 fill="#ffffff" height="100%" {...props} />,
    0: (props) => <IconV17 fill="#000000" height="100%" {...props} />,
    ',': (props) => <IconV18 fill="#000000" height="100%" {...props} />,
    '=': (props) => <IconV19 fill="#ffffff" height="100%" {...props} />,
  },
}
// Number and "," / C +- % / func / otherHorizontal
const colors = {
  classic: [
    ['#d2d3d5', 'black'],
    ['#c4c5c7', 'black'],
    ['#f88a11', 'white'],
    ['#c4c5c7', 'black'],
  ],
  standart: [
    ['#313131', 'white'],
    ['#9f9f9f', 'black'],
    ['#ee9800', 'white'],
    ['#202020', 'white'],
  ],
}

const FuncButton = ({
  func,
  iconName,
  component,
  style = {},
  onPress,
  onPressIn,
  onPressOut,
  active = false,
  alt = false,
  onLongPress = () => {},
  square = false,
  colorNum = 0,
  big = false,
  orientation = 'v',
  titleStyle = {},
  theme = 'standart',
  // isDarkTheme,
  width,
  height,
  shortLongPress = false,
}) => {
  const settings = useRecoilValue(settingsAtom)
  const [pressed, setPressed] = useState(false)
  const [pressedTriggeredButton, setPressedTriggeredButton] = useRecoilState(
    pressedTriggeredButtonAtom
  )
  const trigger = useRecoilValue(triggerAtom)

  // const colorTheme = isDarkTheme ? 'dark' : 'light'

  // const timer = useRef(null)
  // const setTimer = () => {
  //   timer.current = setTimeout(() => {
  //     if (onLongPress) onLongPress()
  //   }, 2000)
  // }

  // const clearTimer = () => timer?.current && clearTimeout(timer.current)

  const fadeAnim = useRef(new Animated.Value(1)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    // if (!trigger) {
    setPressed(true)
    onPressIn && onPressIn()
    // }
    // else
    // {

    // }
    // setIsButtonPressed && setIsButtonPressed(func)
    // Animated.timing(fadeAnim, {
    //   toValue: 0.88,
    //   duration: 0,
    //   useNativeDriver: true,
    // }).start()
  }

  if (
    ((!trigger || !settings.pressTriggerButtons) && pressed) ||
    (settings.pressTriggerButtons && trigger && pressedTriggeredButton === func)
  ) {
    Animated.timing(fadeAnim, {
      toValue: 0.84,
      duration: 0,
      useNativeDriver: true,
    }).start()
  } else {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    setPressed(false)
    if (trigger) {
      setPressedTriggeredButton(null)
    }
    onPressOut && onPressOut()
    // setIsButtonPressed && setIsButtonPressed(null)
  }

  const itsNumber = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ',',
  ].includes(func)

  useEffect(() => {
    fadeOut()
  }, [iconName, func])

  // console.log('fadeAnim :>> ', fadeAnim)
  // console.log('func :>> ', func)
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        position: 'relative',
        flex: big ? 2 : 1,
        width: width,
        height: height,
        // width: '25%',
        aspectRatio: square ? (big ? 2 : 1) : null,
        // borderRadius: theme === 'standart' ? 200 : 0,
        // padding: theme === 'standart' ? 7 : 0,
        // opacity: isTouched ? 0.88 : 1,
        // borderColor: 'red',
        // borderWidth: 1,
      }}
      //  style={[styles.modelView]}
      onLongPress={typeof onLongPress === 'function' ? onLongPress : undefined}
      onPress={() => {
        onPress()
      }}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      // onTouchStart={() => {
      //   fadeIn()
      //   console.log('onTouchStart :>> ')
      // }}
      // onTouchEnd={() => {
      //   fadeOut()
      //   console.log('onTouchEnd :>> ')
      // }}
      delayLongPress={shortLongPress ? 500 : 3000}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        {/* <View
        // style={{
          // fontFamily: 'sf-regular',
          // position: 'relative',
          // flex: big ? 2 : 1,
          // justifyContent: 'center',

          // aspectRatio: square ? (big ? 2 : 1) : null,
          // borderRadius: theme === 'standart' ? 200 : 0,
          // padding: theme === 'standart' ? 7 : 0,
          // opacity: isTouched ? 0.88 : 1,
          // borderColor: 'red',
          // borderWidth: 1,
          // opacity: fadeAnim,
        // }}
        // onTouchStart={() => {
        //   // onLongPress && setTimer()
        //   fadeIn()
        //   // onPress && onPress()
        //   // if (onLongPress) {
        //   setTimer()
        //   // }
        // }}
        // onTouchEnd={() => {
        //   onTouchEnd && onTouchEnd()

        //   // onLongPress && timer && clearTimeout(timer)
        //   fadeOut()
        //   // setIsTouched(false)
        //   // if (onLongPress) {
        //   console.log('timer.current :>> ', timer.current)
        //   if (timer.current && onPress) onPress()
        //   clearTimer()
        //   // }
        // }}
        // onLongPress={() => {
        //   console.log('onLongPress')
        //   onLongPress && setTimer()
        // }}
        // onPressOut={() => {
        //   console.log('onPressOut')
        //   onLongPress && timer && clearTimeout(timer)
        // }}
      // > */}
        {/* <TouchableOpacity
        // onPress={() => console.log('1')}
        // style={{
        //   ...styles.funcButton,
        //   position: 'relative',
        //   flex: big ? 2 : 1,
        //   backgroundColor: colors[colorNum],
        //   aspectRatio: square ? (big ? 2 : 1) : null,
        // }}
        onLongPress={() => onLongPress && setTimer()}
        onPressOut={() => onLongPress && timer && clearTimeout(timer)}
        //  onLongPress={ () => console.warn('STARTED LONG PRESS') }
        activeOpacity={0.88}
      > */}
        <View
          style={{
            position: 'absolute',
            borderWidth: theme === 'classic' ? (active ? 2 : 0.5) : 0,
            width: '100%',
            height: '100%',
            // borderColor: active ? 'black' : '#666666',
            // margin: 1,
          }}
        />
        <View
          style={{
            // borderWidth: active ? 20 : 0.5,
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            // borderColor: '#000000',
            // borderColor: 'red',
            // borderWidth: 1,
            padding: theme === 'standart' ? (orientation === 'h' ? 5 : 7) : 0,
          }}
        >
          {/* {imageSource && (
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={imageSource}
            // resizeMethod="scale"
            resizeMode="cover"
          />
        )} */}

          <View
            style={{
              // borderWidth: 1,
              // display: 'flex',
              width: '100%',
              height: '100%',

              // alignItems: 'center',
              // justifyContent: 'flex-start',
              // borderColor: 'red',
              backgroundColor:
                theme === 'standart'
                  ? active
                    ? 'white'
                    : colors[theme][colorNum][0]
                  : colors[theme][colorNum][0],
              borderRadius: theme === 'standart' ? 200 : 0,
              borderColor: theme === 'standart' ? null : 'black',
              borderWidth: theme === 'standart' ? null : active ? 2 : 0,
              ...style,
            }}
          >
            <View
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                width: big ? '50%' : '100%',
                height: '100%',
                overflow: 'hidden',
                // borderColor: 'blue',
                // borderWidth: 2,
                // borderWidth: 2,
                // borderColor: 'red',
              }}
            >
              {!component && !(iconName && orientation) && (
                <Text
                  style={{
                    fontFamily: 'sf-regular',
                    fontSize: itsNumber ? 22 : 16,
                    color: colors[theme][colorNum][1],
                    // marginTop: itsNumber ? -6 : 0,
                    // borderColor: 'red',
                    // borderWidth: 2,
                    height: '160%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    ...titleStyle,
                  }}
                >
                  {func}
                </Text>
              )}
              {component &&
                component({
                  style: {
                    fontFamily: 'sf-regular',
                    fontSize: 16,
                    // color: colorNum === 2 ? 'white' : 'black',
                    color: colors[theme][colorNum][1],
                    // fill: colors[theme][colorNum][1],
                    marginTop: -1,
                  },
                })}
              {iconName &&
                orientation &&
                icons[orientation][iconName]({
                  height: theme === 'standart' ? '110%' : '90%',
                  // width: '150%',
                  // marginTop: theme === 'standart' ? '-15%' : 0,
                  bold: theme === 'standart',
                  // marginTop: '-20%',
                  fill:
                    theme === 'standart'
                      ? ['c', '+-', '%'].includes(func)
                        ? 'black'
                        : active
                        ? colors['standart'][2][0]
                        : 'white'
                      : ['/', '*', '-', '+', '='].includes(func)
                      ? 'white'
                      : 'black',
                })}
            </View>
          </View>
        </View>
        {/* </TouchableOpacity> */}
        {/* </View> */}
      </Animated.View>
    </TouchableOpacity>
  )
}

export default FuncButton
