import React,{useState, useEffect, useContext} from 'react'
import { Text, View, Image, StyleSheet, Button, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as ghnApi from '../api/GhnApi'
import * as userApi from '../api/UserApi'
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements/dist/input/Input';
import { UserContext } from '../context/UserContext';
export default function AddressReceiveScreen() {
    const [state, setState] = useContext(UserContext)
    const [isPick, setIsPick] = useState(true)
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
    const getHomeAddress = (dc)=>{
        return dc.addressDetail + ' ' + dc.wardName + ' ' + dc.districtName + ' ' + dc.provinceName
    }
    const [refresh, setRefresh] = useState(false)
    useEffect(()=>{
        async function fetchData(){
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
    },[])
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
                provice: {
                    provinceId : myProvice[0]?.ProvinceID,
                    provinceName : myProvice[0]?.ProvinceName
                }
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
    const onSubmit = async()=>{
        try {
            const address = {
                provinceId: choice.provice.provinceId,
                provinceName: choice.provice.provinceName,
                districtId: choice.district.districtId,
                districtName: choice.district.districtName,
                wardCode: choice.ward.wardCode,
                wardName: choice.ward.wardName,
                addressDetail:choice.addressDetail,
                isShipAddress: true,
                isHomeAddress: false
            }
            const res = await userApi.addShipAddress(address)
            //console.log(address)
            const userInfo = await userApi.getUser();
            setState({
                ...state,
                user:userInfo
            })
            alert('Add address successfully !')
            setIsPick(true)
        } catch (error) {
            alert("Can't update ship address !")
        }
    }
    const onChangeShipAddress = async (id)=>{
        try {
            const res = await userApi.setShipAddress(id)
            const user = await userApi.getUser()
            setState({
                ...state,
                user
            })
        } catch (error) {
            alert('Change failed !')
        }
    }
    const onDeleteShipAddress = async (id)=>{
        try {
            const res = await userApi.deleteShipAddress(id)
            const user = await userApi.getUser()
            setState({
                ...state,
                user
            })
        } catch (error) {
            alert('Failed !')
        }
    }
    return (
        <View>
            {isPick?
            <View>
                <ScrollView style={styles.cartContainer}>
                 <View style={[styles.subCartContainer, { paddingVertical:10}]}>
                {/* <View style={{ flexDirection:'row'}}>
                    <Icon name='payments' color='#1293fc' />
                    <Text style={{fontSize:17, color:'#626262', marginLeft:5}}>Payment type</Text>   
                </View> */}
                <View style={{marginTop:10, width:'100%'}}>
                    <RadioForm
                        radio_props={state?.user?.listDC?.map(dc=>{
                            return {
                            label: 
                            <View style={styles.addressPicker}>
                                <Text style={{width:'95%'}}>{getHomeAddress(dc)}</Text>
                                <Text><TouchableOpacity onPress={()=> onDeleteShipAddress(dc?.id)}><Icon name="delete" color='#616161' /></TouchableOpacity></Text>
                            </View>
                            , value: dc?.id
                            
                        }
                        })}
                        initial={null}
                        onPress={(value) => onChangeShipAddress(value)}
                        buttonSize={10}
                        />
                </View>
                
            </View>
            <View style={{
                    marginTop:10,
                    backgroundColor:'#f2f2f2',
                    padding:12}}>
                <TouchableOpacity style={{paddingHorizontal:10}} onPress={()=> setIsPick(false)}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'#616161'}}>ADD MORE ADDRESS</Text>
                        <Text><Icon name='chevron-right' color='#616161' /></Text>
                    </View>
                </TouchableOpacity>  
            </View>
            {/* <View style={[styles.subCartContainer, {marginTop:10, paddingVertical:10}]}>
                        
            </View> */}
            
            
                </ScrollView>
        <View style={styles.orderNow}>
            <View>
            <TouchableOpacity>
                    <View style={styles.orderBtn}>
                        <Text style={{color:'#ebebeb', fontSize:16, width:'100%'}}>Confirm</Text>
                    </View>
            </TouchableOpacity>
            </View>
        </View>
            </View>:
        <View>
            
            <View style={{
                height:'88%'
            }}>
            <View style={{padding:10}}>
                <Text style={{fontSize:17, fontWeight:'bold'}}>Provice</Text>
                <RNPickerSelect
                onValueChange={onSelectProvince}
                
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5
                    },
                    inputAndroid:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        color:'black'
                    },

                }}
                items={list?.provice?.map(pv =>{
                    return{
                        label: pv.ProvinceName,
                        value: pv.ProvinceID
                    }
                })}
                />
            </View>
            <View style={{padding:10}}>
                <Text style={{fontSize:17, fontWeight:'bold'}}>District</Text>
                <RNPickerSelect
                onValueChange={onDistrictChange}
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5
                    },
                    inputAndroid:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        color:'black'
                    }
                }}
                items={list?.district?.map(pv =>{
                    return{
                        label: pv.DistrictName,
                        value: pv.DistrictID
                    }
                })}
                />
            </View>
            <View style={{padding:10, marginBottom:10}}>
                <Text style={{fontSize:17, fontWeight:'bold'}}>Ward</Text>
                <RNPickerSelect
                onValueChange={onWardChange}
                style={{
                    inputIOS:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5
                    },
                    inputAndroid:{
                        fontSize:18,
                        borderColor:'black',
                        borderBottomWidth:1,
                        paddingVertical:5,
                        color:'black'
                    }
                }}
                items={list?.ward?.map(pv =>{
                    return{
                        label: pv.WardName,
                        value: pv.WardCode
                    }
                })}
                />
            </View>
            <Input label='Address detail' placeholder='Enter your address' value={choice.addressDetail} onChange={addressChange}/>
            </View>
            <View style={styles.orderNow}>
                <View>
                <TouchableOpacity onPress={onSubmit}>
                        <View style={styles.orderBtn}>
                            <Text style={{color:'#ebebeb', fontSize:16, width:'100%'}}>Confirm</Text>
                        </View>
                </TouchableOpacity>
                </View>
            </View>
        </View>  
        }
        </View>
    )
}
const styles = StyleSheet.create({
    addressPicker:{
        flexDirection:'row',
        paddingHorizontal:16,
        marginTop:15,
        justifyContent:'space-between'
    },
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
       justifyContent:'center',
       paddingHorizontal:10,
       alignItems:'center',
       height:'12%',
    },
    orderBtn:{
        backgroundColor:'#1293fc',
        justifyContent:'center',
        paddingVertical:10,
        borderRadius:10,
        paddingHorizontal:120,
    }
})