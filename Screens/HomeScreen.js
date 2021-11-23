import React from 'react'
import { View, Text, SafeAreaView} from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import Category from '../Components/Category'
import Header from '../Components/Header'
import ListItems from '../Components/ListItems'
import Carousel from '../Components/Carousel'
export default function HomeScreen({navigation}) {
    return (
        <SafeAreaView>
            <Header />
            <Category items = {['Phone','Tablet','Laptop','Assests']} />   
            {/* <Carousel /> */}
            <ListItems navigation={navigation}/>  
        </SafeAreaView>
    )
}
