// SettingsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../utils/styles';

const backgroundImage = require('../assets/background.png');  // assuming you have a similar background image

const SettingsScreen = ({ navigation }) => {
  const handleBackButtonPress = () => {
    console.log('Back button pressed');
    navigation.goBack();  // Go back to the previous screen in the stack
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.topButtonsBar}>
        <TouchableOpacity style={styles.topButton} onPress={handleBackButtonPress}>
          <Ionicons name="arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{color: '#ffffff', fontSize: 20}}>This is the Settings Screen</Text>
      </View>
    </ImageBackground>
  );
};

export default SettingsScreen;
