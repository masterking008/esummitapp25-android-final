import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { TextInput, Button, Menu } from "react-native-paper"; // Assuming you're using react-native-paper
import DropDownPicker from "react-native-dropdown-picker"; // For dropdown functionality
import Logo from "../../components/svgs/logo";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export const RegisterScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profession, setProfession] = useState(null);

  const [isProfessionDropdownOpen, setProfessionDropdownOpen] = useState(false);
  const professionOptions = [
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
    { label: "Entrepreneur", value: "entrepreneur" },
    { label: "Other", value: "other" },
  ];

  const handleRegister = async () => {
    // Basic validation
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !profession
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://apiserver.ecell.in/app25/user/register/", {
        email,
        password,
        firstName,
        lastName,
        contact: contactNumber,
        profession,
        state: "App",
        country: "App",
        pincode: "111111",
      });

      if (response.data.success) {
        Alert.alert("Success", "You have registered successfully!");
        // Redirect to login screen
        navigation.navigate('SignIn')
      } else {
        Alert.alert("Error", response.data.message || "Registration failed.");
        console.log(response.data);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4728E0", "#161616"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.7]}
        style={styles.header}
      >
        <Image
          source={require('../../assets/images/logowhite.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </LinearGradient>

      <ScrollView style={styles.section}>
        <Text style={styles.heading}>Register</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          textColor="#FFFFFF"
          />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          textColor="#FFFFFF" />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          textColor="#FFFFFF" />
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          textColor="#FFFFFF" />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          textColor="#FFFFFF" />
        <TextInput
          label="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          style={styles.input}
          textColor="#FFFFFF" />
        <DropDownPicker
          open={isProfessionDropdownOpen}
          value={profession}
          items={professionOptions}
          setOpen={setProfessionDropdownOpen}
          setValue={setProfession}
          placeholder="Select your profession"
          style={styles.dropdown}
          textStyle={{ color: "#FFFFFF" }}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          contentStyle={{ padding: 10 }}
        >
          Register
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    height: 214,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontFamily: "ProximaBold",
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  dropdown: {
    marginBottom: 15,
    backgroundColor: "#1F2122",
    borderColor: "#4E8FB4",
  },
  dropdownContainer: {
    backgroundColor: "#1F2122",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4728E0",
  },
  logo: {
    width: 310,
    height: 106,
  
  },
});
