import React from 'react'

import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Button = ({ title, onPress, color = '#ff9933' }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ ...styles.button, backgroundColor: color }}
  >
    <Text style={styles.textButton}>{title}</Text>
  </TouchableOpacity>
)

export default Button

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
  },
  textButton: {
    fontSize: 18,
  },
})
