import React,{useContext, useEffect, useState} from 'react'
import { Text, View, Image, StyleSheet, Button, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
import NumericInput from 'react-native-numeric-input'
import { UserContext } from '../context/UserContext'
import * as giohangApi from '../api/GiohangApi'
export default function CartScreen({navigation}) {
    const [state, setState] = useContext(UserContext)
    const [cart, setCart] = useState([])
    useEffect(()=>{
        if(state?.user == null)
            navigation.navigate('Home',{screen:'home'})
        else{
            async function fetchData(){
                try {
                    const data = await giohangApi.getGioHangByMakh()
                    const myData = data?.map(gh =>{
                        return{
                            sanpham:gh?.sanpham,
                            soluong:gh?.soluong,
                            check:true
                        }
                    })
                    setCart(myData)
                } catch (error) {
                    alert('failed !')
                }
            }
            fetchData()
            
        }
    },[])
    const getHomeAddress = ()=>{
        for(let i = 0; i < state?.user?.listDC.length ; i++){
            console.log(state?.user?.listDC)
            if(state?.user?.listDC[i].isShipAddress){
                const dc = state?.user?.listDC[i]
                return dc.addressDetail + ' ' + dc.wardName + ' ' + dc.districtName + ' ' + dc.provinceName
            }
        }
        return 'Enter your address'
    }
    const getTotalPrice = ()=>{
        let t = 0;
        cart?.forEach(c => {
            if(c?.check) 
                t += c?.sanpham?.dongia * (1 - c?.sanpham?.khuyenmai) * c?.soluong
        })
        return t
    }
    const onChangeCheck = (masp)=>{
        const data = cart?.map(c => {
            if(c?.sanpham?.masp == masp) 
                return {
                    ...c,
                    check:!c?.check
                }
            else return {...c}
        })
        setCart(data)
    }
    const getListOrder = ()=>{
        return cart?.filter(c =>{
            if(c?.check)
                return c
        })
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
                    <View style={{marginTop:4, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'#616161'}}>{getHomeAddress()}</Text>
                        <Text><Icon name='chevron-right' color='#616161' /></Text>
                    </View>
                </TouchableOpacity>  
            </View>
          
            {cart?.map(c =>{
                return(
                    <View key={c?.sanpham?.masp}>
                          <View style={[styles.subCartContainer, styles.cartList]}>
                            <View style={styles.subCartList}>
                                <CheckBox checked={c?.check} checkedColor='#1293fc' onPress={()=> onChangeCheck(c?.sanpham?.masp)}/>
                                <Image style={{width:100, height:100}} source={{uri: c?.sanpham?.listHA[0]?.photo}} />
                            </View>
                            <View >
                                <Text style={{fontSize:16}}>{c?.sanpham?.tensp}</Text>
                                <Text style={{color:'tomato', fontSize:17, marginTop:3, marginBottom:6}}>{c?.sanpham?.dongia * (1 - c?.sanpham?.khuyenmai) * c?.soluong} $</Text>
                                <View>
                                <NumericInput 
                                onChange={value => console.log(value)} 
                                    step={1}
                                    rounded 
                                    textColor='#B0228C' 
                                    iconStyle={{ color: 'white' }} 
                                    rightButtonBackgroundColor='#1293fc' 
                                    leftButtonBackgroundColor='#1293fc'
                                    totalWidth={90} 
                                    totalHeight={30} 
                                    value={c?.soluong}
                                    minValue={1}
                                    maxValue={c?.sanpham?.soluong}
                                />
                                </View>
                            </View>
                        </View>
                        <View
                        style={{
                            borderBottomColor: '#d1d1d1',
                            borderBottomWidth: 1,
                        }}
                        />
                    </View>
                )
            })}
        </ScrollView>
        <View style={styles.orderNow}>
               <View>
                   <Text style={{fontSize:19}}>Total pay</Text>
                   <Text style={{color:'tomato', fontSize:16, marginTop:5}}>{getTotalPrice()} $</Text>
               </View>
               <View>
                <TouchableOpacity onPress={()=> navigation.push('ConfirmOrder', {orderList:getListOrder()})}>
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