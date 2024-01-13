import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { MainStyle as style } from '../styles/MainStyle';
import ColorPicker from 'react-native-wheel-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContentCard } from './ContentCard';

export const EditDeviceModal = ({ isVisible, onClose, device }) => {
    const [inputValues, setInputValues] = useState({
        id: '',
        name: '',
        place: '',
        command: '',
        backgroundColor: '#0456d9',
        textColor: '#fff',
    });

    useEffect(() => {
        if (device) {
            setInputValues({
            id: device.id || '',
            name: device.name || '',
            place: device.place || '',
            command: device.command || '',
            backgroundColor: device.backgroundColor || '#0456d9',
            textColor: device.textColor || '#fff',
            });
        }
    }, [device]);

    const updateDataToStorage = async () => {
        try {
            const allDevicesData = await AsyncStorage.getItem('deviceData');
            const parsedAllDevicesData = JSON.parse(allDevicesData) || [];
        
            const existingDeviceIndex = parsedAllDevicesData.findIndex(
            (device) => device.id === inputValues.id
            );
        
            if (!inputValues.name || !inputValues.place) {
            Alert.alert('Incomplete Information!', 'Please fill in all fields.');
            } else if (existingDeviceIndex !== -1) {
            parsedAllDevicesData[existingDeviceIndex] = inputValues;
            } else {
            parsedAllDevicesData.push(inputValues);
            }
        
            const jsonValue = JSON.stringify(parsedAllDevicesData);
            await AsyncStorage.setItem('deviceData', jsonValue);
            onClose();
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

    const handleDelete = async () => {
        try {
        const allDevicesData = await AsyncStorage.getItem('deviceData');
        const parsedAllDevicesData = JSON.parse(allDevicesData) || [];

        const updatedDevices = parsedAllDevicesData.filter((device) => device.id !== inputValues.id);

        const jsonValue = JSON.stringify(updatedDevices);
        await AsyncStorage.setItem('deviceData', jsonValue);

        onClose();
        } catch (error) {
        console.error('Error deleting device:', error);
        }
        onClose();
    };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={style.modalHeader}>
        <Text style={style.modalHeaderText}>Edit device</Text>
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
          <TouchableOpacity style={style.modalButton} onPress={handleDelete}>
            <Text style={style.modalButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.modalButton} onPress={updateDataToStorage}>
            <Text style={style.modalButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
