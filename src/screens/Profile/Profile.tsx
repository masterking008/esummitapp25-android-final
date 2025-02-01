import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Divider, List, Modal, Portal, ActivityIndicator } from 'react-native-paper';
import { ProfileSection } from '../../components/profile';
import { useProfileStore } from '../../store/profile-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CrossSvg from '../../components/svgs/cross';
import QRCode from 'react-native-qrcode-svg';
import { FLOW_STAGES } from '../../contants';
import { useFlowStore } from '../../store/flow-store';

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  const name = useProfileStore(state => state.name);
  const email = useProfileStore(state => state.email);
  const image = useProfileStore(state => state.image);
  const pass = useProfileStore(state => state.pass);
  const qrcode = useProfileStore(state => state.qrcode);
  const setFlow = useFlowStore(state => state.setFlow);
  const isAdmin = useProfileStore(state => state.isAdmin);

  const isguest = useProfileStore(state => state.isGuest)

  const navigation = useNavigation();

  const handleLogout = async () => {
    setFlow(FLOW_STAGES.AUTH);
    await AsyncStorage.removeItem('Esummit24email');
    navigation.navigate('SignIn' as never);
  };

  return (
    <ImageBackground
    // source={{ uri: 'https://res.cloudinary.com/dcqw5mziu/image/upload/v1737490960/profileBg_d5g0le.png' }}

      source={require('../../assets/images/profileBg.png')} // Replace with your image path
      style={StyleSheet.absoluteFill}
      resizeMode="cover" // Adjust the image scaling ('cover', 'contain', or 'stretch')
    >
      <View
        //   useAngle
        //   angle={-128.06}
        style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <View
            // useAngle
            // angle={-128.06}
            >
              <TouchableOpacity
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 10,
                  paddingVertical: 5,
                }}
                onPress={hideModal}>
                <CrossSvg />
              </TouchableOpacity>
              {qrcode ? (
                <>
                  <ActivityIndicator
                    animating={true}
                    color="#4E8FB4"
                    size="large"
                    style={{ marginTop: 20 }}
                  />
                  <Image
                    source={{
                      uri: qrcode,
                    }}
                    style={styles.qrImage}
                  />
                </>
              ) : (
                <>
                  <ActivityIndicator
                    animating={true}
                    color="#4E8FB4"
                    size="large"
                    style={{ marginTop: 20 }}
                  />
                  <View
                    style={{
                      backgroundColor: 'white',
                      alignItems: 'center',
                      marginHorizontal: 25,
                      paddingVertical: 30,
                      marginTop: 10,
                    }}>
                    <QRCode value={email} size={150} />
                  </View>
                </>
              )}

              <Text style={styles.qrText}>
                Scan this QR code at the registration desk to get your pass.
              </Text>
            </View>
          </Modal>
        </Portal>

        <ProfileSection name={name} email={email} image={image as string} />

        <View style={styles.passContainer}>
          <View style={styles.passContent}>
            <Text style={styles.boldSmallText}>Pass : </Text>
            {pass === null || pass === undefined ? (
              <Text style={styles.boldSmallText}>Not Purchased</Text>
            ) : (
              <Text style={styles.boldSmallText}>{pass}</Text>
            )}
          </View>
        </View>

        {/* {isguest? (
        <>
        <TouchableOpacity onPress={() => {navigation.navigate('EditProfile' as never)}}>
        <View style={styles.section}>
          <Text style={styles.text}>Register Now</Text>
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} />
      </>
      ) : (
        <>
        <TouchableOpacity onPress={() => {navigation.navigate('EditProfile' as never)}}>
        <View style={styles.section}>
          <Text style={styles.text}>Edit Your Profile</Text>
        </View>
        <List.Icon icon="chevron-right" color="#FFF" />
      </TouchableOpacity>
      <Divider style={styles.divider} />
      </>
      )} */}

        {pass === null || pass === undefined || isguest ? (
          <>
            <TouchableOpacity onPress={() => Linking.openURL('https://ecell.in/esummit/pass')}>
              <View style={styles.passContainer}>
                <View style={styles.passContent2}>
                  <Image
                    source={require('../../assets/images/gold.png')}
                    style={styles.icon}
                  />
                  <Text style={[styles.boldSmallText, { color: "#E5BE52" }]}> Buy VIP Pass</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* <TouchableOpacity onPress={() => Linking.openURL('https://ecell.in/esummit/pass')}>
              <View style={styles.passContainer}>
                <View style={styles.passContent2}>
                  <Image
                    source={require('../../assets/images/gold.png')}
                    style={styles.icon}
                  />
                  <Text style={[styles.boldSmallText, { color: "#E5BE52" }]}> Upgrade your Pass </Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </>
        )}

        <Text style={styles.title}>More</Text>

        {isguest ? (
          <>
            <TouchableOpacity onPress={() => Linking.openURL('https://ecell.in/esummit/register/')}>
              <View style={[styles.section, { justifyContent: 'space-between' }]}>
                <Text style={styles.text}>Register Now </Text>
                <List.Icon icon="chevron-right" color="#FFF" />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => { navigation.navigate('EditProfile' as never) }}>
              <View style={[styles.section, { justifyContent: 'space-between' }]}>
                <Text style={styles.text}>Edit Your Profile </Text>
                <List.Icon icon="chevron-right" color="#FFF" />
              </View>
            </TouchableOpacity>
          </>
        )}


        {/* <TouchableOpacity
        onPress={() => navigation.navigate('TimeTable' as never)}>
        <View style={[styles.section, { justifyContent: 'space-between' }]}>
          <Text style={styles.text}>My Schedule </Text>
          <List.Icon icon="chevron-right" color="#FFF" />
        </View>
      </TouchableOpacity>
      <Divider style={styles.divider} /> */}

        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <View style={styles.section}>
            <Text style={styles.text}>Show QR Code </Text>
            <Icon
              name="qr-code"
              size={24}
              style={{ paddingRight: 10 }}
              color="#FFF"
            />
          </View>
        </TouchableOpacity>

        {isAdmin ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('QRCode' as never)}>
              <View style={styles.section}>
                <Icon
                  name="qr-code"
                  size={20}
                  style={{ paddingRight: 10 }}
                  color="#900"
                />
                <Text style={styles.text}>Scan QR Code </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}

        <Button
          onPress={handleLogout}
          mode={'outlined'}
          textColor={'#000000'}
          style={styles.logout}>
          <Image
            source={require('../../assets/images/logout.png')}
            style={styles.icon}
          />
          <Text style={styles.boldSmallText}> Logout</Text>
        </Button>
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: "#05020E",
    paddingTop: 60,
  },
  section: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
    marginHorizontal: 50,
    marginVertical: 5,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.02)", // Semi-transparent background
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passContent2: {
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)", // Semi-transparent background
    width: 200,
    borderColor: '#E5BE52',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  passContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'ProximaBold',
    fontSize: 28,
    color: "#FFFFFF",
    paddingHorizontal: 65,
  },
  text: {
    fontSize: 18,
    fontFamily: 'ProximaBold',
    lineHeight: 22,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  boldSmallText: {
    fontSize: 15,
    fontFamily: 'ProximaBold',
    // fontWeight: 'bold',
    lineHeight: 22,
    color: '#FFFFFF',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'ProximaBold',
    // fontWeight: 'bold',
    lineHeight: 22,
    color: '#FFFFFF',
  },
  icon: {
    height: 24,
    width: 24,
  },
  logout: {
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)", // Semi-transparent background
    width: 200,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 50,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
  },
  containerStyle: {
    backgroundColor: '#000000',
    width: 300,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  modalBack: {
    backgroundColor: '#BBD4E2',
    position: 'absolute',
    right: 20,
    top: 0,
  },
  qrImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  qrText: {
    fontSize: 18,
    fontFamily: 'Proxima',
    lineHeight: 22,
    color: '#FFFFFF',
    padding: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3D3C3C',
  },
});
