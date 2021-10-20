import React from 'react'
import { Icon } from 'react-native-elements'
import { View, Text , TextInput, StyleSheet, Image} from 'react-native'
export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.logo}>Angry Bird</Text>
                <Image source={{uri:'https://img.icons8.com/fluent/96/000000/hummingbird.png'}} style={styles.photoPicture} />
            </View>
            <View style={styles.searchContainer}>
                <Icon name="search" size={25} />
                <TextInput placeholder="Search" style={styles.input} />
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    searchContainer: {
        marginTop:10,
        height: 50,
        backgroundColor: '#E5E4EA',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
      },
      logo:{
          color:'#47A066',
          fontSize: 30,
         fontWeight: 'bold',
      },
      headerContainer:{
          paddingVertical:10,
          paddingHorizontal:10
      },
      photoPicture:{
          width: 40,
          height:40
      }
})
