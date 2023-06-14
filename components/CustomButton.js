/* eslint-disable react/prop-types */
// CustomButton.js
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from '../utils/styles';

const CustomButton = ({onPress, name, image, thumbnail, isActive}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isActive ? [styles.button, styles.activeButton] : styles.button}
    >
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={thumbnail}
          style={styles.buttonImage}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
