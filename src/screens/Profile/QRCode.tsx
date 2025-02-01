import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, List, Modal, Portal, RadioButton } from 'react-native-paper';
import { runOnJS } from 'react-native-reanimated';
// import {
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import { useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
// import { Camera } from 'react-native-vision-camera';
import { Camera, CameraType } from 'expo-camera';
// import {
//   scanBarcodes,
//   BarcodeFormat,
//   Barcode,
// } from 'vision-camera-code-scanner';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AccomodationResult, EventAttendance, ScanResult } from '../../components/profile';
import { Validator } from '../../contants';
import { useEventByName } from '../../hooks/query/events-query';

export const QRCode = () => {
  const { data: EventName, isLoading } = useEventByName();
  const [hasPermission, setHasPermission] = useState(false);
  // const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [event, setEvent] = useState('Entry Attendance');

  const [visible, setVisible] = useState(false);
  const [scanned, setScanned] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const device = CameraType.back
//   const device = devices.back;

  const [attendee, setAttendee] = useState<string>();

  const handleScan = ({ type, data }) => {
    setScanned(true)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setAttendee(data);
    // if (data.length > 0) {
    //   const code = data[0].displayValue as string;
    // }
  };

  const onClose = async () => {
    setAttendee(undefined);
    setScanned(false)
  };

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
  //     checkInverted: true,
  //   });
  //   runOnJS(handleScan)(detectedBarcodes);
  // }, []);

  const checkPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted')
  };

  useEffect(() => {
    checkPermission()
  }, []);

  return (
    <View
    //   useAngle
    //   angle={-128.06}
      style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          // onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <ScrollView>
            <View>
              <RadioButton.Group
                onValueChange={newValue => setEvent(newValue)}
                value={event}>
                <TouchableOpacity
                  onPress={() => {
                    setEvent('Entry Attendance');
                  }}>
                  <View style={styles.itemList}>
                    <RadioButton value={'Entry Attendance'} />
                    <Text style={styles.itemText}>{'Entry Attendance'}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEvent('Accomodation');
                  }}>
                  <View style={styles.itemList}>
                    <RadioButton value={'Accomodation'} />
                    <Text style={styles.itemText}>{'Accomodation'}</Text>
                  </View>
                </TouchableOpacity>
                {EventName?.data.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (event === item.name) {
                          setEvent('Entry Attendance');
                        } else {
                          setEvent(item.name);
                        }
                      }}>
                      <View style={styles.itemList}>
                        <RadioButton value={item.name} />
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={hideModal}>
            <Button mode="contained">
              Done
            </Button>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <View
        style={[
          styles.section,
          {
            height: 300,
            backgroundColor: 'black',
          },
        ]}>
        {device != null && hasPermission && (
          <>
            {/* <Camera
              style={StyleSheet.absoluteFill}
              type={device}
              // isActive={!attendee}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              // frameProcessor={frameProcessor}
            //   frameProcessorFps={5}
            /> */}
            <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={StyleSheet.absoluteFillObject}
      />
            <Text style={styles.barcodeTextURL}>{attendee}</Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={showModal}>
        <Button mode="contained">
          TASK : {event}
        </Button>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={{ color: 'white', fontSize: 20 }}>Status</Text>
        {attendee &&
        Validator.email.test(attendee) &&
        event === 'Entry Attendance' ? (
          <ScanResult email={attendee} close={onClose} />
        ) : (
          <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>
            Please Scan the QR Code
          </Text>
        )}

        {attendee &&
        Validator.email.test(attendee) &&
        event === 'Accomodation' ? (
          <AccomodationResult email={attendee} close={onClose} />
        ) : null}

        {attendee &&
        Validator.email.test(attendee) &&
        event !== 'Entry Attendance' && event !== 'Accomodation' ? (
          <EventAttendance email={attendee} event={event} close={onClose} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#121212'
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: '#BBD4E2',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get('window').width,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  accordion: {
    backgroundColor: '#DCE9F0',
  },
  accordionTitle: {
    // fontFamily: 'Poppins',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#141415',
  },
  itemList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  itemText: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
