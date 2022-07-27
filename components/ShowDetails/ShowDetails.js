import React, { useEffect, useState } from 'react';
import Contacts from 'react-native-contacts';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import axios from 'axios';
import { DataTable, Button } from 'react-native-paper';
import fb from '../Images/fb.png';
import youtube from '../Images/youtube.png';
import twitter from '../Images/twitter.png';
import instagram from '../Images/insta.png';
import tiktok from '../Images/tiktok.png';
import whatsapp from '../Images/whatsapp.png';
import email from '../Images/email.png';
import linkdin from '../Images/linkdin.png';
import website from '../Images/website.png';
import phone from '../Images/phone.png';
import person1 from '../Images/person1.png'

export default function ShowDetails({ route }) {


    const { id } = route.params;

    let [user, setUser] = useState({});


    useEffect(() => {


        axios.post('http://192.168.18.39:1020/auth/getinfo', { id }).then((res) => {

            setUser(res.data);
        });

    }, [])


    const saveContect = () => {
        var newPerson = {
        
            // displayName: user.userName,
        }

        Contacts.openContactForm({
            displayName:user.userName,
            phoneNumbers:[
                {
                    label: 'mobile',
                    number:user.phone,
                  }]
                
        }).then(contact => {
            console.log(contact);
        })

    }




    return (
        <ScrollView>
            <View style={styles.container}>
                {!user._id ? <Text style={styles.hideTxt}>Oops! There is nothing to show
                </Text> : null}
                {user.image ? <Image style={styles.imgBox} source={{ uri: 'http://192.168.18.39:1020/' + user.image }} /> : null}
                {user.userName ?
                    <Text style={styles.txt}>{user.userName}</Text> : null}
                <DataTable>
                    {user.facebook ?
                        <DataTable.Row>
                            <Image style={styles.fbImg} source={fb} />
                            <DataTable.Cell style={styles.txtUrl}>{user.facebook}</DataTable.Cell>
                        </DataTable.Row>
                        : null}

                    {user.twitter ?
                        <DataTable.Row>
                            <Image style={styles.twitterImg} source={twitter} />
                            <DataTable.Cell style={styles.txtUrl}>{user.twitter}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.instagram ?
                        <DataTable.Row>
                            <Image style={styles.instagramImg} source={instagram} />
                            <DataTable.Cell style={styles.txtUrl2}>{user.instagram}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.linkdin ?
                        <DataTable.Row>
                            <Image style={styles.linkdinImg} source={linkdin} />
                            <DataTable.Cell style={styles.txtUrl}>{user.linkdin}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.youtube ?
                        <DataTable.Row>
                            <Image style={styles.youtubeImg} source={youtube} />
                            <DataTable.Cell style={styles.txtUrl1}>{user.youtube}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.website ?
                        <DataTable.Row>
                            <Image style={styles.websiteImg} source={website} />
                            <DataTable.Cell style={styles.txtUrl}>{user.website}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.email ?
                        <DataTable.Row>
                            <Image style={styles.emailImg} source={email} />
                            <DataTable.Cell style={styles.txtUrl}>{user.email}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.whatsapp ?
                        <DataTable.Row>
                            <Image style={styles.whatsappImg} source={whatsapp} />
                            <DataTable.Cell style={styles.txtUrl}>{user.whatsapp}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.tiktok ?
                        <DataTable.Row>
                            <Image style={styles.tiktokImg} source={tiktok} />
                            <DataTable.Cell style={styles.txtUrl2}>{user.tiktok}</DataTable.Cell>
                        </DataTable.Row>
                        : null}
                    {user.phone ?
                        <DataTable.Row>
                            <Image style={styles.phoneImg} source={phone} />
                            <DataTable.Cell style={styles.txtUrl2}>{user.phone}</DataTable.Cell>
                            <Button style={styles.btn} onPress={saveContect}>
                                add to contacts
                            </Button>
                        </DataTable.Row>
                        : null}
                </DataTable>
            </View>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    imgBox: {
        width: 150,
        height: 150,
        borderRadius: 50,
        margin: 'auto',
        marginLeft: 105,
        top: 10,
    },
    txt: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    hideTxt: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 30,
        fontWeight: 'bold'
    },
    websiteImg: {
        width: 35,
        height: 35,
        marginTop: 5,
        marginLeft: 3
    },

    phoneImg: {
        width: 25,
        height: 30,
        marginTop: 10,
        marginLeft: 9
    },
    fbImg: {
        width: 40,
        height: 40,
        marginTop: 10,
    },
    instagramImg: {
        width: 30,
        height: 30,
        marginTop: 8,
        marginLeft: 4
    },
    whatsappImg: {
        width: 40,
        height: 40,
        marginTop: 5
    },
    tiktokImg: {
        width: 30,
        height: 35,
        marginTop: 10,
        marginLeft: 5
    },
    twitterImg: {
        width: 40,
        height: 40,
        marginTop: 5
    },
    linkdinImg: {
        width: 30,
        height: 30,
        marginTop: 10,
        marginLeft: 6
    },
    emailImg: {
        width: 35,
        height: 35,
        marginLeft: 3,
        marginTop: 8
    },
    youtubeImg: {
        width: 45,
        height: 45,
        marginLeft: -2,
        marginTop: 5
    },
    container: {
        backgroundColor: '#FFFFFF',
    },
    txtUrl: {
        marginLeft: 10,
        padding: 16
    },
    txtUrl1: {
        marginLeft: 5,
        padding: 16
    },
    txtUrl2: {
        marginLeft: 15,
        padding: 16
    },
    btn: {
        marginTop: 6,
        marginRight: -20,
    }

})