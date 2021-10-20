import React from 'react'
import { Text, View, Image, StyleSheet, Button, TextInput, ScrollView , TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
export default function AddressReceiveScreen() {
    return (
        <View>
            <ScrollView style={styles.cartContainer}>
            <View style={[styles.subCartContainer, { paddingVertical:10}]}>
                {/* <View style={{ flexDirection:'row'}}>
                    <Icon name='payments' color='#1293fc' />
                    <Text style={{fontSize:17, color:'#626262', marginLeft:5}}>Payment type</Text>   
                </View> */}
                <View style={{marginTop:10, width:'100%'}}>
                    <RadioForm
                        radio_props={[
                            {label: <View style={styles.addressPicker}>
                            <Text style={{marginRight:10}}>Thông Thống Nhất, Xã Đại Thắng, Huyện Vụ Bản, Tỉnh Nam Định</Text>
                            <Text><TouchableOpacity><Icon name="delete" color='#616161' /></TouchableOpacity></Text>
                            </View>
                            , value: 0 },
                            {label: <View style={styles.addressPicker}>
                            <Text style={{marginRight:10}}>Chung cư K26, Dương Quảng Hàm, P7 Quận Gò Vấp, TPHCM</Text>
                            <Text><TouchableOpacity><Icon name="delete" color='#616161' /></TouchableOpacity></Text>
                            </View>
                            , value: 0 }
                        ]}
                        initial={0}
                        onPress={()=>{}}
                        buttonSize={10}
                        />
                </View>
                
            </View>
            <View style={{
                    marginTop:10,
                    backgroundColor:'#f2f2f2',
                    padding:12}}>
                <TouchableOpacity style={{paddingHorizontal:10}}>
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
        </View>
    )
}
const styles = StyleSheet.create({
    addressPicker:{
        flexDirection:'row',
        paddingHorizontal:15,
        marginTop:15
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