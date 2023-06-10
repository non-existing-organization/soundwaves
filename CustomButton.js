// CustomButton.js
import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from './styles';

const CustomButton = ({onPress, name, thumbnail, isActive}) => {
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

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CustomButton;
