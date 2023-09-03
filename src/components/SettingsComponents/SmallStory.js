import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

import styles from '../../utils/styles';

const SmallStory = () => (
  // BUG #103 SmallStory Text is not horizontaly fiting on the Android Screen
  <View style={styles.settingRow}>
    <View style={styles.labelContainer}>
      <Text style={styles.titleText}>Your Serene Journey Begins</Text>
      <Text style={styles.descriptionText}>
        Picture a world where stress fades like morning mist. With SoundWaves, find tranquility amid
        chaos. Immerse yourself in gentle soundscapes that dissolve tension, leaving you refreshed
        and calm.
      </Text>
      <Text style={styles.descriptionText}>
        Tune in to harmonious melodies that boost focus and spark creativity. Let soothing rhythms
        guide you to peaceful moments, nurturing a clear mind for your best work.
      </Text>
      <Text style={styles.descriptionText}>
        As day softly fades, let SoundWaves guide you to serene sleep. Wrap in comforting sounds
        that carry you to dreams. Experience rejuvenation as each note guides you deeper into
        relaxation.
      </Text>

      <Text style={styles.benefitsText}>Experience the Positives:</Text>
      <Text style={styles.benefitsList}>
        • Reduces stress and tension
        {'\n'}• Enhances focus and creativity
        {'\n'}• Improves relaxation and sleep quality
        {'\n'}• Creates a serene environment for mindfulness
      </Text>
      <Text style={styles.punchlineText}>
        Embrace the sanctuary of SoundWaves, where each gentle note ripples into perfect peace. 🌊✨
      </Text>
    </View>
  </View>
);

export default SmallStory;
