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
import {
  useaddInterestMutation,
  usebuildInvestor,
  usebuildMentor,
  usebuildProfessional,
  usebuildStartup,
} from "../../hooks/mutation/user-action-mutation";
import { useFlowStore } from "../../store/flow-store";
import { useProfileStore } from "../../store/profile-store";
import MultiSelect from "react-native-multiple-select";
import { MultiSelectBox } from "../../components/form";
import { Footer } from "../../components/shared";
import { Checkbox } from "react-native-paper";
import { Button } from "../../components/form";

export const ProfessionalProfile = () => {
  const email = useProfileStore((state) => state.email);

  const toast = useToast();

  const { mutateAsync: buildprofessional } = usebuildProfessional();

  const navigation = useNavigation();

  // const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore((state) => state.setFlow);

  //   this.state = {
  //     options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}]
  // };

  const handleSubmit = () => {
    buildprofessional({ email, company_name: name, designation: designation, skills: skills, achievements: achievements }).then(data => {
      if (data.success) {
        toast.show('Profile Built Succesfully!', { type: 'success' });
        setFlow(FLOW_STAGES.MAIN)
        navigation.navigate('Home' as never);
      } else {
        toast.show('Some error has occured. Try again later', {
          type: 'danger',
        });
      }
    });
  };

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [skills, setSkills] = useState("");
  const [achievements, setAchievements] = useState("");

  const onChangeName = (text: string) => {
    setName(text)
  }

  const onChangeSkills = (text: string) => {
    setSkills(text)
  }

  const onChangeDesignation = (text: string) => {
    setDesignation(text)
  }

  const onChangeAchievements = (text: string) => {
    setAchievements(text)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerx}>
        <View style={styles.section}>
          <View>
          <Text style={{ color: "#ffffff" }}>Your Firm Name</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                width: '100%',
                marginBottom: 10
              }}
            >
                <TextInput style={styles.input} value={name} onChangeText={onChangeName} placeholder="Firm name" placeholderTextColor={'white'}/>
            </View>

            <Text style={{ color: "#ffffff" }}>Your Designation</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                width: '100%',
                marginBottom: 10
              }}
            >
                <TextInput style={styles.input} value={designation} onChangeText={onChangeDesignation} placeholder="Designation" placeholderTextColor={'white'}/>
            </View>

            <Text style={{ color: "#ffffff" }}>Your Skills</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                width: '100%',
                marginBottom: 10
              }}
            >
                <TextInput multiline={true} numberOfLines={5} style={styles.input} value={skills} onChangeText={onChangeSkills} placeholder="Write your skills here" placeholderTextColor={'white'} textAlignVertical="top"/>
            </View>

            <Text style={{ color: "#ffffff" }}>Your Achievements</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                width: '100%',
                marginBottom: 10
              }}
            >
                <TextInput multiline={true} numberOfLines={5} style={styles.input} value={achievements} onChangeText={onChangeAchievements} placeholder="Write your achievements here" placeholderTextColor={'white'} textAlignVertical="top"/>
            </View>
            <Text style={styles.warning}>Note: Your contact details will be shared with person you connect with for better communication</Text>
            <Button title="Next" onPress={handleSubmit} />
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
