import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, FAB, SegmentedButtons, Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { SegmentButton } from '../../components/form';
import { Footer } from '../../components/shared';
import {
  useGetCoordinatesMutation,
  useSetReminderMutation,
  useSetTagMutation,
} from '../../hooks/mutation/user-action-mutation';
import { useEventById } from '../../hooks/query/events-query';
import { useGetTagsAndReminder } from '../../hooks/query/user-query';
import { useProfileStore } from '../../store/profile-store';
import { getTime, mapUrl } from '../../utils/helper';
// import PushNotification from 'react-native-push-notification';
import * as Notifications from 'expo-notifications';

export const Event = ({ route }) => {
  const { data: EventData, isLoading } = useEventById(route.params.id);

  const [value, setValue] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const email = useProfileStore(state => state.email);
  const name = useProfileStore(state => state.name);

  const { data: ReminderAndTagData, isLoading: ReminderAndTagLoading } =
    useGetTagsAndReminder(email, route.params.id);

  const { mutateAsync: coordinates } = useGetCoordinatesMutation();

  const handleVenueClick = async () => {
    // coordinates({ venue: EventData?.data.venue.name as string }).then(res => {
    //   if (res.success) {
    //     const url = mapUrl(res.data.latitude, res.data.longitude);
    //     return Linking.openURL(url as string);
    //   }
    // });
    // console.log(EventData?.data.venue)
    const url = mapUrl(EventData?.data.venue.latitude, EventData?.data.venue.longitude);
    return Linking.openURL(url as string)
  };

  const { mutateAsync: setReminder } = useSetReminderMutation();

  const { mutateAsync: setTag } = useSetTagMutation();

  const navigation = useNavigation();
  const toast = useToast();
  const startTime: any = EventData?.data.startTime
  const endTime: any = EventData?.data.endTime

  useEffect(() => {
    if (!ReminderAndTagLoading) {
      if (ReminderAndTagData?.data.tag) {
        setValue(ReminderAndTagData?.data.tag);
      }
      setIsNotified(ReminderAndTagData?.data.reminders || false);
    }
  }, [ReminderAndTagLoading]);

  const handleScheduleNotification = async () => {
    const description =
      EventData?.data.name +
      ' is starting in 15 minutes at ' +
      EventData?.data.venue +
      '.';

    const notificationcontent = {
      title: EventData?.data.name,
      body: description
    }

    const trigger = new Date(EventData?.data.startTime as string).getTime() + 15 * 60 * 1000;
    Notifications.scheduleNotificationAsync({
      content: notificationcontent,
      trigger
    })
    // PushNotification.localNotificationSchedule({
    //   channelId: 'fcm_fallback_notification_channel',
    //   title: EventData?.data.name,
    //   message: description,
    //   date: new Date(
    //     new Date(EventData?.data.startTime as string).getTime() +
    //       15 * 50 * 1000,
    //   ),
    //   allowWhileIdle: true,
    //   picture: EventData?.data.image,
    //   playSound: true,
    //   soundName: 'default',
    //   id: EventData?.data.id,
    // });
  };

  const handleNotify = async () => {
    setReminder({ id: route.params.id, email: email }).then(data => {
      if (data.success) {
        handleScheduleNotification();
        toast.show('We will notify 15 minutes before the event', {
          type: 'success',
        });
        isNotified ? setIsNotified(false) : setIsNotified(true);
      } else {
        toast.show('Some Error has occured. Please try again later.', {
          type: 'danger',
        });
      }
    });
  };

  const handleTag = async (val: string) => {
    setTag({ id: route.params.id, email: email, tag: val }).then(data => {
      if (data.success) {
        if (val !== 'not going') {
          handleScheduleNotification();
        }
        toast.show('Response has been recorded', {
          type: 'success',
        });
        setValue(val);
      } else {
        if (data.isdeleted) {
          toast.show('Response Deleted', {
            type: 'danger',
          });
          setValue('')
        }
        else {
          toast.show('All seats are full', {
            type: 'danger',
          });
          setValue('')
        }
      }
    });
  };

  return (
    <View
      //   useAngle
      //   angle={-128.06}
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headcont}>
          <View style={styles.profileIcon}>
            <Button onPress={() => navigation.navigate('Profile' as never)}>
              <Text style={styles.profileiconText}>{name[0]}</Text>
            </Button>
          </View>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#4E8FB4"
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 60}}>
          <View style={{ height: '100%', paddingBottom: 180 }}>

            {EventData?.data.image === null || EventData?.data.image === undefined ? (
              <Image
                source={require('../../assets/images/user_image.jpg')}
                resizeMode={'contain'}
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 200,
                  alignSelf: 'center',
                  borderRadius: 20,
                  backgroundColor: '#161616',
                }}
              />
            ) : (
              <Image
                source={{ uri: EventData?.data.image }}
                resizeMode={'contain'}
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 200,
                  alignSelf: 'center',
                  borderRadius: 20,
                  backgroundColor: '#161616',
                }}
              />
            )}

            <Text style={styles.name}>{EventData?.data.name}</Text>

            {value === 'reserve a seat' ? (
              <SegmentButton
                value={value}
                onValueChange={handleTag}
                buttons={['seat reserved']}
              />
            ) : (
              <SegmentButton
                value={value}
                onValueChange={handleTag}
                buttons={['reserve a seat']}
              />
            )}


            <TouchableOpacity onPress={handleVenueClick}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading2}>Venue: </Text>
                <Text
                  style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                  {EventData?.data.venue.name}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Event On: </Text>
              {EventData?.data.day === '1' ? (
                <Text
                  style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                  1st February
                </Text>
              ) : (
                <Text
                  style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                  2nd February
                </Text>
              )}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Timings: </Text>
              <Text
                style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                {getTime(startTime)} - {getTime(endTime)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Speakers: </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[styles.description, { fontFamily: 'Proxima' }]}>
                {EventData?.data.speakers}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>
                About Session
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.description}>
                {EventData?.data.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 10,
          bottom: 90,
          backgroundColor: '#382ad3',
        }}
        icon={isNotified ? 'bell-off' : 'bell-badge'}
        label={isNotified ? 'We will notify you' : 'Notify Me'}
        onPress={handleNotify}
        color = '#fff'
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    paddingVertical: 10
    // marginTop: 20,
  },
  headcont: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
   profileIcon: {
    borderRadius: 50,
    backgroundColor: '#6C24D3',
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
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
  container: {
    flex: 1,
    backgroundColor: "#05020E"
  },
  name: {
    fontFamily: 'Proxima',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
    // fontFamily: 'Poppins',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  heading2: {
    fontSize: 16,
    margin: 5,
    fontFamily: 'ProximaBold',
    // fontFamily: 'Poppins',
    color: '#FFFFFF',
    // textTransform: 'uppercase',
    paddingVertical: 3,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Proxima',
    // fontFamily: 'Poppins',
    color: '#FFFFFF',
    // borderTopColor: '#382ad3',
    width: '100%',
    // borderTopWidth: 2,
    padding: 10,
    backgroundColor: '#232323',
    borderRadius: 10
  },
});
