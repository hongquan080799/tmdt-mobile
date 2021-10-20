import React from 'react'
import { Text, View, Image, StyleSheet, Button, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
export default function CartScreen({navigation}) {
    return (
        <View>
            <ScrollView style={styles.cartContainer}>
            <View style={[styles.subCartContainer,{marginBottom:10}]} >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}> 
                    <Text><Icon name="location-on" color="#1293fc"/></Text>
                    <Text> Trần Hồng Quân | 0336781801</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('AddressReceive')}>
                    <View style={{marginTop:4, flexDirection:'row'}}>
                        <Text style={{color:'#616161'}}>Chung cư k26 lô N02-C, phường 7 Quận Gò Vấp, Hồ Chí Minh</Text>
                        <Text><Icon name='chevron-right' color='#616161' /></Text>
                    </View>
                </TouchableOpacity>  
            </View>
            <View style={[styles.subCartContainer, styles.cartList]}>
                <View style={styles.subCartList}>
                    <CheckBox />
                    <Image style={{width:100, height:100}} source={{uri:'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg'}} />
                </View>
                <View >
                    <Text style={{fontSize:16}}>Iphone 11 64 GB</Text>
                    <Text style={{color:'tomato', fontSize:17, marginTop:3, marginBottom:6}}>1000 $</Text>
                    <View style={styles.inputCart}>
                        <Button title="+" />
                        <TextInput style={styles.inputCartDe} defaultValue="1" />
                        <Button title="-" />
                    </View>
                </View>
            </View>
            <View
            style={{
                borderBottomColor: '#d1d1d1',
                borderBottomWidth: 1,
            }}
            />
            <View style={[styles.subCartContainer, styles.cartList]}>
                <View style={styles.subCartList}>
                    <CheckBox />
                    <Image style={{width:100, height:100}} source={{uri:'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg'}} />
                </View>
                <View >
                    <Text style={{fontSize:16}}>Iphone 11 64 GB</Text>
                    <Text  style={{color:'tomato', fontSize:17, marginTop:3, marginBottom:6}}>1000 $</Text>
                    <View style={styles.inputCart}>
                        <Button title="+" />
                        <TextInput style={styles.inputCartDe} defaultValue="1" />
                        <Button title="-" />
                    </View>
                </View>
            </View>
            
        </ScrollView>
        <View style={styles.orderNow}>
               <View>
                   <Text style={{fontSize:20}}>Total pay</Text>
                   <Text style={{color:'tomato', fontSize:17, marginTop:5}}>1000 $</Text>
               </View>
               <View>
                <TouchableOpacity onPress={()=> navigation.push('ConfirmOrder')}>
                        <View style={styles.orderBtn}>
                            <Text style={{color:'#ebebeb', fontSize:16}}>Order now</Text>
                        </View>
                </TouchableOpacity>
               </View>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputCart:{
        flexDirection:'row',
        backgroundColor:'#d4d4d4',
        width: 80,
        borderRadius:20,
        paddingHorizontal:2
    },
    inputCartDe:{
        flex:1,
        textAlign:'center'
    },
    cartContainer:{
        backgroundColor:'#dedede',
        height:'88%'
    },
    subCartContainer:{
        backgroundColor:'#f2f2f2',
        paddingHorizontal:10,
        paddingBottom:10
    },
    cartList:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
    },
    subCartList:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:20 
    },
    orderNow:{
       flexDirection:'row',
       justifyContent:'space-between',
       paddingHorizontal:10,
       alignItems:'center',
       height:'12%'
    },
    orderBtn:{
        backgroundColor:'#1293fc',
        display:'flex',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10
    }
})