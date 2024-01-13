import { Text, View } from 'react-native'
import React from 'react'
import { MainStyle as style } from '../styles/MainStyle'


export const ContentCard = ({ item }) => {
    return (
      <View style={[{ backgroundColor: item.backgroundColor }, style.card]}>
        <Text style={[{ color: item.textColor }, style.cardTitle]}>{item.name}</Text>
        <Text style={[{ color: item.textColor }, style.cardSubtitle]}>{item.place}</Text>
      </View>
    );
  };