import React,{useContext, useEffect, useState} from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Platform } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import OrderItem from '../Components/OrderItem';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../context/UserContext';
import * as orderApi from '../api/DonhangApi'
import { useIsFocused } from '@react-navigation/core';
export default function PersonalScreen() {
    const isFocused = useIsFocused()
    const [list, setList] = useState([])
    const navigation = useNavigation()
    const [state, setState] = useContext(UserContext)
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await orderApi.getListOrderByKhachhang()
                setList(res)
                console.log('ok')
            } catch (error) {
                alert('Failed to fetch data !!!')
            }
          }
          fetchData();
    },[isFocused])
    const isCancelSuccess = async ()=>{
        try {
            const res = await orderApi.getListOrderByKhachhang()
            setList(res)
            console.log('haha')
        } catch (error) {
            alert('Failed to fetch data !!!')
        }
    }
    return (
        <ScrollView style={{backgroundColor:'#f2f2f2'}}>
            <View style={style.header}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={()=> navigation.navigate('Personal', {screen:'userInfo'})}>
                        <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>{state?.user?.displayname}</Text>
                        <Icon name="navigate-next" color='white' style={{marginLeft:5}} size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={style.iconUser}>
                    {state?.user ==null ? 
                    <Icon name="person-outline" color='#1293fc' size={60}/>  :
                    <Image style={{width:60, height:60}} source={{uri:state?.user?.photo}} />
                     }
                </View>
            </View>
            <View style={{paddingHorizontal:10, marginTop:25, backgroundColor:'white', paddingVertical:10, minHeight:Platform.OS == 'ios' ? '70%' : 20000}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>  
                  <Icon name='receipt-long' color='#1293fc' />
                    <Text style={{fontSize:17, marginLeft:5}}>
                      My order list
                    </Text>
                </View>
                <ScrollableTabView
                    style={{ marginTop: 0}}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <View tabLabel='All' style={style.orderContainer} >
                        {list?.map(or =>{
                            return (
                                <OrderItem key={or?.madh} order = {or} isCancelSuccess = {isCancelSuccess} />
                            )
                        })}
                    </View>
                    <View tabLabel='Waiting' style={style.orderContainer} >
                        {list?.map(or =>{
                            if(or?.trangthai == 0)
                            return (
                                <OrderItem key={or?.madh} order = {or} isCancelSuccess = {isCancelSuccess}/>
                            )
                        })}
                    </View>
                    <View tabLabel='Confirm' style={style.orderContainer} >
                        {list?.map(or =>{
                            if(or?.trangthai == 1)
                            return (
                                <OrderItem key={or?.madh} order = {or} isCancelSuccess = {isCancelSuccess}/>
                            )
                        })}
                    </View>
                    <View tabLabel='Delivering' style={style.orderContainer} >
                        {list?.map(or =>{
                            if(or?.trangthai == 2)
                            return (
                                <OrderItem key={or?.madh} order = {or} isCancelSuccess = {isCancelSuccess}/>
                            )
                        })}
                    </View>
                    <View tabLabel='Delivered' style={style.orderContainer} >
                        {list?.map(or =>{
                            if(or?.trangthai == 3)
                            return (
                                <OrderItem key={or?.madh} order = {or} isCancelSuccess = {isCancelSuccess}/>
                            )
                        })}
                    </View>
                    <View tabLabel='Cancel' style={style.orderContainer} >
                        {list?.map(or =>{
                            if(or?.trangthai == 4)
                            return (
                                <OrderItem key={or?.madh} order = {or} isCancelSuccess = {isCancelSuccess}/>
                            )
                        })}
                    </View>
                </ScrollableTabView>
                </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    header:{
        backgroundColor:'#1293fc',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:20,
        paddingTop:100,
        paddingBottom:40,
        borderBottomLeftRadius:50,
    },
    iconUser:{
        backgroundColor:'#e6f0ff',
        padding:5,
        borderRadius:50,
        borderColor:'white',
        borderWidth:5,
        borderStyle:'solid'    
    },
    orderContainer:{
        backgroundColor:'#f2f2f2',
    }
})