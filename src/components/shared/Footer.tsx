import React from 'react';

import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import EventMenuSvg from '../svgs/events';
import MapsMenuSvg from '../svgs/maps';
import MoreMenuSvg from '../svgs/more';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';


export const Footer = ({ navigation }) => {
  const route = useRoute();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.tabs, { opacity: route.name == 'Home' ? 1 : 0.5 }]}
          onPress={() => navigation.navigate('Home')}>
          {/* <EventMenuSvg style={{ alignSelf: 'center' }} /> */}
          <Image source={require('../../assets/images/homeicon.png')} style={{ alignSelf: 'center', width: 30, height: 30 }} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabs, { opacity: route.name == 'ConnectMain' ? 1 : 0.5 }]}
          onPress={() => navigation.navigate('ConnectMain')}>
          {/* <MapsMenuSvg style={{ alignSelf: 'center' }} /> */}
          <Image source={require('../../assets/images/networkicon.png')} style={{ alignSelf: 'center', width: 30, height: 30 }} />
          <Text style={styles.text}>Network</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
        style={[styles.tabs2, { opacity: route.name == 'ShowQr' ? 0.1 : 0.5 }]}
        onPress={() => navigation.navigate('ShowQr')}>
        <MapsMenuSvg style={{ alignSelf: 'center'}} />
        <Text style={styles.text}>Show QR</Text>
      </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.tabs, { opacity: route.name == 'Map' ? 1 : 0.5 }]}
          onPress={() => navigation.navigate('Map')}>
          {/* <MapsMenuSvg style={{ alignSelf: 'center' }} /> */}
          <Image source={require('../../assets/images/mapicon.png')} style={{ alignSelf: 'center', width: 30, height: 30 }} />
          <Text style={styles.text}>Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabs, { opacity: route.name == 'More' ? 1 : 0.5 }]}
          onPress={() => navigation.navigate('More')}>
          {/* <MoreMenuSvg style={{ alignSelf: 'center' }} /> */}
          <Image source={require('../../assets/images/moreicon.png')} style={{ alignSelf: 'center', width: 28, height: 28 }} />
          <Text style={styles.text}>More</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // containerx: {
  //   flexDirection: 'row',
  //   backgroundColor: 'transparent',
  //   position: 'relative',
  // },
  container: {
    flexDirection: 'row',
    width: '94%',
    height: 80,
    paddingHorizontal: 42,
    justifyContent: 'space-between',
    // backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)", // Semi-transparent background
    backgroundColor: "#382ad5", // Semi-transparent background
    padding: 12,
    // borderColor: '#ffffff',
    position: 'absolute',
    borderRadius: 50,
    bottom: 0,
    margin: '3%',
  },
  tabs: {
    alignSelf: 'center',
  },
  tabs2: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    transform: [
      { scale: 1.1 }
    ],
    borderRadius: 5,
    padding: 5
  },
  text: {
    color: '#fff',
    fontSize: 12,
    // lineHeight: 12,
    paddingTop: 4,
    fontFamily: 'Proxima',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
