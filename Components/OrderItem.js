import React from 'react'
import {View, Text, Image} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'

export default function OrderItem() {
    return (
        <View style={{backgroundColor:'white', marginBottom:10}}>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <Icon name="list-alt" color='#1293fc' />
                <Text style={{fontSize:15, marginLeft:5, color:'#4a4a4a'}}>Order ID: 201020304</Text>
            </View>
            <Text style={{fontSize:14, marginLeft:30, color:'#616161'}}>Date order: 10/09/2021</Text>
            {/* <View
            style={{
                borderBottomColor: '#d1d1d1',
                borderBottomWidth: 1,
            }}
            /> */}
            <View style={{flexDirection:'row', alignItems:'center',marginTop:10}}>
                <Icon name="pin-drop" color='#1293fc' />
                <Text style={{fontSize:15, marginLeft:5, color:'#4a4a4a'}}>Receive address</Text>
            </View>
            <Text style={{fontSize:14, marginLeft:30, color:'#616161', marginBottom:5}}>Tran Hong Quan | 0336781801</Text>
            <Text style={{fontSize:14, marginLeft:30, color:'#616161'}}>Chung cư k26 lô N02-C, phường 7 Quận Gò Vấp, Hồ Chí Minh</Text>
            <View
            style={{
                marginTop:10,
                borderBottomColor: '#d1d1d1',
                borderBottomWidth: 1,
            }}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10,paddingHorizontal:20}}>
                <View>
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
                marginTop:10,
                borderBottomColor: '#d1d1d1',
                borderBottomWidth: 1,
                
            }}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10,paddingHorizontal:20}}>
                <View>
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
            <View style={{height:50, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:19, color:'#808080'}}>Delivering</Text>
            </View>
        </View>
    )
}
