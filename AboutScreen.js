// AboutScreen.js
import React from 'react';
import PropTypes from 'prop-types'; // <- Import PropTypes
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutText}>
        {'Each color of noise possesses distinct frequencies and sounds that can influence our brains in different ways. White and Brown noises, with their consistent, gentle hum, can help mask disturbing ambient sounds, promoting better focus and more restful sleep.\n\n\n\n'}
        {'White noise, often compared to the gentle hiss of a radio tuned to an unused frequency, distributes energy equally across all audible frequencies, providing a soothing backdrop that can enhance focus and facilitate restful sleep.\n\n'}
        {'Brown noise, commonly associated with the calming rumble of a waterfall or distant thunder, presents greater energy at lower frequencies, offering a deep, ambient sound that may foster relaxation and aid in promoting deeper sleep.\n\n\n\n'}
        {'Through regular exposure to these therapeutic sounds, individuals may experience reduced stress, improved productivity, and better overall well-being.'}
      </Text>
      <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.aboutButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

AboutScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};


export default AboutScreen;
