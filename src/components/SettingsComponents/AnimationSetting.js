import React from 'react';
import { View, Text, Switch } from 'react-native';

import styles from '../../utils/styles'; // Adjust the import according to your actual path

const AnimationSetting = ({ playtimeAnimationEnabled, setPlaytimeAnimationEnabled }) => (
  <View style={styles.settingRow}>
    <View style={styles.animationContainer}>
      <Text style={styles.settingsText}>Would you like animations during playback</Text>
      <Switch
        value={playtimeAnimationEnabled}
        onValueChange={(newValue) => setPlaytimeAnimationEnabled(newValue)}
      />
    </View>
  </View>
);

export default AnimationSetting;
