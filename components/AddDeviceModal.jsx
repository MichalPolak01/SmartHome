import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { MainStyle as style } from '../styles/MainStyle';
import ColorPicker from 'react-native-wheel-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { ContentCard } from './ContentCard';

export const AddDeviceModal = ({ isVisible, onClose }) => {
  const [inputValues, setInputValues] = useState({
    id: uuid.v4(),
    name: '',
    place: '',
    command: '',
    backgroundColor: '#0456d9',
    textColor: '#fff',
  });

  const saveDataToStorage = async () => {
    try {
      const allDevicesData = await AsyncStorage.getItem('deviceData');
      const parsedAllDevicesData = JSON.parse(allDevicesData) || [];
      
      const existingDevice = parsedAllDevicesData.find(
        (device) => device.name === inputValues.name && device.place === inputValues.place
      );

      if (!inputValues.name || !inputValues.place) {
        Alert.alert('Incomplete Information!', 'Please fill in all fields.');
      } else if (existingDevice) {
        Alert.alert('Device with this name already exists in this place!', 'Please choose a different name.');
      } else {
        parsedAllDevicesData.push(inputValues);
        const jsonValue = JSON.stringify(parsedAllDevicesData);
        await AsyncStorage.setItem('deviceData', jsonValue);
        clearFields();
        onClose();
      }
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleInputChange = (field, text) => {
    setInputValues((prevValues) => ({ ...prevValues, [field]: text }));
  };

  const onBackgroundColorChange = (color) => {
    setInputValues((prevValues) => ({ ...prevValues, backgroundColor: color }));
  };

  const onTextColorChange = (color) => {
    setInputValues((prevValues) => ({ ...prevValues, textColor: color }));
  };

  const clearFields = () => {
    setInputValues({
      id: uuid.v4(),
      name: '',
      place: '',
      command: '',
      backgroundColor: '#0456d9',
      textColor: '#fff',
    });
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={style.modalHeader}>
        <Text style={style.modalHeaderText}>Add device</Text>
      </View>
      <ScrollView style={style.body}>
        <TextInput
          style={style.modalInput}
          placeholder="Name"
          value={inputValues.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={style.modalInput}
          placeholder="Place"
          value={inputValues.place}
          onChangeText={(text) => handleInputChange('place', text)}
        />
        <TextInput
          style={style.modalInput}
          placeholder="Command"
          value={inputValues.command}
          onChangeText={(text) => handleInputChange('command', text)}
        />
          
        <View style={style.sectionContainer}>
          <Text style={style.sectionContainerText}>Set background color</Text>
          <ColorPicker
            color={inputValues.backgroundColor}
            onColorChange={(color) => onBackgroundColorChange(color)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View>
        <View style={style.sectionContainer}>
          <Text style={style.sectionContainerText}>Set text color</Text>
          <ColorPicker
            color={inputValues.textColor}
            onColorChange={(color) => onTextColorChange(color)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View>

        <View style={style.sectionContainer}>
          <View style={{width: '70%', marginHorizontal: '15%'}}>
            <Text style={style.sectionContainerText}>Preview</Text>
            <ContentCard item={inputValues}/>          
          </View>
        </View>

        <View style={style.buttonsContainer}>
          <TouchableOpacity style={style.modalButton} onPress={onClose}>
            <Text style={style.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.modalButton} onPress={clearFields}>
            <Text style={style.modalButtonText}>Clear Fields</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.modalButton} onPress={saveDataToStorage}>
            <Text style={style.modalButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
