import { MainStyle as style } from '../styles/MainStyle'
import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { BleManager } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ConnectionScreen extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentDidMount() {
    this.checkBluetoothState();
  }

  checkBluetoothState() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error: ', error);
        return
      }

      if (device) {
        console.log('Found device:', device.name);

        if (device.name === 'MLT-BT05') {
          this.manager.stopDeviceScan();

          return device
            .connect()
            .then((device) => {
              return device.discoverAllServicesAndCharacteristics();
            }).then((characteristic) => {
              console.log('Characteristics:', characteristic);
              // this.setState({device: Characteristic});
            }).catch((error) => {
              console.log('Error: ', error);
            });
        }
      }
    });
  }

  // const device = {
  //   id: 'A8:1B:6A:75:96:65',
  //   serviceUUID: 'FFE0',
  //   characteristicUUID: 'FFE1'
  // };

  // return AsyncStorage.setItem('device', JSON.stringify(device)).then(() => {
  //   Navigation.mergeOptions('DevicesScreen', {
  //     bottomTab: {
  //       badge: '+',
  //     },
  //     bottomTabs: {
  //       currentTabId: 'DEV'
  //     }
  //   });
  // });

  ChangeDevice(command) {
    AsyncStorage.getItem('device').then(device => {
      device.JSON.parse(device);
      if (device) {
        this.manager.writeCharacteristicWithResponseForDevice(
          device.id, device.serialUUID, device.CharacteristicUUID, btoa(command)
        ).then(response => {
          console.log('response', response);
        }).catch((error) => {
          console.log('Error: ', error);
        });
      }
    });
  }

  render() {
    return (
      <View style={[style.body, {justifyContent: 'top'}]}>
        <View style={style.buttonsContainer}>
          <TouchableOpacity style={style.modalButton} onPress={() => this.scanAndConnect()}>
            <Text style={style.modalButtonText}>ConnectionScreen</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}