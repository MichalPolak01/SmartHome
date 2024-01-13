import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import { ConnectionScreen } from './views/ConnectionScreen';
import { DevicesScreen } from './views/DevicesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Devices"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="devices-other" size={32} color={focused ? '#0456d9' : 'gray'} />
            ),
            headerTintColor: "#0456d9",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: 'Mina-Bold',
            },
            tabBarActiveTintColor: '#0456d9',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontFamily: 'Mina-Bold',
              fontSize: 12,
            },
          }}
          component={DevicesScreen}
        />
        <Tab.Screen
          name="Connection"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="connected-tv" size={32} color={focused ? '#0456d9' : 'gray'} />
            ),
            headerTintColor: "#0456d9",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: 'Mina-Bold',
            },
            tabBarActiveTintColor: '#0456d9',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontFamily: 'Mina-Bold',
              fontSize: 12,
            },
          }}
          component={ConnectionScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}