// CustomButton.js
import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from './styles';

const CustomButton = ({onPress, name, image, thumbnail, isActive}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isActive ? [styles.button, styles.activeButton] : styles.button}
    >
      <Image
        source={thumbnail}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
