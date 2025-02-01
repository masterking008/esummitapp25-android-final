import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Location } from "../../components/map";
import { Footer } from "../../components/shared";
import { useVenues } from "../../hooks/query/other-query";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export const Maps = () => {
  const navigation = useNavigation();

  const { data: Venues, isLoading, refetch } = useVenues();

  const venuedata = Venues?.data;

  // const mapsData = useMemo(() => {
  //   return venuedata?.map((item, index) => (
  //       <View style={styles.map2} key={index}>
  //         <MapView style={styles.map}
  //       region={{
  //         latitude: Number(item.latitude),
  //         longitude: Number(item.longitude),
  //         latitudeDelta: 0.01, // Set an appropriate value for latitudeDelta
  //         longitudeDelta: 0.01, // Set an appropriate value for longitudeDelta
  //       }}
  //       >
  //         <Marker coordinate={{latitude: Number(item.latitude), longitude: Number(item.longitude)}}/>
  //         </MapView>
  //       </View>
  //   ));
  // }, [Venues]);

  // useEffect(() => {
  //   mapsData?.map((index, item) => {
  //     console.log(index)
  //   })
  // })

  return (
    <ImageBackground
    // source={{ uri: 'https://res.cloudinary.com/dcqw5mziu/image/upload/v1737490961/mapsBg_v6bgbu.png' }}

      source={require('../../assets/images/mapsBg.png')} // Replace with your image path
      style={StyleSheet.absoluteFill}
      resizeMode="cover" // Adjust the image scaling ('cover', 'contain', or 'stretch')
    >
      <View style={styles.container}>
        <ScrollView
          style={[styles.container, { marginTop: 80 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        >
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#4E8FB4"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <View style={{ height: '100%', marginBottom: 80 }}>
              <Text style={styles.title}>VENUES</Text>
              <View style={styles.content}>
                {venuedata?.map((item, index) => (
                  <View key={index}>
                    <Location name={item.name} image={item.image} latitude={item.latitude} longitude={item.longitude} />
                  </View>
                ))}
                {/* <Marker coordinate={{latitude: Number(item.latitude), longitude: Number(item.longitude)}}/> */}
              </View>
            </View>
          )}
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("window").height,
    height: '100%',
    // backgroundColor: "#05020E",
  },
  title: {
    fontFamily: "ProximaExtraBold",
    fontSize: 36,
    color: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  map: {
    width: "100%",
    height: "50%",
  },
  // map2: {
  //   width: (Dimensions.get("window").height) / 2, // Subtract padding/margin and divide by 2 for 2 columns
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 10,
  // },

});
