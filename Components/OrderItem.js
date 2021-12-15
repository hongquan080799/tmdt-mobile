import React from 'react'
import {View, Text, Image} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as donhangApi from '../api/DonhangApi'
export default function OrderItem({order, isCancelSuccess}) {
    const getTinhtrang = (tt)=>{
        if(tt === 4)
          return 'Cancel'
        else if(tt === 0)
          return <TouchableOpacity onPress={cancelOrder}><Text style={{color:'tomato', fontSize:20}}>Waiting - Cancel order</Text></TouchableOpacity>
        else if( tt === 1)
          return 'Confirm'
        else if(tt === 2)
          return 'Delivering'
        else if(tt === 3)
          return 'Delivered'
      }
    const cancelOrder = async ()=>{
        try {
            const res = await donhangApi.updateStatus({madh : order?.madh, trangthai : 4})
            alert('Cancel successfully !!!')
            isCancelSuccess();
        } catch (error) {
            alert('Cancel error !!!')
        }
    }
    return (
        <View style={{backgroundColor:'white', marginBottom:10}}>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <Icon name="list-alt" color='#1293fc' />
                <Text style={{fontSize:15, marginLeft:5, color:'#4a4a4a'}}>Order ID: {order?.madh}</Text>
            </View>
            <Text style={{fontSize:14, marginLeft:30, color:'#616161'}}>Date order: {order?.ngaydat}</Text>
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
            <Text style={{fontSize:14, marginLeft:30, color:'#616161', marginBottom:5}}>{order?.khachhang?.ho + ' ' + order?.khachhang?.ten} | {order?.khachhang?.sdt}</Text>
            <Text style={{fontSize:14, marginLeft:30, color:'#616161'}}>{order?.diachi}</Text>
            <View
            style={{
                marginTop:10,
                borderBottomColor: '#d1d1d1',
                borderBottomWidth: 1,
            }}
            />
            {order?.listCTDH?.map(dh =>{
                return (
                    <View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10,paddingHorizontal:20}}>
                            <View>
                                <Image style={{width:60, height:60}} source={{uri: dh?.sanpham?.listHA[0]?.photo}} />
                            </View>
                            <View style={{width:'70%'}}>
                                <Text style={{fontSize:16}}>{dh?.sanpham?.tensp}</Text>
                                <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
                                    <Text style={{color:'#616161', fontSize:16}}>Number : x {dh?.soluong}</Text>
                                    <Text style={{color:'tomato', fontSize:17, marginBottom:6}}>{dh?.gia} $</Text>
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
                    </View>
                )
            })}
            <View style={{height:60, width:'100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:19, color:'#808080'}}>{getTinhtrang(order?.trangthai)}</Text>
            </View>
        </View>
    )
}
