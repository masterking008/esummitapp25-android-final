import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import { TextInput } from '../../components/form';
import Logo from '../../components/svgs/logo';
import { ADMIN_EMAIL, FLOW_STAGES, Validator } from '../../contants';
import { useaddInterestMutation } from '../../hooks/mutation/user-action-mutation';
import { useFlowStore } from '../../store/flow-store';
import { useProfileStore } from '../../store/profile-store';
import MultiSelect from 'react-native-multiple-select';
import { MultiSelectBox } from '../../components/form';
import { Footer } from '../../components/shared';
import { Checkbox } from 'react-native-paper';
import { Button } from '../../components/form';
import { useInterests } from '../../hooks/query/other-query';

export const BuildProfileScreen = () => {
  const email = useProfileStore(state => state.email);

  const toast = useToast();

  const { data: Interests, isLoading, refetch } = useInterests()

  const languages = Interests?.data

  const { mutateAsync: saveInterest } = useaddInterestMutation();

  const navigation = useNavigation();

  // const setProfile = useProfileStore(state => state.setProfile);

  const setFlow = useFlowStore(state => state.setFlow);

  //   this.state = {
  //     options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}]
  // };

  const handleSubmit = () => {
    // const formattedInterest = selectedItems.map(item => ({ id: item }));
    if (selectedLanguages.length === 0 || selectedPerson === '' || selectedMeet === '') {
      toast.show('Please answer all question', { type: 'danger' })
    }
    else {
      saveInterest({ email, interest: selectedLanguages, persontype: selectedPerson, meet: selectedMeet }).then(data => {
        if (data.success) {
          toast.show('Interests are saved', { type: 'success' });
          if (selectedPerson === 'Student') {
            navigation.navigate('StudentProfile' as never)
          }
          else if (selectedPerson === 'Founder') {
            navigation.navigate('StartupProfile' as never)
          }
          else if (selectedPerson === 'Mentor') {
            navigation.navigate('MentorProfile' as never)
          }
          else if (selectedPerson === 'Investor') {
            navigation.navigate('InvestorProfile' as never)
          }
          else {
            navigation.navigate('ProfessionalProfile' as never)
          }
          // setFlow(FLOW_STAGES.MAIN)
          // navigation.navigate('Home' as never);
        } else {
          toast.show('Some error has occured. Try again later', {
            type: 'danger',
          });
        }
      });
    }
    // console.log(selectedLanguages)
  };

  // const languages = [
  //   { id: 'Fintech', name: 'Fintech' },
  //   { id: 'Operations', name: 'Operations' },
  //   { id: 'Technical', name: 'Technical' },
  //   { id: 'Marketing', name: 'Marketing' },
  //   { id: 'Entrepreneurship', name: 'Entrepreneurship' },
  //   { id: 'Business', name: 'Business' },
  //   // Add more languages as needed
  // ];

  const person = [
    'Student',
    'Founder',
    'Mentor',
    'Investor',
    'Professional'
  ]

  const whomtomeet = [
    'Student',
    'Founder',
    'Mentor',
    'Investor',
    'Professional'
  ]

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedMeet, setSelectedMeet] = useState('');

  const toggleLanguage = (languageId) => {
    setSelectedLanguages((prevSelectedLanguages) =>
      prevSelectedLanguages.includes(languageId)
        ? prevSelectedLanguages.filter((id) => id !== languageId)
        : [...prevSelectedLanguages, languageId]
    );
  };

  const togglePerson = (personID) => {
    setSelectedPerson(personID)
  };

  const toggleMeet = (personID) => {
    setSelectedMeet(personID)
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.containerx}>
          <View style={styles.section}>
            {/* <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.subheading}>Enter your E-mail ID to proceed</Text> */}
            {/* <MultiSelectBox 
          selectText="Pick Choices"
          items={items}
          selectedItems={selectedItems}
          onSelectedItemsChange={onSelectedItemsChange}
          onSubmit={handleSubmit}
          /> */}
            <Text style={styles.heading}>Build Profile for Networking</Text>
            <View>
              <Text style={{ color: '#ffffff', fontFamily: 'ProximaBold', fontSize: 18 }}>Select your Interests:</Text>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                {languages?.map((language) => (
                  <View key={language.value} style={styles.optionCont}>
                    <TouchableOpacity
                      onPress={() => toggleLanguage(language.value)}
                      style={selectedLanguages.includes(language.value) ? styles.checkedcont : styles.notcheckedcont}
                    >
                      <Text style={{ color: '#ffffff', fontFamily: 'ProximaBold', fontSize: 13 }}>{language.viewValue}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <Text style={{ color: '#ffffff', fontFamily: 'ProximaBold', fontSize: 18 }}>Who are you?</Text>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                {person.map((language) => (
                  <View key={language} style={styles.optionCont}>
                    <TouchableOpacity
                      onPress={() => togglePerson(language)}
                      style={selectedPerson === language ? styles.checkedcont : styles.notcheckedcont}
                    >
                      <Text style={{ color: '#ffffff', fontFamily: 'ProximaBold', fontSize: 13 }}>{language}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <Text style={{ color: '#ffffff', fontFamily: 'ProximaBold', fontSize: 18 }}>Whom you wanna meet in E-Summit(Select One)?</Text>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                {whomtomeet.map((language) => (
                  <View key={language} style={styles.optionCont}>
                    <TouchableOpacity
                      onPress={() => toggleMeet(language)}
                      style={selectedMeet === language ? styles.checkedcont : styles.notcheckedcont}
                    >
                      <Text style={{ color: '#ffffff', fontFamily: 'ProximaBold', fontSize: 13 }}>{language}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <Button title='Next' onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    width: '100%',
    // height: Dimensions.get('window').height,
    height: '100%',
    paddingTop: 10,
    paddingBottom: 30,
  },
  containerx: {
    backgroundColor: '#121212',
    // height: '100%',
    marginBottom: 80,

  },
  section: {
    padding: 20,
    backgroundColor: '#121212',
    // height: Dimensions.get('window').height,
  },
  heading: {
    fontFamily: 'ProximaBold',
    fontSize: 19,
    // lineHeight: 28,
    color: '#FFFFFF',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  subheading: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    textTransform: 'capitalize',
  },
  optionCont: {
    width: '40%',
    textAlign: 'center',
    margin: 10,
    // height: '35%'
  },
  checkedcont: {
    textAlign: 'center',
    borderColor: '#382ad3',
    borderWidth: 2,
    backgroundColor: '#382ad3',
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
  }
});
