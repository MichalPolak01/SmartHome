import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState} from 'react'
import { MainStyle as style } from '../styles/MainStyle'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AddDeviceModal } from './AddDeviceModal';

export const AddContentCard = ({ onClose }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    onClose();
  };

  return (
    <>
      <View style={style.card}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={style.cardAddText}>Add new device</Text>
          <AntDesign style={style.icon} name="plus" size={60} color={'#fff'} />  
        </TouchableOpacity>
      </View>
      <AddDeviceModal isVisible={isModalVisible} onClose={toggleModal} />
    </>
  ) 
}