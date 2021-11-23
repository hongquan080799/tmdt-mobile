import React,{useContext, useState, useEffect} from 'react'
import {View, Text, ScrollView, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements'
import { UserContext } from '../context/UserContext'
import * as ghnApi from '../api/GhnApi'
import * as userApi from '../api/UserApi'
export default function UserInfoScreen() {
    const [state, setState] = useContext(UserContext)
    const [user, setUser] = useState({})
    const [list, setList] = useState({
        provice:[],
        district:[],
        ward:[]
    })
    const [choice, setChoice] = useState({
        provice:{},
        district: {},
        ward:{},
        addressDetail: ''
    })
    useEffect(()=>{
        async function fetchData(){
            setUser(state?.user)
            state?.user?.listDC?.map(dc =>{
                if(dc?.isHomeAddress){
                    const myChoice = {
                        provice:{
                            provinceId:dc?.provinceId,
                            provinceName:dc?.provinceName
                        },
                        district:{
                            districtId:dc?.districtId,
                            districtName:dc?.districtName
                        },
                        ward:{
                            wardCode:dc?.wardCode,
                            wardName:dc?.wardName
                        },
                        addressDetail:dc?.addressDetail
                    }
                    setChoice(myChoice)
                }
            })
            try {
                const provice = await ghnApi.getProvince()
                setList({
                    ...list,
                    provice:provice.data
                })
            } catch (error) {
                alert('Some thing happened !')
            }
        }
        fetchData()
        return () => {
            console.log("This will be logged on unmount");
          }
    },[state])
    const onSelectProvince = async (value)=>{
        try {
            const myProvice = list?.provice?.filter(pv => pv.ProvinceID === value)
            //console.log(myProvice)
            const district = await ghnApi.getDistrict(value)
            setList({
                ...list,
                district:district.data
            })
            setChoice({
                ...choice,
                provice:{
                    provinceId:myProvice[0]?.provinceId,
                    provinceName:myProvice[0]?.provinceName
                },
                district:{},
                ward:{}
            })
        } catch (error) {
           // alert('Some thing happened !')
        }
    }
    const onDistrictChange = async(value)=>{
        try {
            const myDistrict = list?.district?.filter(pv => pv.DistrictID === value)
            const ward = await ghnApi.getWard(value)
            setList({
                ...list,
                ward: ward.data
            })
            setChoice({
                ...choice,
                district: {
                    districtId : myDistrict[0]?.DistrictID,
                    districtName : myDistrict[0]?.DistrictName
                }
            })
        } catch (error) {
            //alert('Some thing happened !')
        }
    }
    const onWardChange = async(value)=>{
        try {
            const myWard = list?.ward?.filter(pv => pv.WardCode === value)
            setChoice({
                ...choice,
                ward: {
                    wardCode : myWard[0]?.WardCode,
                    wardName : myWard[0]?.WardName
                }
            })
        } catch (error) {
            //alert('Some thing happened !')
        }
    }
    const addressChange = (e)=>{
        const value = e.nativeEvent.text
        //console.log(e.nativeEvent.text)
        setChoice({
            ...choice,
            addressDetail: value
        })
    }
    const handleChangeAccount = async ()=>{
        const data = {
            ho:user?.ho,
            ten:user?.ten,
            email:user?.email,
            gioitinh:user?.gioitinh,
            sdt:user?.sdt,
            listDC:[
                {
                    provinceId: choice?.provice?.provinceId,
                    provinceName: choice?.provice?.provinceName,
                    districtId: choice?.district?.districtId,
                    districtName: choice?.district?.districtName,
                    wardCode: choice?.ward?.wardCode,
                    wardName: choice?.ward?.wardName,
                    addressDetail: choice?.addressDetail
                }
            ]
        }

        try {
            const res = await userApi.updateAccount(data)
            alert('Update account successfully !')
        } catch (error) {
            alert('Update account failed !')
        }
    }
    const handleInputChange = (name, value)=>{
        setUser({
            ...user,
            [name]:value
        })
    }
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = {120}>
            <ScrollView>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={styles.iconUser}>
                    <Image source={{uri:state?.user?.photo}} style={{width:80, height:80}}/>
                </View>
                <Text style={{fontSize:18, marginTop:10, color:'#636363'}}>{state?.user?.displayname}</Text>
            </View>
            <View style={{paddingHorizontal:10, marginTop:50}}>
                <Text style={{color:'#636363'}}>First name</Text>
                <Input value={user?.ten}  onChangeText={(value) => handleInputChange('ten', value)}/>
                <Text style={{color:'#636363'}}>Last name</Text>
                <Input value={user?.ho} onChangeText = {(value) => handleInputChange('ho', value)}/>
                <Text style={{color:'#636363'}}>Gender</Text>
                <RNPickerSelect
                onValueChange= {(value) => handleInputChange('gioitinh', value)}
                
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        marginLeft:10,
                        marginBottom:20
                    }
                }}
                value={user?.gioitinh}
                items={[{label:'Male', value: 1}, {label:'Femail', value:0}]}
                />
                <Text style={{color:'#636363'}}>Phone number</Text>
                <Input value={user?.sdt} onChangeText = {(value) => handleInputChange('sdt', value)} />
                <Text style={{color:'#636363'}}>Email</Text>
                <Input value={user?.email} onChangeText = {(value) => handleInputChange('email', value)}/>
                <Text style={{color:'#636363'}}>Province</Text>
                <RNPickerSelect
                onValueChange={onSelectProvince}
                
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        marginLeft:10,
                        marginBottom:20
                        
                    }
                }}
                value={choice?.provice?.provinceId}
                items={list?.provice?.map(pv =>{
                    return{
                        label: pv.ProvinceName,
                        value: pv.ProvinceID
                    }
                })}
                />
                <Text style={{color:'#636363'}}>District</Text>
                <RNPickerSelect
                onValueChange={onDistrictChange}
                value={choice?.district?.districtId != null && choice?.district?.districtId}
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        marginLeft:10,
                        marginBottom:20
                        
                    }
                }}
                items={list?.district?.map(pv =>{
                    return{
                        label: pv.DistrictName,
                        value: pv.DistrictID
                    }
                })}
                />
                <Text style={{color:'#636363'}}>Ward</Text>
                <RNPickerSelect
                onValueChange={onWardChange}
                value={choice?.ward?.wardCode != null && choice?.ward?.wardCode}
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        marginLeft:10,
                        marginBottom:20
                        
                    }
                }}
                items={list?.ward?.map(pv =>{
                    return{
                        label: pv.WardName,
                        value: pv.WardCode
                    }
                })}
                />
                <Text style={{color:'#636363'}}>Address detail</Text>
                <Input placeholder='Enter your address' value={choice.addressDetail} onChange={addressChange}/>
                {/* <Text style={{color:'#636363'}}>Username</Text>
                <Input placeholder='Enter your address' value={user?.username} onChange={addressChange}/>
                <Text style={{color:'#636363'}}>Password</Text>
                <Input placeholder='Enter your address' value={choice.addressDetail} onChange={addressChange}/> */}
            </View>
            <View style={styles.orderNow}>
                <View>
                <TouchableOpacity onPress={handleChangeAccount}>
                        <View style={styles.orderBtn}>
                            <Text style={{color:'#ebebeb', fontSize:16, width:'100%'}}>Confirm</Text>
                        </View>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    iconUser:{
        backgroundColor:'#e6f0ff',
        padding:5,
        borderRadius:50,
        borderColor:'white',
        borderWidth:5,
        borderStyle:'solid'    
    },
    orderNow:{
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:10,
        alignItems:'center',
        height:'12%',
        marginBottom:70
     },
     orderBtn:{
         backgroundColor:'#1293fc',
         justifyContent:'center',
         paddingVertical:10,
         borderRadius:10,
         paddingHorizontal:120,
     }
})