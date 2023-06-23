/* eslint-disable react/prop-types */
// CustomButton.js
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from '../utils/styles';

const CustomButton = ({onPress, thumbnail, isActive, isMuted}) => {
  const [buttonStyle, setButtonStyle] = useState(styles.button);

  useEffect(() => {
    if (isActive && !isMuted) {
      setButtonStyle([styles.button, styles.activeButton]);
    }
    if (!isActive && !isMuted) {
      setButtonStyle([styles.button, styles.inactiveButton]);
    }
    if (isActive && isMuted) {
      setButtonStyle([styles.button, styles.muteButton]);
    }
  }, [isActive, isMuted]);

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {/* //FIXME store the style in a variable */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={thumbnail} style={styles.buttonImage} />
      </View>
    </TouchableOpacity>
  );
};


export default CustomButton;
