import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

import styles from '../../utils/styles';
import BubbleOverlay from '../BubbleOverlay'; // Import the BubbleOverlay component

/**
 * AnimationSetting Component.
 * Allows the user to enable or disable animations during playback.
 *
 * @returns {JSX.Element} Returns a View component that contains the BubbleOverlay and Switch components.
 *
 * @example
 * import AnimationSetting from './AnimationSetting';
 *
 * const ParentComponent = () => {
 *   return (
 *     <View>
 *       <AnimationSetting />
 *       // other components
 *     </View>
 *   );
 * };
 */
const AnimationSetting = () => {
  /**
   * State to manage whether or not animations are enabled during playtime.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
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
