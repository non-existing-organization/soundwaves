/* eslint-disable react/prop-types */
// AboutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../utils/styles';
import colorMap from '../utils/colorMap';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { storageItemsKeys } from '../utils/storageKeys';

const AboutScreen = ({ navigation }) => {

  const [_, setKeyItem] = useLocalStorage(storageItemsKeys.settings.firstItemOpened);

  return (
    <View style={styles.container}>
      <Text style={styles.aboutText}>
        {'Soothing sounds cocoon us in serenity, promoting relaxation and peaceful sleep. These therapeutic soundscapes nurture mindfulness and melt away stress, enhancing well-being and focus.\n'}
      </Text>
      {Array.from(colorMap.values()).map((color) => (
        <Text style={styles.aboutText} key={color.name}>
          <Text style={{ ...styles.aboutText, color: color.color, fontWeight: 'bold' }}>
            {`${color.name} `}
          </Text>
          {`${color.description.split(' ').slice(1).join(' ')}`}
        </Text>
      ))}
      <Text style={styles.aboutText}>
        {'Through regular exposure to these therapeutic sounds, individuals may experience reduced stress, improved productivity, and better overall well-being.'}
      </Text>
      <TouchableOpacity style={styles.aboutButton} onPress={async () => {
        await setKeyItem(false);
        navigation.navigate('Main')
      }}>
        <Ionicons name="arrow-forward" size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
