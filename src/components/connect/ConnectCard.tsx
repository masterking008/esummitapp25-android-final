import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getTime } from '../../utils/helper';
import { Button } from 'react-native-paper';
import { useaccept, usesendRequest } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';

interface IConnectBoxProps {
  id: string;
  url: string;
  name: string;
  company_name: string;
  persontype: string;
  btnText: string;
//   startTime: Date | undefined;
//   endTime: Date | undefined;
  description: string;
  navigation: any;
}

export const ConnectCard = (props: IConnectBoxProps) => {
  // const ImageComponent = useMemo(() => {
  //   return (
  //     {persontype === 'Founder'? (
  //       <Image
  //       source={require('../../assets/images/fb.png')}
  //       resizeMode={'cover'}
  //       style={styles.image}
  //     />
  //     ): (<></>)}
  //   );
  // }, [props.url]);

  const toast = useToast()
  const navigation = useNavigation()

  const email = useProfileStore(state => state.email)

  const { mutateAsync: sendRequest } = usesendRequest()
  const { mutateAsync: accept } = useaccept()

  const [connecttext, setconnecttext] = useState('')
  const [isdisable, setdisable] = useState(false)

  const handleSubmit = () => {
    const id = props.id
    if(connecttext === 'Connect'){
      sendRequest({email, id: id}).then(data => {
        if(data.success){
          toast.show('Connection Request Sent!' , { type: 'success' })
          setconnecttext('Requested')
        }
        else{
          toast.show('Some error occqured. Try Later', { type: 'danger' })
        }
      })
    }
    else if(connecttext === 'Accept'){
      accept({ id: id, email: email }).then((data) => {
        if (data.success) {
          toast.show("Success!", { type: "success" });
          setconnecttext('Know more')
        } else {
          toast.show("Some error occqured. Try Later", { type: "danger" });
        }
      });
    }
    else if(connecttext === 'Know more'){
      props.navigation.navigate('SingleConnect', { id: props.id })
    }
    else{
      setdisable(true)
    }
  }

  useEffect(() => {
    setconnecttext(props.btnText)
    if(connecttext === 'Requested'){
      setdisable(true)
    }
    else{
      setdisable(false)
    }
  }, [props.btnText])

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('SingleConnect', { id: props.id })}>
      <View
      style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.content}>
          {props.persontype === 'Founder'? (
            <Image source={require('../../assets/images/founder.png')} />
          ): props.persontype==='Mentor'?(
            <Image source={require('../../assets/images/mentor.png')} />
          ): props.persontype === 'Professional'? (
            <Image source={require('../../assets/images/prof.png')} />
          ): props.persontype === 'Student'?(
            <Image source={require('../../assets/images/student.png')} />
          ):(
            <Image source={require('../../assets/images/investor.png')} />
          )}
          {/* {ImageComponent} */}
        </View>
        {/* <View style={styles.flag}>
          <Text style={styles.flagText}>
            {getTime(props.startTime)} - {getTime(props.endTime)}
          </Text>
        </View> */}

        <View style={styles.content2}>
          {props.name === null || props.name === undefined? (
            <Text style={styles.event}>Field is empty</Text>
          ): (
            <Text style={styles.event}>{props.name}</Text>
          )}

{props.company_name === null || props.company_name === undefined? (
            <Text style={styles.venue}>Field is empty</Text>
          ): (
            <Text numberOfLines={2} style={styles.venue}>{props.company_name}</Text>
          )}

{props.persontype === null || props.persontype === undefined? (
            <Text style={styles.persontype}>{'\u2B24'} Field is empty</Text>
          ): (
            <Text style={styles.persontype}>{'\u2B24'} {props.persontype}</Text>
          )}
          
          {/* <Text style={styles.persontype}>{'\u2B24'} {props.persontype}</Text> */}
          {/* <Text style={styles.venue}>Time : {getTime(props.startTime)} - {getTime(props.endTime)}</Text> */}
        </View>
        <View>
        <TouchableOpacity style={{width: '100%', alignSelf: 'center'}}>
          <Button style={[styles.button, {marginTop: 10}]} onPress={handleSubmit} disabled={isdisable}>
            <Text style={styles.buttonText}>{connecttext}</Text>
          </Button>
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
    // margin: 1,
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').height / 2.5,
  },
  container2: {
    width: '100%',
    // borderColor: '#ffffff',
    backgroundColor: '#232323',
    // borderWidth: 2,
    borderRadius: 14,
    padding: 25,
    justifyContent: 'center',
    height: '100%'
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
    // height: Dimensions.get('window').width / 2 - 40,
    // width: Dimensions.get('window').width / 2 - 40,
    width: '70%',
    aspectRatio: 1,
    borderRadius: 50,
  },
  content: {
    // width: '50%',
    // position: 'absolute',
    // bottom: 10,
    // left: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    // padding: 10
  },
  content2: {
    // width: '50%',
    // padding: 10,
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // textAlign: 'center',
    // position: 'absolute',
    // bottom: 10,
    // left: 15,
  },
  event: {
    fontFamily: 'ProximaBold',
    color: '#fff',
    fontSize: 16,
    // textAlign: 'center'
    // lineHeight: 15,
  },
  venue: {
    fontFamily: 'Proxima',
    color: '#9D9D9D',
    fontSize: 12,
    // marginBottom: 2
    // lineHeight: 10,
  },
  persontype: {
    color: '#A6CE3B',
    fontSize: 10
  },
  button: {
    paddingHorizontal: 11,
    // paddingVertical: 1,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#FFE100',
    color: '#ffffff',
    width: '100%'
  },
  buttonText: {
    // fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 15,
    color: '#ffffff',
    // textTransform: 'uppercase',
  },
});
