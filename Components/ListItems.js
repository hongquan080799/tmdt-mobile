import React,{useEffect, useState} from 'react'
import { View , StyleSheet, ScrollView, Text} from 'react-native'
import Carousel from './Carousel'
import * as sanphamApi from '../api/SanphamApi'
import Item from './Item'
import axios from 'axios'
export default function ListItems({navigation}) {
    const [list, setList] = useState([])
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await sanphamApi.getListSanpham()
                setList(res)
            } catch (error) {
                alert('Failed to fetch data !!!')
            }
          }
          fetchData();
    },[])
    return (
        <ScrollView>
            <Carousel />
            <Text style={{paddingHorizontal:20, fontSize:18, marginBottom:5, color:'#5e5e5e'}}>Top products most sale</Text>
            <View style={styles.itemContainer}>
            {/* <Item style={styles.item} navigation={navigation}/>
            <Item style={styles.item} navigation={navigation}/> */}
            {list?.map(l =>{
                return(
                    <Item key={l?.masp} navigation={navigation} product ={l} />
                )
            })}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    }
})
