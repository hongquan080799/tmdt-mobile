import React,{useState} from 'react'
import { Icon } from 'react-native-elements'
import { View, Text , TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
export default function Category({items}) {
    const [cateIndex, setCategoryIndex] = useState(0)
    const changeCateIndex = (index)=>{
        setCategoryIndex(index)
    }
    return (
        <ScrollView style={styles.category} horizontal={true}>
            {items.map((item, index)=>{
                return (
                    <TouchableOpacity key={index} >
                        <Text style={[styles.categoryText, index === cateIndex && styles.categorySelected]} onPress={()=> changeCateIndex(index)}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    category :{
        flexDirection:'row',
        marginBottom:25
    },
    categoryText:{
        fontSize:20,
        color:'#696969',
        paddingHorizontal:10
    },
    categorySelected:{
        fontSize:22,
        color:'#519c4b',
    }
})
