import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

import styles from '../../utils/styles';
import BubbleOverlay from '../BubbleOverlay'; // Import the BubbleOverlay component

const AnimationSetting = () => {
  // Initialize the playtimeAnimationEnabled state to true
  const [playtimeAnimationEnabled, setPlaytimeAnimationEnabled] = useState(true);

  return (
    <View style={styles.settingRow}>
      {playtimeAnimationEnabled && <BubbleOverlay />}
      <View style={styles.animationContainer}>
        <Text style={styles.settingsText}>Would you like animations during playback</Text>
        <Switch
          value={playtimeAnimationEnabled}
          onValueChange={(newValue) => setPlaytimeAnimationEnabled(newValue)}
        />
      </View>
    </View>
  );
};

export default AnimationSetting;
