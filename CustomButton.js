// CustomButton.js

import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const CustomButton = ({ onPress, name, image, thumbnail }) => {
  const handlePress = () => {
    onPress(image);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Image source={thumbnail} style={styles.buttonImage} />
    </TouchableOpacity>
  );
};

export default CustomButton;
