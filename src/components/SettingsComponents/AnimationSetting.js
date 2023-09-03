import React from 'react';
import { View, Text, Switch } from 'react-native';

import styles from '../../utils/styles';

// TODO #102 show animation when toggle is switched as a preview of what it looks like

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
