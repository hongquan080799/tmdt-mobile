import React from 'react'
import { View , StyleSheet, ScrollView} from 'react-native'
import Item from './Item'
export default function ListItems({navigation}) {
    return (
        <ScrollView>
            <View style={styles.itemContainer}>
            <Item style={styles.item} navigation={navigation}/>
            <Item style={styles.item} navigation={navigation}/>
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
