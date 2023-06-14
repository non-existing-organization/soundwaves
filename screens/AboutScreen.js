/* eslint-disable react/prop-types */
// AboutScreen.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import styles from '../utils/styles';
import colorMap from '../utils/colorMap';

const AboutScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutText}>
        {'Each color of noise possesses distinct frequencies and sounds that can influence our brains in different ways. White and Brown noises, with their consistent, gentle hum, can help mask disturbing ambient sounds, promoting better focus and more restful sleep.\n'}
      </Text>
      {Array.from(colorMap.values()).map((color) => (
        <Text style={styles.aboutText} key={color.name}>
          <Text style={{...styles.aboutText, color: color.color, fontWeight: 'bold'}}>
            {`${color.name} `}
          </Text>
          {`${color.description.split(' ').slice(1).join(' ')}`}
        </Text>
      ))}
      <Text style={styles.aboutText}>
        {'Through regular exposure to these therapeutic sounds, individuals may experience reduced stress, improved productivity, and better overall well-being.'}
      </Text>
      <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('Main')}>
        <Ionicons name="arrow-forward" size={24} style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
