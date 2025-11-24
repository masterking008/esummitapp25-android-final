import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { getTime } from '../../utils/helper';
import { Button } from 'react-native-paper';
import LocationSvg from '../svgs/location';
import { mapUrl } from '../../utils/helper';
interface IEventBoxProps {
  id: string;
  url: string;
  event: string;
  venue: string;
  latitude: string;
  longitude: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  description: string;
  navigation: any;
  tag: any;
}

export const EventBox = (props: IEventBoxProps) => {
  const ImageComponent = useMemo(() => {
    return (
      props.url === null || props.url === undefined ? (
        <Image
          source={require('../../assets/images/user_image.jpg')}
          resizeMode={'cover'}
          style={styles.image}
        />
      ) : (
        <Image
          source={{ uri: props.url }}
          resizeMode={'cover'}
          style={styles.image}
        />
      )
    );
  }, [props.url]);

  const url = mapUrl(props.latitude, props.longitude);
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Event', { id: props.id })}>
      <View
        style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.content}>
            {ImageComponent}
          </View>
          {/* <View style={styles.flag}>
          <Text style={styles.flagText}>
            {getTime(props.startTime)} - {getTime(props.endTime)}
          </Text>
        </View> */}

          <View style={styles.content2}>
            <View>
              <Text numberOfLines={2} style={styles.event}>{props.event}</Text>
              <Text style={styles.venue}><LocationSvg width={15} height={15} /> {props.venue}</Text>
            </View>
            {props.tag === 'upcoming' ? (
              <View>
                <Text style={styles.time}>Starts at</Text>
                <Text style={styles.time}>{getTime(props.startTime)}</Text>
              </View>
            ) : props.tag === 'ongoing' ? (
              <View>
                <Text style={styles.time}>Ends at</Text>
                <Text style={styles.time}>{getTime(props.endTime)}</Text>
              </View>) : (
              <View>
                <Text style={styles.time}>Ended at</Text>
                <Text style={styles.time}>{getTime(props.endTime)}</Text>
              </View>)}
          </View>
          <View style={styles.content3}>
            <TouchableOpacity onPress={() => Linking.openURL(url as string)}
            >
              {/* <Button style={[styles.button]} onPress={() => Linking.openURL(url as string)}> */}
                <Image
                  source={require('../../assets/images/directionWhite.png')}
                  style={styles.icon}
                />              
                {/* </Button> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    margin: 2,
    width: '100%',
  },
  container2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#010101",
    // borderColor: '#ffffff',
    // backgroundColor: '#000000',
    // borderWidth: 2,
    borderRadius: 16,
  },
  flag: {
    width: 80,
    backgroundColor: '#FFE100',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    position: 'absolute',
    right: -3,
    top: 19,
  },
  flagText: {
    textAlign: 'center',
    fontSize: 7,
    lineHeight: 9,
    // fontFamily: 'Poppins',
    color: '#fff',
  },
  image: {
    height: Dimensions.get('window').width / 2 - 70,
    width: Dimensions.get('window').width / 2 - 65,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  icon:{
    height: 40,
    aspectRatio: 1,
    bottom: 30,
    right: 20,
  },
  content: {
    width: '35%',
    // position: 'absolute',
    // bottom: 10,
    // left: 15,
  },
  content2: {
    width: '45%',
    paddingVertical: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-around'
    // position: 'absolute',
    // bottom: 10,
    // left: 15,
  },
  content3: {
    // marginRight: 5
    // position: 'relative',
    justifyContent: 'flex-end'
    // bottom: 10,
    // left: 15,
  },
  event: {
    fontFamily: 'ProximaBold',
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 16,
    // lineHeight: 15,
  },
  venue: {
    // fontFamily: 'Poppins',
    fontFamily: 'Proxima',
    color: '#9D9D9D',
    fontSize: 13,
    marginBottom: 2,
    paddingHorizontal: 16,
    // lineHeight: 10,
  },
  time: {
    // fontFamily: 'Poppins',
    fontFamily: 'Proxima',
    color: '#ffffff',
    fontSize: 14,
    paddingHorizontal: 16,
    // marginBottom: 2
    // lineHeight: 10,
  },
  button: {
    // paddingHorizontal: 11,
    // paddingVertical: 2,
    left: 0,
    bottom: 0,
    aspectRatio: 1,
    // borderColor: '#ffffff',
    // borderWidth: 1,
    // borderRadius: 50,
    // color: '#ffffff',
    backgroundColor: '#fff',
    zIndex: 5
  },
  // buttonText: {
  //   fontFamily: 'Proxima',
  //   fontSize: 11,
  //   // lineHeight: 21,
  //   color: '#ffffff',
  //   textTransform: 'uppercase',
  // },
});
