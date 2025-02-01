import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";
import { TextInput } from "../../components/form";
import Logo from "../../components/svgs/logo";
import { ADMIN_EMAIL, FLOW_STAGES, Validator } from "../../contants";
import {
  useCreateOtpMutation,
  useUserDetailMutation,
} from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMEOUT = 60 * 5;

export const SignInScreen = () => {
  const email = useProfileStore((state) => state.email);
  const setEmail = useProfileStore((state) => state.setEmail);
  const name = useProfileStore((state) => state.name)


  const toast = useToast();

  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const navigation = useNavigation();

  const setProfile = useProfileStore((state) => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  const handleSubmit = () => {
    if (email.toLowerCase() == ADMIN_EMAIL) {
      setProfile({
        email: email,
        image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
        name: "Admin User",
        pass: "Not Purchased",
        isSignedIn: true,
        isAdmin: true,
      });
      setFlow(FLOW_STAGES.MAIN);
      return;
    } else {
      CreateOtp({ email }).then((data) => {
        console.log(data)
        if (data.success) {
          toast.show("OTP sent to your email", { type: "success" });
          navigation.navigate("Otp" as never);
        } else {
          toast.show("Some error has occured. Try again later", {
            type: "danger",
          });
        }
      });
    }
  };

  // useEffect(() => {
  //   if(AsyncStorage.getItem('Esummit24email') != null || AsyncStorage.getItem('Esummit24email') != undefined){
  //     setFlow(FLOW_STAGES.MAIN)
  //     navigation.navigate('Home' as never)
  //   }
  // })

  // const handleSubmit = () => {
  //   setFlow(FLOW_STAGES.MAIN)
  // }

  return (
    // <ScrollView>
    <View style={styles.container}>
      <LinearGradient
        colors={["#4728E0", "#161616",]}
        // useAngle={true}
        // angle={-88.84}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.7]}
        style={{ height: 214, alignItems: "center", paddingTop: 100 }}
      >
        <View
        //  style={{ height: 214, alignItems: 'center', paddingTop: 100 }}
        >
          {/* <Logo width={574} height={120} /> */}
          <Image
            source={require('../../assets/images/logowhite.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subheading}>Enter your E-mail ID to proceed</Text>

        <TextInput
          label="Email Id"
          value={email}
          onChangeText={setEmail}
          validator={Validator.email}
          onSubmit={handleSubmit}
        />

      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    width: "100%",
    // height: Dimensions.get('window').height,
    height: "100%",
  },
  section: {
    padding: 20,
    backgroundColor: "#161616",
    height: "100%",
  },
  heading: {
    fontFamily: "ProximaBold",
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  subheading: {
    fontFamily: "Proxima",
    fontSize: 14,
    lineHeight: 17,
    color: "#A2A2A2",
  },
  logo: {
    width: 310,
    height: 106,
  
  },
});
