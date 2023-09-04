import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from '../../utils/styles';

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
