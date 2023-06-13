/* eslint-disable react/prop-types */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from '../utils/styles';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.topButton} onPress={onPress}>
      <Ionicons name="arrow-back" size={24} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default BackButton;
