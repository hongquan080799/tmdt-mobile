import React,{useState, useEffect, useContext} from 'react'
import { Text, View, Image, StyleSheet, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import * as Linking from 'expo-linking';
import { Icon, Input, Button } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/core'
import {getSignature, getExtraData} from '../utils/Algorithm'
import * as paypalUtils from '../utils/PaypalUtils'
import * as ghnApi from '../api/GhnApi'
import * as donhangApi from '../api/DonhangApi'
import * as emailUtils from '../utils/SendEmail'
import * as WebBrowser from 'expo-web-browser';
export default function ConfirmOrderScreen({route}) {
    const {orderList} = route.params
    const navigation = useNavigation()
    const [state, setState] = useContext(UserContext)
    const [httt, setHttt] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [voucher, setVoucher] = useState()
    const getShioAddress = ()=>{
        for(let i = 0; i < state?.user?.listDC.length ; i++){
           // console.log(state?.user?.listDC)
            if(state?.user?.listDC[i].isShipAddress){
                const dc = state?.user?.listDC[i]
                return dc.addressDetail + ' ' + dc.wardName + ' ' + dc.districtName + ' ' + dc.provinceName
            }
        }
        return 'Enter your address'
    }
    useEffect(()=>{
        Linking.addEventListener('url', async(event)=>{
            let data = Linking.parse(event.url)
            let orderConfirm = JSON.parse(getExtraData(data.queryParams.extraData))
            let resGHN = null
            try{
                resGHN = await ghnApi.getOrderGHN(orderConfirm, state?.user, getAddress(), getTotalPrice() )
            }
            catch(e){}
            
            if(resGHN != null)
            orderRequest.madhGhn = data?.order_code
            if(discount > 0 )
            confirmOrder.voucherId = voucher
            try {
                if(httt == 1){
                    let payerId = data?.queryParams.PayerID
                    donhangApi.orderPaypal(confirmOrder, payerId)
                }
                else if(httt == 2){
                    await donhangApi.order(orderConfirm)
                
                }
                try {
                    const myMessage = emailUtils.getMessageOrder(state?.user, listSP, getShioAddress)

                    emailUtils.sendEmail(myMessage, state?.user)
                } catch (error) {
                    
                }
                alert('Order successfully !!!')
            } catch (error) {
                console.log(error)
            }
            
        })
    },[])
    
    const getAddress = ()=>{
        for(let i = 0; i < state?.user?.listDC.length ; i++){
            // console.log(state?.user?.listDC)
             if(state?.user?.listDC[i].isShipAddress){
                 const dc = state?.user?.listDC[i]
                 return {
                     address : dc.addressDetail + ' ' + dc.wardName + ' ' + dc.districtName + ' ' + dc.provinceName,
                     ward : dc?.wardCode,
                     district : dc?.districtId
                 }
             }
         }
         return 'Enter your address'
    }
    const getTotalPrice = ()=>{
        let t = 0;
        orderList?.forEach(c => {
            if(c?.check) 
                t += c?.sanpham?.dongia * (1 - c?.sanpham?.khuyenmai) * c?.soluong
        })
        return t
    }
    const confirmOrder = async()=>{
        const listSP = orderList.map(or =>({
            masp :or.sanpham?.masp, 
            tensp :or.sanpham?.tensp,
            soluong : or.soluong,
            dongia : or.sanpham?.dongia - or.sanpham?.khuyenmai  * or.sanpham?.dongia
        }))
        let orderRequest = {
            listSP,
            diachi: getShioAddress(),
            httt: httt
        }
        const orderId = 'DH' + new Date().getTime()
        try {
            if(httt == 0){
                try{
                    resGHN = await ghnApi.getOrderGHN(orderConfirm, state?.user, getAddress(), getTotalPrice() )
                }
                catch(e){}
                await donhangApi.order(orderRequest)
                try {
                    const myMessage = emailUtils.getMessageOrder(state?.user, listSP, getShioAddress)

                    emailUtils.sendEmail(myMessage, state?.user)
                } catch (error) {
                    
                }
            }
            if(httt == 1){
                const res = await paypalUtils.getPayPalLinl(orderRequest, getTotalPrice(), state?.user?.username)
                await WebBrowser.openBrowserAsync(res)
            }
            else if(httt == 2){
                const res = await getSignature(orderRequest, getTotalPrice(), orderId)
                await WebBrowser.openBrowserAsync(res.payUrl)
            }
            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }


    }
    const checkVoucher = async()=>{
        try {
            const res = await donhangApi.checkVoucher(voucher)
            setDiscount(res.discount)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <ScrollView style={styles.cartContainer}>
            <View style={[styles.subCartContainer,{marginBottom:10}]} >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}> 
                    <Text><Icon name="location-on" color="#1293fc"/></Text>
                    <Text> {state?.user?.displayname} | {state?.user?.sdt}</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('AddressReceive')}>
                    <View style={{marginTop:4, flexDirection:'row'}}>
                        <Text style={{color:'#616161'}}>{getShioAddress()}</Text>
                        <Text><Icon name='chevron-right' color='#616161' /></Text>
                    </View>  
                </TouchableOpacity>
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
              
               {orderList?.map(c =>{
                   return(
                    <View style={[styles.subCartContainer, styles.cartList]} key={c?.sanpham?.masp}>
                        <View style={styles.subCartList}>
                            <Image style={{width:60, height:60}} source={{uri: c?.sanpham?.listHA[0]?.photo}} />
                        </View>
                        <View style={{width:'70%'}}>
                            <Text style={{fontSize:16}}>{c?.sanpham?.tensp}</Text>
                            <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
                                <Text style={{color:'#616161', fontSize:16}}>Number : x {c?.soluong}</Text>
                                <Text style={{color:'tomato', fontSize:17, marginBottom:6}}>{c?.sanpham?.dongia * (1 - c?.sanpham?.khuyenmai) * c?.soluong} $</Text>
                            </View>
                        </View>
                    </View>
                   )
               })}
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
                            {label: 'Paypal   ', value: 1 },
                            {label: 'Momo', value: 2 }
                        ]}
                        formHorizontal={true}
                        initial={0}
                        onPress={(value)=>{setHttt(value)}}
                        buttonSize={10}
                        />
                </View>
            </View>
            <View style={[styles.subCartContainer, {marginTop:10, paddingVertical:10}]}>
                <TouchableOpacity style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={{ flexDirection:'row'}}>
                        <Icon name='confirmation-number' color='#1293fc' />
                        <Text style={{fontSize:17, color:'#626262', marginLeft:5}}>Voucher discount</Text>   
                    </View>
                </TouchableOpacity>
                <View>
                    <Input style={{marginBottom:0}} onChangeText={(value)=> setVoucher(value)} />
                    <Button title='Apply' style={{marginTop:0}} onPress={checkVoucher} />
                </View> 
            </View>
            {/* <View style={[styles.subCartContainer, {marginTop:10, paddingVertical:10}]}>
                        
            </View> */}
            
            <View style={[styles.subCartContainer, {marginTop:10, paddingVertical:15}]}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{color:'#616161'}}>Total product cost</Text>
                    <Text style={{color:'#616161'}}>{getTotalPrice()} $</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:10}}>
                    <Text style={{color:'#616161'}}>Discount percentage</Text>
                    <Text style={{color:'#616161'}}>{discount * 100} %</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:18, color:'#383838'}}>Total pay</Text>
                    <Text style={{fontSize:18, color:'#f74f4f'}}>{getTotalPrice() - getTotalPrice() * discount} $</Text>
                </View>
            </View>
        </ScrollView>
        <View style={styles.orderNow}>
               <View>
                   <Text style={{fontSize:20}}>Total pay</Text>
                   <Text style={{color:'tomato', fontSize:17, marginTop:5}}>{getTotalPrice() - getTotalPrice() * discount} $</Text>
               </View>
               <View>
                <TouchableOpacity onPress={confirmOrder}>
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
        height:'86%'
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
        paddingHorizontal:20,
        alignItems:'center',
        height:'14%',
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