/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from './styles';

const SettingsButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.topButton} onPress={onPress}>
      <Ionicons name="settings" size={24} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SettingsButton;
