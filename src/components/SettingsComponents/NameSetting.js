import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../utils/styles'; // Adjust the import according to your actual path

const NameSetting = ({ name, setName }) => (
  <View style={styles.settingRow}>
    <View style={styles.labelContainer}>
      <Text style={styles.settingsText}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(newName) => setName(newName)}
      />
    </View>
  </View>
);

export default NameSetting;
