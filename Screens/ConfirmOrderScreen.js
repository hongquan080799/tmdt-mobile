import React from 'react'
import { Text, View, Image, StyleSheet, Button, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
export default function ConfirmOrderScreen() {
    return (
        <View>
            <ScrollView style={styles.cartContainer}>
            <View style={[styles.subCartContainer,{marginBottom:10}]} >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}> 
                    <Text><Icon name="location-on" color="#1293fc"/></Text>
                    <Text> Trần Hồng Quân | 0336781801</Text>
                </View>
                <View style={{marginTop:4, flexDirection:'row'}}>
                    <Text style={{color:'#616161'}}>Chung cư k26 lô N02-C, phường 7 Quận Gò Vấp, Hồ Chí Minh</Text>
                    <Text><Icon name='chevron-right' color='#616161' /></Text>
                </View>  
            </View>
            <View style={{backgroundColor:'#f2f2f2'}}>
               <View style={{paddingHorizontal:10, marginTop:10, flexDirection:'row'}}>
                    <Icon name='receipt-long' color='#1293fc' />
                    <Text style={{fontSize:17, color:'#626262', marginLeft:5}}>Order list</Text>   
               </View>
                {/* <View
                style={{
                    borderBottomColor: '#d1d1d1',
                    borderBottomWidth: 1
                }}
                /> */}
               <View style={[styles.subCartContainer, styles.cartList]}>
                    <View style={styles.subCartList}>
                        <Image style={{width:60, height:60}} source={{uri:'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg'}} />
                    </View>
                    <View style={{width:'70%'}}>
                        <Text style={{fontSize:16}}>Iphone 11 64 GB</Text>
                        <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
                            <Text style={{color:'#616161', fontSize:16}}>Number : x 1</Text>
                            <Text style={{color:'tomato', fontSize:17, marginBottom:6}}>1000 $</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#d1d1d1',
                        borderBottomWidth: 1
                    }}
                    />
                <View style={[styles.subCartContainer, styles.cartList]}>
                    <View style={styles.subCartList}>
                        <Image style={{width:60, height:60}} source={{uri:'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg'}} />
                    </View>
                    <View style={{width:'70%'}}>
                        <Text style={{fontSize:16}}>Iphone 11 64 GB</Text>
                        <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
                            <Text style={{color:'#616161', fontSize:16}}>Number : x 1</Text>
                            <Text style={{color:'tomato', fontSize:17, marginBottom:6}}>1000 $</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.subCartContainer, {marginTop:10, paddingVertical:10}]}>
                <View style={{ flexDirection:'row'}}>
                    <Icon name='payments' color='#1293fc' />
                    <Text style={{fontSize:17, color:'#626262', marginLeft:5}}>Payment type</Text>   
                </View>
                <View style={{marginTop:10}}>
                    <RadioForm
                        radio_props={[
                            {label: 'Cash     ', value: 0 },
                            {label: 'Paypal', value: 1 }
                        ]}
                        formHorizontal={true}
                        initial={0}
                        onPress={()=>{}}
                        buttonSize={10}
                        />
                </View>
            </View>
            {/* <View style={[styles.subCartContainer, {marginTop:10, paddingVertical:10}]}>
                        
            </View> */}
            
            
        </ScrollView>
        <View style={styles.orderNow}>
               <View>
                   <Text style={{fontSize:20}}>Total pay</Text>
                   <Text style={{color:'tomato', fontSize:17, marginTop:5}}>1000 $</Text>
               </View>
               <View>
                <TouchableOpacity>
                        <View style={styles.orderBtn}>
                            <Text style={{color:'#ebebeb', fontSize:16}}>Confirm</Text>
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