import React from 'react'
import {TextInput ,ScrollView ,Text, View, Image, StyleSheet, Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { color } from 'react-native-elements/dist/helpers'

export default function DetailProductScreen() {
    return (
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView>
            <Image style={styles.detailImg} source={{uri : 'https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/1/637686973775896947_ip-12-dd.jpg'}}/>
            <View style={styles.subDetailContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.detailHeader}>Iphone 13 Pro 64 GB</Text>
                    <View style={styles.detailPrice}><Text style={styles.detailPriceText}>1000 $</Text></View>
                </View>
                <Text style={styles.aboutText}>About</Text>
                <View style={styles.detailDescribe}>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Category</Text >
                    </View>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Phone</Text>
                    </View>

                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Number</Text>
                    </View>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>10</Text>
                    </View>

                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Description</Text>
                    </View>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Good product, best sale in 2021</Text>
                    </View>
                </View>
                <Text style={styles.aboutText}>Describe detail</Text>
                <Text style={{color:'#545454', fontSize:16}}>
                If you want only to hide the header on 1 screen you can do this by setting the screenOptions on the screen component see below for example
                </Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20,marginBottom:20}}>
                <View style={styles.inputCart}>
                    <Button title="+" />
                    <TextInput style={styles.inputCartDe} defaultValue="1" />
                    <Button title="-" />
                </View>
                <TouchableOpacity>
                    <View style={styles.addToCartBtn}>
                        <Text style={{color:'#ebebeb', fontSize:16}}>Add to cart</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    detailImg:{
        height:400,
        width:'100%'
    },
    subDetailContainer:{
        padding:10
    },
    detailHeader:{
        fontSize:20,
        fontWeight:'bold',
    },
    detailPrice:{
        backgroundColor:'#077843',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:20
    },
    detailPriceText:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
    },
    detailDescribe:{
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'#58a17f',
        borderRadius:10,
        padding:10,
        marginBottom:10
    },
    detailDescribeCell:{
        width:'50%',
        marginBottom:3
    },
    detailDescribeCellText:{
        fontSize:16,
        color:'#dedede'
    },
    aboutText:{
        fontSize:20,
        fontWeight:'bold',
        textDecorationLine:'underline',
        color:'#808080',
        marginBottom:5
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
    addToCartBtn:{
        backgroundColor:'#4ac27c',
        display:'flex',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10
    }
})