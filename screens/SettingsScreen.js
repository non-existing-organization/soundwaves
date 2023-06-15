/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Switch} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from '../utils/styles';
import colorMap from '../utils/colorMap';

const backgroundImage = require('../assets/background.png');

const SettingsScreen = ({navigation, route}) => {
  const [selectedNoises, setSelectedNoises] = useState([]);

  const handleBackButtonPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  const handleNoiseToggle = (colorName) => {
    setSelectedNoises((prevSelectedNoises) => {
      if (prevSelectedNoises.includes(colorName)) {
        return prevSelectedNoises.filter((noise) => noise !== colorName);
      } else {
        return [...prevSelectedNoises, colorName];
      }
    });
  };

  const handleSaveSettings = () => {
    route.params.onSelectNoises(selectedNoises);
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.topButtonsBar}>
        <TouchableOpacity style={styles.topButton} onPress={handleBackButtonPress}>
          <Ionicons name="arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.segmentTitle}>Favorite Noises</Text>
        <Text style={styles.aboutText}>Select Noises:</Text>
        {Array.from(colorMap.values()).map((color) => (
          <View key={color.name} style={styles.noiseItem}>
            <View style={styles.noiseTextContainer}>
              <Text style={styles.noiseText}>{color.name}</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={selectedNoises.includes(color.name) ? color.color : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => handleNoiseToggle(color.name)}
                value={selectedNoises.includes(color.name)}
              />
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SettingsScreen;
