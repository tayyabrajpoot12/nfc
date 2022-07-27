import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View, StyleSheet, Text, Image } from 'react-native'
import card from '../Images/card.png'
import axios from 'axios';
import { Button } from 'react-native-paper';
import Contacts from 'react-native-contacts';


export default function QrcodeWriter({ route }) {

    const { id } = route.params;
    const [user, setUser] = useState({});
    console.log(id);

    useEffect(() => {


        axios.post('http://192.168.18.39:1020/auth/getinfo', { id }).then((res) => {

            setUser(res.data);
            console.log(res.data);
        });

    }, []);

    const saveIt = () => {
        var newPerson = {
        
            // displayName: user.userName,
        }

        Contacts.openContactForm({
            displayName:user.userName,
            phoneNumbers:[
                {
                    label: 'mobile',
                    number:user.phone
                  }]
                
        }).then(contact => {
            console.log(contact);
        })

    }




    return (

        <View style={styles.container}>

            <View style={styles.imgBox}>
                <Image style={styles.img} source={card} />
                <View style={styles.qrbox}>
                    <QRCode
                        value={id}
                        size={50}
                        backgroundColor={'white'}
                        color='black'
                    />
                    <View style={styles.userBox}>
                        <Text style={styles.userTxt}>{user.userName}</Text>
                    </View>
                </View>
                <Button style={styles.button} onPress={saveIt}>
                    add to contacts
                </Button>
            </View>
        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        margin: 'auto',
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },

    qrbox: {
        // marginTop:-120
        position: 'absolute',
        top: 6,
        left: 5
    },
    userBox: {
        position: 'absolute',
        zIndex: 44,
        width: 100
    },
    userTxt: {
        fontSize: 15,
        color: '#FFFFFF',
        top: 70,
        left: 100
    },

    button:{
        backgroundColor:'#C454FC'
      }

})