import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function Item({navigation}) {
    return (
        <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('Detail')}>
            <Image style={styles.itemPicture} source={{uri:'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg'}} />
            <Text style={styles.itemText}>Iphone 12 64 GB</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={styles.itemPrice}>1000 $</Text>
                 <Text style={styles.itemDiscount}>-10%</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        width:'45%',
        backgroundColor:'#e6e6e6',
        marginBottom:18,
        borderRadius:10,
        padding:10
    },
    itemPicture:{
        width:'100%',
        height:150,
    },
    itemText:{
        marginLeft:10,
        fontWeight:'bold',
        fontSize:16,
        marginTop:10,
        color:'#404040'
    },
    itemPrice:{
        marginLeft:10,
        color:'tomato',
        fontSize:16,
        fontWeight:'bold'
    },
    itemDiscount:{
        borderStyle:'solid',
        borderWidth:1,
        backgroundColor:'#f7d5d5',
        borderColor:'#fc6262',
        color:'#ff4a4a',
        padding:1
        
    }
})
