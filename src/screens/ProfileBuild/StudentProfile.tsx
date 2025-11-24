import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";
// import { TextInput } from "../../components/form";
import Logo from "../../components/svgs/logo";
import { ADMIN_EMAIL, FLOW_STAGES, Validator } from "../../contants";
import { useaddInterestMutation, usebuildStudent } from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import MultiSelect from "react-native-multiple-select";
import { MultiSelectBox } from "../../components/form";
import { Footer } from "../../components/shared";
import { Checkbox } from "react-native-paper";
import { Button } from "../../components/form";

export const StudentProfile = () => {
  const email = useProfileStore((state) => state.email);

  const toast = useToast();

  const { mutateAsync: buildstudent } = usebuildStudent();

  const navigation = useNavigation();

  // const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  const handleSubmit = () => {
    // const formattedInterest = selectedItems.map(item => ({ id: item }));
    buildstudent({ email, school: selectedSchool, achievements: achievements, skills: skills }).then(data => {
      if (data.success) {
        toast.show('Profile is Built', { type: 'success' });
        setFlow(FLOW_STAGES.MAIN)
        navigation.navigate('Home' as never);
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });
      }
    });
  };

  const [selectedSchool, setSelectedSchool] = useState("");
  const [achievements, setAchievements] = useState("");
  const [skills, setSkills] = useState("");

  const onChangeSchool = (text: string) => {
    setSelectedSchool(text)
  }

  const onChangeAchievements = (text: string) => {
    setAchievements(text)
  }

  const onChangeSkills = (text: string) => {
    setSkills(text)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerx}>
        <View style={styles.section}>
        <Text style={{ color: "#ffffff", fontFamily: 'ProximaBold', fontSize: 20, marginBottom: 20 }}>Profile for Student</Text>
          <View>
            <Text style={{ color: "#ffffff", fontFamily: 'ProximaBold', fontSize: 13, marginBottom: 5 }}>College/School Name</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                width: '100%',
                marginBottom: 20
              }}
            >
                <TextInput style={styles.input} value={selectedSchool} onChangeText={onChangeSchool} placeholder="College/School Name" placeholderTextColor={'white'} />
            </View>

            <Text style={{ color: "#ffffff", marginBottom: 5, fontFamily: 'ProximaBold', fontSize: 13, }}>Your Achievement</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20
              }}
            >
              <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" style={styles.input} value={achievements} onChangeText={onChangeAchievements} placeholder="Write your achievements here" placeholderTextColor={'white'} />
            </View>

            <Text style={{ color: "#ffffff", fontFamily: 'ProximaBold', fontSize: 13, marginBottom: 5 }}>Your Skills</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 25
              }}
            >
              <TextInput multiline={true} numberOfLines={5} textAlignVertical="top" style={styles.input} value={skills} onChangeText={onChangeSkills} placeholder="Write your skills here" placeholderTextColor={'white'} />
            </View>
            <Text style={styles.warning}>Note: Your contact details will be shared with person you connect with for better communication</Text>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    width: "100%",
    // height: Dimensions.get('window').height,
    height: "100%",
    
  },
  containerx: {
    backgroundColor: "#121212",
    // height: Dimensions.get('window').height + 200,
    height: "100%",
    marginBottom: 80,
  },
  section: {
    padding: 20,
    backgroundColor: "#121212",
    // height: Dimensions.get("window").height,
  },
  heading: {
    // fontFamily: 'Poppins',
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  subheading: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 17,
    color: "#A2A2A2",
    textTransform: "capitalize",
  },
  optionCont: {
    width: "40%",
    textAlign: "center",
    margin: 10,
    // height: '35%'
  },
  checkedcont: {
    textAlign: 'center',
    borderColor: '#FFE100',
    borderWidth: 2,
    backgroundColor: '#FFE100',
    padding: 10,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // height: '100%'
  },
  notcheckedcont: {
    textAlign: 'center',
    borderColor: '#ffffff',
    borderWidth: 2,
    padding: 10,
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // height: 'fite'
  },
  input: {
    backgroundColor: '#121212',
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 14,
    // lineHeight: 17,
    marginTop: 2,
    padding: 10,
    width: '100%'
  },
  warning: {
    color: 'red',
    fontFamily: 'Proxima'
  }
});
