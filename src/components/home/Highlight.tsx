import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import LiveSvg from '../svgs/live';
import LocationSvg from '../svgs/location';
import { getTime } from '../../utils/helper';

interface IHighlightBoxProps {
  id: string;
  url: string;
  alt: string;
  index: number;
  length: number;
  venue: string;
  day: string;
  startTime: any;
  isLive?: boolean;
  navigation: any;
}

export const HighlightBox = (props: IHighlightBoxProps) => {
  const ImageComponent = useMemo(() => {
    return (
      <>
        {props.url === null || props.url === undefined ? (
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
        )}
      </>
    );
  }, [props.url]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => props.navigation.navigate('Event', { id: props.id })}>
      <View style={{ width: '100%', padding: 10 }}>
        <View style={styles.container2}>
          {/* <View style={styles.content}>
            {ImageComponent}
          </View> */}
          <View style={styles.backgroundContainer}>
            {React.cloneElement(ImageComponent, { style: styles.backgroundImage })}
          </View>
          {/* Filter overlay */}
          <View style={styles.filterOverlay} />
          <View style={styles.content2}>
            <Text style={styles.alt}>{props.alt}</Text>
            <Text style={styles.alt2}><LocationSvg width={15} height={15} /> {props.venue} </Text>
            <Text style={styles.alt3}>Day {props.day} | {getTime(props.startTime)}</Text>
            {props.isLive ? (<LiveSvg style={{ position: 'absolute', bottom: 10, right: 10 }} />) : (<></>)}
          </View>
        </View>
        <View style={styles.dots}>
          {Array(props.length)
            .fill(0)
            .map((_, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    color: props.index == index ? '#ffe100' : '#fff',
                    marginHorizontal: 8,
                    fontSize: 10,
                  }}>
                  {'\u2B24'}
                </Text>
              );
            })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    // marginHorizontal: 5,
    backgroundColor: '#232323',
  },
  container2: {
    borderRadius: 25,
    marginHorizontal: 'auto',
    // borderColor: '#ffffff',
    // borderWidth: 2,
    width: '100%',
    height: '80%',
    backgroundColor: '#232323',
    flexWrap: 'wrap',
    flexDirection: 'row',
    shadowColor: '#000000ff', // Shadow color
    shadowOpacity: 0.7, // Shadow opacity (70%)
    shadowOffset: { width: 0, height: 0 }, // Spread shadow in all directions
    shadowRadius: 20, // Spread radius
    elevation: 10, // Android shadow
    overflow: 'hidden', // Ensures the image stays within the container
    position: 'relative',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject, // Makes it cover the entire container

  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover', // Ensures the image covers the container
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay for a dim effect
  },
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14
  },
  content: {
    // position: 'absolute',
    // bottom: 22,
    // left: 14,
    width: '35%',
    height: '100%'
  },
  content2: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 75,
    height: '100%'
  },
  alt: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    fontFamily: 'ProximaBold',
    // lineHeight: 15,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  alt2: {
    fontFamily: 'Proxima',
    fontSize: 12,
    color: '#9D9D9D',
    marginVertical: 1,
  },
  alt3: {
    fontFamily: 'Proxima',
    fontWeight: '900',
    color: '#ffffff',
    fontSize: 14,
  },
  dots: {
    height: '30%',
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
