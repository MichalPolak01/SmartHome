import { ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AddContentCard } from '../components/AddContentCard'
import { ContentCard } from '../components/ContentCard'
import { MainStyle as style } from '../styles/MainStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EditDeviceModal } from '../components/EditDeviceModal'


export const DevicesScreen = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const toggleModal = (device) => {
    setEditingDevice(device);
    setModalVisible(!isModalVisible);
    handleRefresh();
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('deviceData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDeviceData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  return (
    <View style={style.body}>
      <ScrollView contentContainerStyle={style.content}>
        {deviceData.map((device) => (
          <View style={style.cardView} key={device.id}>
            <TouchableOpacity onPress={() => toggleModal(device)}>
              <ContentCard item={device} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={style.cardView}>
          <AddContentCard onClose={handleRefresh} />
        </View>
      </ScrollView>
      <EditDeviceModal isVisible={isModalVisible} onClose={() => toggleModal(null)} device={editingDevice} />
    </View>
  )
}