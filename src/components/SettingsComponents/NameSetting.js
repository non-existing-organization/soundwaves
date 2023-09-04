import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from '../../utils/styles';

/**
 * NameSetting Component.
 * Allows the user to enter their name.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.name - The current name in the TextInput.
 * @param {Function} props.setName - Function to update the name.
 *
 * @returns {JSX.Element} A View component containing Text and TextInput for name input.
 */
const NameSetting = ({ name, setName }) => (
  <View style={styles.settingRow}>
    <View style={styles.labelContainer}>
      <Text style={styles.settingsText}>What is your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#666666"
        value={name}
        onChangeText={(newName) => setName(newName)}
      />
    </View>
  </View>
);

export default NameSetting;
