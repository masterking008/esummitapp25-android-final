import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
// import Splash from './src/screens/Splash/Splash';
import 'react-native-gesture-handler';
import { Splash } from './src/screens/Splash/Splash';
import { SignInScreen } from './src/screens/AuthScreen/SignIn';
import { OTPScreen } from './src/screens/AuthScreen/OTP';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/App';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
// import { useFonts } from 'expo-font';
import { useFonts } from 'expo-font';
import { useStoreToken } from './src/hooks/mutation/user-action-mutation';
// import {useFonts}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Proxima': require('./assets/fonts/Proxima.ttf'),
    'ProximaBold': require('./assets/fonts/ProximaBold.otf'),
    'ProximaExtraBold': require('./assets/fonts/ProximaExtraBold.otf'),
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current!);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current!);
      console.log(expoPushToken)
    };
  }, []);

  if(!fontsLoaded){
    return null
  }

  return (
        <AppNavigation />
  );

    // <View style={styles.container}>
      // {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      // {/* <StatusBar style="auto" /> */}
    // </View
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
