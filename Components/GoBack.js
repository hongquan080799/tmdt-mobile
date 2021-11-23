import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
export default function GoBack() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <View style={{backgroundColor:'#808080', borderRadius:20, padding:5, opacity:0.8}}>
          <Icon name="arrow-back" color='white' />
        </View>
      </TouchableOpacity>
    )
}
