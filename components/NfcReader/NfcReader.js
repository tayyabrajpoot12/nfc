import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { Buffer } from "buffer";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


// Pre-step, call this before any NFC operations
NfcManager.start();

function NfcReader() {


  const navigation = useNavigation();

  async function readNdef() {

    // let isSupport = await NfcManager.isSupported();

    // if (!isSupport) {
    //   navigation.navigate('QrScanner');
    // }


    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      // console.log(tag.ndefMessage[0].payload)

      let some = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      navigation.navigate('ShowDetails', { id: some });

    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <Button style={styles.btn} onPress={readNdef}>Scan a Tag</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#C454FC'
  }
});

export default NfcReader;


