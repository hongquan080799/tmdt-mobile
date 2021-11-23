import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
export default function HeaderRight({style}) {
    const navigation = useNavigation()
    return (
        <View style={{flexDirection:'row'}}>
         <TouchableOpacity onPress={()=> navigation.navigate('cart',{screen:'Cart'})}>
         <View style={{backgroundColor:style?.isBackground?'':'#808080', borderRadius:20, padding:5, opacity:0.8, marginRight:10}}>
          <Icon name="shopping-cart" color='white' />
        </View>
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Home',{screen:'home'})}>
        <View style={{backgroundColor:style?.isBackground?'':'#808080', borderRadius:20, padding:5, opacity:0.8}}>
          <Icon name="home" color='white' />
        </View>
        </TouchableOpacity>
      </View>
    )
}
