import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
// import { ScrollView, NativeViewGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import {
  ActivityIndicator,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
  Button
} from 'react-native-paper';
// import 'react-native-gesture-handler';
import { Event, Highlight } from '../../components/home';
import { Footer } from '../../components/shared';
import FilterSvg from '../../components/svgs/filter';
import { useGetConnectQuery } from '../../hooks/query/user-query';
import { useEventStore } from '../../store/events-store';
import { filterConnect, filterData } from '../../utils/helper';
import { useProfileStore } from '../../store/profile-store';
// import { Button } from '../../components/form';
import { ConnectCard } from '../../components/connect';
import IconBadge from 'react-native-icon-badge'

export const ConnectMain = () => {
  const email = useProfileStore(state => state.email);
  const name = useProfileStore(state => state.name);
  const { data: ConnectData, isLoading, refetch } = useGetConnectQuery(email);

  const Connects = ConnectData?.connects

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();

//   useEffect(() => {
//     const timeNow = new Date();
//     EventData?.data?.other.forEach(item => {
//       if (!categories.includes(item.category)) {
//         setCategories([...categories, item.category]);
//       }
//       if (!days.includes(item.day)) {
//         setDays([...days, item.day]);
//       }
//       if (!venues.includes(item.venue)) {
//         setVenues([...venues, item.venue]);
//       }

//       if (
//         new Date(item.startTime) < timeNow &&
//         new Date(item.endTime) > timeNow
//       ) {
//         setOnGoingEvents(item);
//       } else if (new Date(item.startTime) > timeNow) {
//         setUpcommingEvents(item);
//       } else if (new Date(item.endTime) < timeNow) {
//         setCompletedEvents(item);
//       }
//     });

//     EventData?.data?.highlights.forEach(item => {
//       if (!categories.includes(item.category)) {
//         setCategories([...categories, item.category]);
//       }
//       if (!days.includes(item.day)) {
//         setDays([...days, item.day]);
//       }
//       if (!venues.includes(item.venue)) {
//         setVenues([...venues, item.venue]);
//       }
//     });
//   }, [EventData]);

  const handleNavigate = () => {
    console.log('Navigated')
    navigation.navigate('YourConnect' as never)
  }

  // const handleDayFilter = day => {
  //   if (filterDay.includes(day)) {
  //     setFilterDay(filterDay.filter(item => item !== day));
  //   } else {
  //     setFilterDay([...filterDay, day]);
  //   }
  // };

  const [searchText, setSearchText] = useState('')

  const onChangeSearch = (text) => {
    setSearchText(text)
  }

  return (
        <>
      <View
        // useAngle
        // angle={-128.06}
        style={styles.container}>
          <View style={styles.header}>
              <View style={styles.headcont}>
                <View style={styles.profileIcon}>
                  <Button onPress={() => navigation.navigate('Profile' as never)}>
                    <Text style={styles.profileiconText}>{name[0]}</Text>
                  </Button>
                </View>
                <View style={{width: '60%'}}>
                  <TextInput style={styles.input} 
                    selectionColor={'#ffffff'}
                    placeholder='Search'
                    placeholderTextColor={'white'}
                    value={searchText} onChangeText={onChangeSearch} />
                  </View>
                  <View>
                    <IconBadge 
                    MainElement={
                      <Button style={styles.connectbutton} onPress={() => {navigation.navigate('YourConnect' as never)}}>
                      <Text style={styles.connectbtnText}>Connects</Text>
                    </Button>
                    } IconBadgeStyle={
                    {position:'absolute',
                    top:-10,
                    right:0,}
                    } />
                  </View>
              </View>
            </View>
        <ScrollView
          style={[styles.container, { marginTop: 80 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#4E8FB4"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
            {/* <Button title='My Connections' onPress={() => handleNavigate()}/>
            <Button title='Edit Profile' onPress={() => navigation.navigate('EditProfile' as never)}/> */}
            <Text style={{color: '#FFFFFF', fontSize: 20, marginLeft: 25, fontFamily: 'ProximaBold', marginBottom: 20}}>People with Similar Interests</Text>
            <View style={[styles.section, {paddingBottom: 100}]}>
              {Connects === null || Connects === undefined? (
                <>
                <Text style={{color: '#FFFFFF', fontSize: 15, marginLeft: 25, fontFamily: 'ProximaBold', marginBottom: 20}}>You are a guest user. Sign In with registered email to access to networking feature</Text>
                </>
              ):(
                filterConnect(
                  Connects,
                  searchText
                ).map((item, index) => (
                    <View key={index}>
                      <ConnectCard id={item.id} name={item.name} company_name={item.company_name} url='https://ecell.in' persontype={item.persontype} description='This is the description' navigation={navigation} btnText='Connect' />
                    </View>
                ))
              )}
            </View>
            {/* <View style={{marginHorizontal: 30}}>
            <Button title='Search More'/>
            </View> */}
            </>
          )}
        </ScrollView>
      </View>
      {/* <View style={styles.fab}>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('1')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('1')}>
          <Text style={styles.fabButtonText}>Day 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('2')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('2')}>
          <Text style={styles.fabButtonText}>Day 2</Text>
        </TouchableOpacity>
      </View> */}
      {/* <View style={{backgroundColor: 'rgba(0,0,0,0.9)', borderWidth: 2, borderColor: '#ffffff'}}> */}
      <Footer navigation={navigation} />
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginVertical: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'center'
  },
  headcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%'
    // paddingHorizontal: 20
  },
  insideheadcont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  profileIcon: {
    borderRadius: 50, 
    backgroundColor: '#6C24D3',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  daybutton: {
    backgroundColor: '#382ad3',
    color: '#ffffff',
    width: 70,
    marginHorizontal: 5
  },
  daybuttonText: {
    fontFamily: 'Proxima',
    color: '#ffffff'
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
    padding: 0,
    margin: 0
  },
  inputbox: {
    width: '60%',
  },
  connectbox: {},
  connectbutton: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#382ad3'
  },
  connectbtnText: {
    color: '#ffffff',
    fontSize: 10,
    paddingHorizontal: 20,
    fontFamily: 'Proxima'
  },
    input: {
        backgroundColor: '#161616',
        // fontFamily: 'Poppins',
        color: '#FFFFFF',
        fontSize: 14,
        // lineHeight: 17,
        marginTop: 2,
        paddingHorizontal: 15,
        width: '100%',
        borderRadius: 20,
        height: '100%'
      },
  container: {
    paddingVertical: 5,
    height: '100%',
    backgroundColor: '#121212'
  },
  containerStyle: {
    backgroundColor: '#BBD4E2',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10, 
    maxHeight: Dimensions.get('window').width,
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  heading: {
    // // fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  pagerView: {
    height: 180,
  },
  events: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  accordion: {
    backgroundColor: '#DCE9F0',
  },
  accordionTitle: {
    // // fontFamily: 'Poppins',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#141415',
  },
  divider: {
    height: 3,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  fab: {
    position: 'absolute',
    right: 0,
    top: '45%',
    transform: [{ rotate: '270deg' }, { translateY: 30 }],
    flexDirection: 'row',
    backgroundColor: '#161616',
  },
  fabButton: {
    backgroundColor: '#46B1EE',
    borderColor: '#46B1EE',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderRadius: 0,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  fabButtonText: {
    color: '#FFFFFF',
    // fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  card: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: '#000000',
    width: 150,
    borderRadius: 20,
    height: 200
  }
});
