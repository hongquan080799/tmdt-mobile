import React,{useContext} from 'react'
import { TouchableOpacity } from 'react-native';
import { View , Text, SafeAreaView, Image, StyleSheet, TextInput, Alert} from 'react-native'
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import {auth} from '../firebase'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as UserApi from '../api/UserApi'
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../context/UserContext';
export default function LoginScreen() {
    const [state,setState] = useContext(UserContext)
    const navigation = useNavigation()
    const handleLoginGoogle = async ()=>{
        try {
            const result = await Google.logInAsync({
            //   androidClientId: YOUR_CLIENT_ID_HERE,
              behavior:'web',
              iosClientId: '808049707471-eadsuhatnmkt5t4cokja1b1lb4d6huql.apps.googleusercontent.com',
              scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                //return result.accessToken;
              UserApi.getLoginGoogle(result.accessToken)
              .then(res =>{
                  UserApi.getUser()
                  .then(res =>{
                      UserApi.getUser()
                      .then(response =>{
                        console.log(response)
                        setState({user:response})
                        navigation.navigate('Home', {screen:'home'})
                      })

                  })
                
              })
              .catch(err => alert('Login failed !!!'))

            } else {
              return { cancelled: true };
            }
          } catch (e) {
            return { error: true };
          }
    }
    const handleLoginFacebook = async()=>{
        try {
            await Facebook.initializeAsync({
              appId: '419313262930085',
            });
            const {
              type,
              token,
              expirationDate,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });
            if (type === 'success') {
              // Get the user's name using Facebook's Graph API
             // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
              //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
              UserApi.getLoginFacebook(token)
              .then(res =>{
                  UserApi.getUser()
                  .then(res =>{
                      UserApi.getUser()
                      .then(response =>{
                        console.log(response)
                        setState({user:response})
                        navigation.navigate('Home', {screen:'home'})
                      })

                  })
                
              })
              .catch(err => alert('Login failed !!!'))

            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
    }
    return (
        <SafeAreaView>
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:'10%', marginBottom:'15%'}}>
                <Text style={styles.logo}>Angry Bird</Text>
                <Image source={{uri:'https://img.icons8.com/fluent/96/000000/hummingbird.png'}} style={styles.photoPicture} />
            </View>
            <View style={{paddingHorizontal:15}}>
                <Text style={{fontSize:19, color:'#616161',marginBottom:10}}>Wellcome !</Text>
                <TextInput placeholder="Username" style={styles.input} />
                <TextInput placeholder="Password" style={styles.input} />
                <Button
                title="Login"
                buttonStyle={{
                    backgroundColor:'#468a58',
                    marginTop:10,
                    borderRadius:20,
                    height:45,
                    marginBottom:13
                }}                
                />
                <View
                style={{
                    borderBottomColor: '#d1d1d1',
                    borderBottomWidth: 1,
                }}
                />
                
    
                <Button
                title="Login by Google"
                onPress={handleLoginGoogle}
                buttonStyle={{
                    marginTop:13,
                    backgroundColor:'#F24529',
                    borderRadius:20,
                    height:45,
                    marginBottom:10
                }}    
                icon={<AntDesign name="google" size={22} color='white' style={{marginRight:5}} />}            
                />
                <Button
                title="Login by Facebook"
                onPress={handleLoginFacebook}
                icon={
                    <Icon name='facebook' color='white' style={{marginRight:5}} />
                }
                buttonStyle={{
                    backgroundColor:'#1091F2',
                    borderRadius:20,
                    height:45,
                    marginBottom:50
                }}                
                />
                <TouchableOpacity>
                    <Text style={{textAlign:'center', marginBottom:2, color:'#3CB8CF', fontSize:16}}>Forgot password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{textAlign:'center',color:'#3CB8CF', fontSize:16}}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    logo:{
        color:'#47A066',
        fontSize: 30,
       fontWeight: 'bold'
    },
    photoPicture:{
        width: 40,
        height:40
    },
    input: {
        fontSize: 18,
        color: 'black',
        backgroundColor: '#E5E4EA',
        borderRadius: 10,
        paddingVertical:13,
        paddingHorizontal:10,
        marginBottom:10
    }
})