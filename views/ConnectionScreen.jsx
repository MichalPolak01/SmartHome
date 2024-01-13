import { Text, View } from 'react-native'
import React from 'react'
import { MainStyle as style } from '../styles/MainStyle'

export const ConnectionScreen = () => {
  return (
    <View style={[style.body, {justifyContent: 'center'}]}>
      <Text style={style.cardAddText}>ConnectionScreen</Text>
    </View>
  )
}
