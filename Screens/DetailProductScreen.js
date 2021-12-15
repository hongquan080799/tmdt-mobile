import React,{useEffect, useState, useContext} from 'react'
import {TextInput ,ScrollView ,Text, View, Image, StyleSheet, Button, KeyboardAvoidingView, TouchableOpacity, Dimensions} from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import NumericInput from 'react-native-numeric-input'
import Carousel from 'react-native-snap-carousel';
import * as giohangApi from '../api/GiohangApi'
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/core';
export default function DetailProductScreen({route}) {
    const navigation = useNavigation()
    const {product} = route.params
    const [cart, setCart] = useState(1)
    const [list, setList] = useState([])
    const [state, setState] = useContext(UserContext)
    useEffect(()=>{
        async function fetchData(){
            try {
                const res = await giohangApi.getGioHangByMakh()
                setList(res)
                
            } catch (error) {
                alert('Some thing happen')
            }
        }
        if(state?.user != null)
            fetchData()
    },[])
    const getMaxValue = ()=>{
        let num = 0;
        list?.forEach(c =>{
            if(c?.sanpham?.masp == product?.masp)
             num = c?.sanpham?.soluong - c?.soluong
        })
        return product?.soluong
    }
    function renderItem({item,index}){
        return (
          <View style={{
              borderRadius: 5,
              height: 400,
              width: '100%',
             
             }}>
            <Image style={styles.detailImg} source={{uri : item.photo }} />
          </View>

        )
    }
    const addToCart = async ()=>{
        if(state?.user == null)
            navigation.navigate('Personal')
        else{
            try {
                const res = await giohangApi.insertGioHang({
                    masp:product?.masp,
                    soluong:cart,
                    makh:''
                })
                alert('Add to cart successfully !')
            } catch (error) {
                alert('Add to cart failed !')
            }
        }
    }
    return (
        <KeyboardAvoidingView behavior='padding'>
            <ScrollView style={{height:'88%'}}>
            {/* <Image style={styles.detailImg} source={{uri : }}/> */}
            <Carousel
                  layout={"tinder"}
                  data={product?.listHA?.map(ha =>{
                      return {
                          photo:ha?.photo
                      }
                  })}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width}
                  renderItem={renderItem}
                 />    
            <View style={styles.subDetailContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.detailHeader}>{product?.tensp}</Text>
                    <View style={styles.detailPrice}><Text style={styles.detailPriceText}>{product?.dongia} $</Text></View>
                </View>
                <Text style={styles.aboutText}>About</Text>
                <View style={styles.detailDescribe}>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Category</Text >
                    </View>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>{product?.danhmuc?.tendm}</Text>
                    </View>

                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Number</Text>
                    </View>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>{product?.soluong > 0 ? product?.soluong : 'Sold out'}</Text>
                    </View>

                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>Description</Text>
                    </View>
                    <View style={styles.detailDescribeCell}>
                        <Text style={styles.detailDescribeCellText}>{product?.mota_ngan}</Text>
                    </View>
                </View>
                <Text style={styles.aboutText}>Describe detail</Text>
                <Text style={{color:'#545454', fontSize:16}}>
                  {product?.mota_chitiet}
                </Text>
            </View>
            
        </ScrollView>
        <View style={styles.bottom}>
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', paddingHorizontal:20,marginBottom:20, width:'100%'}}>
                <View style={styles.inputCart}>
                     <NumericInput 
                     onChange={value => setCart(value)} 
                        step={1}
                        rounded 
                        textColor='#B0228C' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#4ac27c' 
                        leftButtonBackgroundColor='#4ac27c'
                        totalWidth={100} 
                        totalHeight={40} 
                        value={cart}
                        minValue={1}
                        maxValue={state?.user != null ? getMaxValue() : null}
                     />
                </View>
                <TouchableOpacity onPress={addToCart}>
                    <View style={styles.addToCartBtn}>
                        <Text style={{color:'#ebebeb', fontSize:16}}>Add to cart</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    detailImg:{
        height:400,
        width: '100%'
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
    },
    bottom:{
     flexDirection:'row',
       justifyContent:'space-between',
       paddingHorizontal:10,
       alignItems:'center',
       height:'12%',
       backgroundColor:'#e6e6e6'
    }
})