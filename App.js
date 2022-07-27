import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/Home/Home';
import MakeAccount from './components/MakeAccount/MakeAccount';
import NfcReader from './components/NfcReader/NfcReader';
import ShowDetails from './components/ShowDetails/ShowDetails';
import QrcodeWriter from './components/QrcodeWriter/QrcodeWriter';

export default function App() {

  const Stack = createNativeStackNavigator();

  return <>
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Home' screenOptions={{
        title: 'H',
        headerTitleStyle: {
          color: '#841584'
        },
        headerStyle: {
          backgroundColor: '#841584',
        },
      }}>

        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MakeAccount' component={MakeAccount} />
        <Stack.Screen name='NfcReader' component={NfcReader} />
        <Stack.Screen name='ShowDetails' component={ShowDetails} />
         <Stack.Screen name='QrcodeWriter' component={QrcodeWriter } />


      </Stack.Navigator>
    </NavigationContainer>
  </>


}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'purple'
  },

});