// AboutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutText}>
        {"Each color of noise possesses distinct frequencies and sounds that can influence our brains in different ways. White and Brown noises, with their consistent, gentle hum, can help mask disturbing ambient sounds, promoting better focus and more restful sleep.\n\n"}
        {"Pink noise, often likened to rainfall or wind, exhibits equal energy across octaves and can enhance brain stability and improve sleep quality.\n\n"}
        {"Blue and Grey noises, with their higher frequencies, can potentially assist in enhancing concentration and alertness.\n\n"}
        {"Through regular exposure to these therapeutic sounds, individuals may experience reduced stress, improved productivity, and better overall well-being."}
      </Text>
      <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.aboutButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
