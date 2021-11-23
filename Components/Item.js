import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function Item({navigation, product}) {
    return (
        <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('detail',{product})}>
            <Image style={styles.itemPicture} source={{uri: product?.listHA[0]?.photo}} />
            <Text style={styles.itemText}>{product?.tensp}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={styles.itemPrice}>{product?.dongia} $</Text>
                 <Text style={styles.itemDiscount}>-{product?.khuyenmai * 100}%</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        width:'45%',
        backgroundColor:'white',
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
