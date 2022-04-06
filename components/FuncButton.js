import React, { forwardRef, useState, useRef, useEffect } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native'
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
    '1/x': <IconH21 fill="#000000" height="100%" />,
    '2sqrx': <IconH22 fill="#000000" height="100%" />,
    '3sqrx': <IconH23 fill="#000000" height="100%" />,
    ysqrx: <IconH24 fill="#000000" height="100%" />,
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
    AC: <IconV1 fill="#000000" height="100%" />,
    C: <IconV1_1 fill="#000000" height="100%" />,
    '+-': <IconV2 fill="#000000" height="100%" />,
    '%': <IconV3 fill="#000000" height="100%" />,
    '/': <IconV4 fill="#ffffff" height="100%" />,
    7: <IconV5 fill="#000000" height="100%" />,
    8: <IconV6 fill="#000000" height="100%" />,
    9: <IconV7 fill="#000000" height="100%" />,
    '*': <IconV8 fill="#ffffff" height="100%" />,
    4: <IconV9 fill="#000000" height="100%" />,
    5: <IconV10 fill="#000000" height="100%" />,
    6: <IconV11 fill="#000000" height="100%" />,
    '-': <IconV12 fill="#ffffff" height="100%" />,
    1: <IconV13 fill="#000000" height="100%" />,
    2: <IconV14 fill="#000000" height="100%" />,
    3: <IconV15 fill="#000000" height="100%" />,
    '+': <IconV16 fill="#ffffff" height="100%" />,
    0: <IconV17 fill="#000000" height="100%" />,
    ',': <IconV18 fill="#000000" height="100%" />,
    '=': <IconV19 fill="#ffffff" height="100%" />,
  },
}

const colors = ['#d2d3d5', '#c4c5c7', '#f88a11']

const FuncButton = ({
  func,
  iconName,
  component,
  style = {},
  onPress,
  active = false,
  alt = false,
  onLongPress,
  square = false,
  colorNum = 0,
  big = false,
  orientation = 'v',
  isButtonPressed,
  setIsButtonPressed,
  onTouchEnd,
  titleStyle = {},
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    setIsButtonPressed && setIsButtonPressed(func)
    // Animated.timing(fadeAnim, {
    //   toValue: 0.88,
    //   duration: 0,
    //   useNativeDriver: true,
    // }).start()
  }

  if (isButtonPressed === func) {
    Animated.timing(fadeAnim, {
      toValue: 0.88,
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
    setIsButtonPressed && setIsButtonPressed(null)
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

  return (
    <Animated.View
      style={{
        fontFamily: 'sf-regular',
        position: 'relative',
        flex: big ? 2 : 1,
        backgroundColor: colors[colorNum],
        aspectRatio: square ? (big ? 2 : 1) : null,
        // opacity: isTouched ? 0.88 : 1,
        opacity: fadeAnim,
        ...style,
      }}
      onTouchStart={() => {
        // onLongPress && setTimer()
        fadeIn()
        onPress && onPress()
      }}
      onTouchEnd={() => {
        onTouchEnd && onTouchEnd()
        // onLongPress && timer && clearTimeout(timer)
        fadeOut()
        // setIsTouched(false)
      }}
      // onLongPress={() => {
      //   console.log('onLongPress')
      //   onLongPress && setTimer()
      // }}
      // onPressOut={() => {
      //   console.log('onPressOut')
      //   onLongPress && timer && clearTimeout(timer)
      // }}
    >
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
          borderWidth: active ? 2 : 0.5,
          width: '100%',
          height: '100%',
          borderColor: active ? 'black' : '#666666',
        }}
      />
      <View
        style={{
          // borderWidth: active ? 20 : 0.5,
          width: '100%',
          height: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderColor: '#000000',
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
            width: big ? '50%' : '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            // borderColor: 'red',
          }}
        >
          {!component && !(iconName && orientation) && (
            <Text
              style={{
                fontFamily: 'sf-regular',
                fontSize: itsNumber ? 22 : 16,
                color: colorNum === 2 ? 'white' : 'black',
                marginTop: itsNumber ? 0 : -2,
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
                color: colorNum === 2 ? 'white' : 'black',
                marginTop: -2,
              },
            })}
          {iconName && orientation && icons[orientation][iconName]}
        </View>
      </View>
      {/* </TouchableOpacity> */}
    </Animated.View>
  )
}

export default FuncButton
