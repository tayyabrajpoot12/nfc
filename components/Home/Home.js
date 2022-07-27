import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


export default function Home() {

    let navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>
                    WelCome to NAM
                </Text>
                <View style={styles.btnBox1}>
                    <Button style={styles.btn1}   mode="contained" onPress={() =>navigation.navigate('MakeAccount')}>
                    + Add Record
                    </Button>
                </View>
                <View style={styles.btnBox2}>
                    <Button style={styles.btn2}  mode="contained" onPress={() =>{navigation.navigate('NfcReader')}}>
                        Scan tag
                    </Button>
                </View>
            </View>
        </>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EECFF3',
        height: '100%'
    },
    text: {
        marginTop: 100,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 30,
    },
    btn1:{
        marginTop:180,
        backgroundColor:'#C454FC',
        height:40,
    },
    btnBox1:{
        padding:30,
    },
    btn2:{
        marginTop:-31,
        backgroundColor:'#C454FC',
        height:40,
    },
    btnBox2:{
        padding:30,
    }


});