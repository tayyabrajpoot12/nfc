import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import fb from '../Images/fb.png';
import insta from '../Images/insta.png';
import tiktok from '../Images/tiktok.png';
import twitter from '../Images/twitter.png';
import linkdin from '../Images/linkdin.png';
import whatsapp from '../Images/whatsapp.png';
import youtube from '../Images/youtube.png';
import email from '../Images/email.png';
import website from '../Images/website.png';
import { Image } from 'react-native';
import phone from '../Images/phone.png'
import person from '../Images/person.png';
import * as ImagePicker from 'react-native-image-picker';




export default function MakeAccount() {

    let [image, setImage] = useState('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            facebook: '',
            tiktok: '',
            instagram: '',
            twitter: '',
            phone: '',
            whatsapp: '',
            youtube: '',
            email: '',
            website: '',
            linkdin: '',
        }
    });

    const openGallery = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary({ includeBase64: true }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else {
                const source = { uri: response.assets[0].base64 };
                setImage(source);
            }
        });
    };





    const navigation = useNavigation();




    const onSubmit = async (data) => {

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let correct =  regexp.test(data.email);
      

        if(!correct){
            alert('please enter a valid email');
            return false;
        };
        if (image == '' || undefined) {
            alert('please select image first')
            return false;
        };
        reset();
        navigation.navigate('Home');

        let result = false;

        data.image = image.uri;

        let resp = await axios.post('http://192.168.18.39:1020/auth/userinfo', data);

        alert("make your NFC close to your mobile")

        let checkSupport = await NfcManager.isSupported();

        if (checkSupport) {
            try {

                await NfcManager.requestTechnology(NfcTech.Ndef);

                const bytes = Ndef.encodeMessage([Ndef.textRecord(resp.data)]);

                if (bytes) {
                    await NfcManager.ndefHandler // STEP 2
                        .writeNdefMessage(bytes); // STEP 3
                    result = true;
                }

            } catch (ex) {
                console.warn(ex);
            } finally {
                // STEP 4
                NfcManager.cancelTechnologyRequest();
            }
            return result;
        } else {
            alert("mobile does'nt support NFC" + resp.data);
            navigation.navigate('QrcodeWriter', {id : resp.data});
        }


    }

    return <>
        <ScrollView>
            <View style={styles.mainBox}>
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Enter Name"
                                keyboardType="default"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={person} />}
                            />
                            <Image style={styles.personImg} source={person} />
                        </>
                    )}
                    name="userName"
                />

                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Facebook"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={fb} />}
                            />
                            <Image style={styles.fbImg} source={fb} />
                        </>
                    )}
                    name="facebook"
                />
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Instagram"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={insta} />}
                            />
                            <Image style={styles.instaImg} source={insta} />
                        </>
                    )}
                    name="instagram"
                />

                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Twitter"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={twitter} />}
                            />
                            <Image style={styles.twitterImg} source={twitter} />
                        </>
                    )}
                    name="twitter"
                />


                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Tiktok"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={tiktok} />}
                            />
                            <Image style={styles.tiktokImg} source={tiktok} />
                        </>
                    )}
                    name="tiktok"
                />


                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Whatsapp"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={whatsapp} />}
                            />
                            <Image style={styles.whatsappImg} source={whatsapp} />
                        </>
                    )}
                    name="whatsapp"
                />


                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Phone"
                                keyboardType="phone-pad"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={phone} />}
                            />
                            <Image style={styles.phoneImg} source={phone} />
                        </>
                    )}
                    name="phone"
                />


                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Linkdin"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={linkdin} />}
                            />
                            <Image style={styles.linkdinImg} source={linkdin} />
                        </>
                    )}
                    name="linkdin"
                />


                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Youtube"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={youtube} />}
                            />
                            <Image style={styles.youtubeImg} source={youtube} />
                        </>
                    )}
                    name="youtube"
                />


                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Email"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={email} />}
                            />
                            <Image style={styles.emailImg} source={email} />
                        </>
                    )}
                    name="email"
                />



                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder="  Website"
                                keyboardType="url"
                                onChangeText={onChange}
                                value={value}
                                left={<Image source={website} />}
                            />
                            <Image style={styles.websiteImg} source={website} />
                        </>
                    )}
                    name="website"
                />

                <View style={styles.container}>
                    {image !== null ?
                        <Image style={styles.imgBox} source={{ uri: 'data:image/jpeg;base64,' + image.uri }} />
                        : null}
                    <TouchableOpacity style={styles.button} onPress={openGallery}>
                        <Text style={styles.buttonText}>Upload image</Text>
                    </TouchableOpacity>
                </View>

                {errors.userName && <Text style={styles.text}> Name is required.</Text>}


                <View style={styles.btnBox}>
                    <Button
                        style={styles.btn}
                        mode='contained'
                        onPress={handleSubmit(onSubmit)}>
                        save info
                    </Button>
                </View>
            </View>
        </ScrollView>
    </>

}


const styles = StyleSheet.create({

    btn: {
        marginTop: 30,
        backgroundColor: '#C454FC',
        height: 40,
    },
    imgBox: {
        width: 100,
        height: 100,
        // position:'absolute',
        marginTop: 10,
    },
    btnBox: {
        padding: 30,
    },
    text: {
        color: '#FF0000'
    },
    fbImg: {
        width: 45,
        height: 45,
        position: 'absolute',
        top: 90,
        left: 4
    },
    instaImg: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 170,
        left: 11,
    },
    whatsappImg: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 385,
        left: 9
    },
    tiktokImg: {
        width: 30,
        height: 35,
        position: 'absolute',
        top: 315,
        left: 14
    },
    twitterImg: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 242,
        left: 10
    },
    linkdinImg: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 538,
        left: 11
    },
    emailImg: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 682,
        left: 10,
    },
    phoneImg: {
        width: 25,
        height: 30,
        position: 'absolute',
        top: 465,
        left: 14
    },
    websiteImg: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 755,
        left: 10
    },
    youtubeImg: {
        width: 45,
        height: 45,
        position: 'absolute',
        top: 605,
        left: 6
    },
    personImg: {
        width: 30,
        height: 38,
        position: 'absolute',
        top: 15,
        left: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#C454FC',
        marginTop: 20,
        marginBottom: 15,
    },

})