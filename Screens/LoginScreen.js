import React from 'react'
import { TouchableOpacity } from 'react-native';
import { View , Text, SafeAreaView, Image, StyleSheet, TextInput} from 'react-native'
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
export default function LoginScreen() {
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
                buttonStyle={{
                    marginTop:13,
                    backgroundColor:'#F24529',
                    borderRadius:20,
                    height:45,
                    marginBottom:10
                }}                
                />
                <Button
                title="Login by Facebook"
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