import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Linking, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export const ContactIcon = ({
  iconName = '',
  backgroundColor = 'gray',
  url = null,
  style = {},
  data = '',
  textColor = 'white',
}) => {
  const IconSizeNum = 24
  const fontSizeNum = 18
  const iconDemention = IconSizeNum + Math.floor(IconSizeNum / 2)
  const IconPadding = Math.floor(IconSizeNum / 16)

  return (
    <TouchableOpacity
      onPress={() => {
        if (url) Linking.openURL(url)
      }}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <View
        style={{
          ...styles.contact,
          width: iconDemention,
          height: iconDemention,
          padding: IconPadding,
          backgroundColor: backgroundColor,
          ...style,
        }}
      >
        <FontAwesome5 name={iconName} size={IconSizeNum} color={'white'} />
      </View>
      {data ? (
        <Text
          style={{ color: textColor, fontSize: fontSizeNum, marginLeft: 10 }}
        >
          {data}
        </Text>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: { width: '100%', marginTop: 3 },
  contact: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
})
