import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SimpleCarousel, Banner } from 'react-native-simple-banner-carousel';


export default function Carousel() {
    return (
        <View style={styles.container}>
      <View style={{
        paddingVertical: 1,
        width:'100%',
        height:200,
      }}>
        <SimpleCarousel 
          data={[{
              title: 'Hokkaido',
              source: require('../assets/c1.jpeg'),
            },
            {
              title: 'Tokyo',
              source: require('../assets/c2.jpeg'),
            },
            {
              title: 'Osaka',
              source: require('../assets/c3.jpeg'),
            },
            {
              title: 'Kyoto',
              source: require('../assets/c4.jpeg'),
            }
          ]}
          renderItem={(props, i, width) => {
            return (
              <Banner id={`${props.title}_${i}`} source={props.source} width={width} onPress={(id) => console.log(`${id} was tapped.`)} />
            )
          }} 
        />
      </View>
      <StatusBar translucent={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
