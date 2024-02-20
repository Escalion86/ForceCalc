import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const NumButton = ({
  title,
  style = {},
  textStyle = {},
  onPress,
  big = false,
  square = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...(big
        ? styles.bigNumButton
        : { ...styles.numButton, aspectRatio: square ? 1 : null }),
      ...style,
    }}
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

export default NumButton

const styles = StyleSheet.create({
  numButton: {
    flex: 1,
    backgroundColor: '#cccccc',
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // aspectRatio: 1,
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
})
