/**
 * CustomButton Component.
 *
 * @module CustomButton
 */

/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from '../utils/styles';

/**
 * Represents a customizable button that updates its style based on provided props.
 *
 * @function
 * @param {Object} props - Properties passed to the component.
 * @param {Function} props.onPress - Callback function called when the button is pressed.
 * @param {Object} props.thumbnail - Image source object for the button's image.
 * @param {boolean} props.isActive - Determines if the button is in an active state.
 * @param {boolean} props.isMuted - Determines if the button is in a muted state.
 * @returns {React.Element} Rendered React component.
 *
 * @example
 * <CustomButton
 *   onPress={() => { console.log('Button pressed!'); }}
 *   thumbnail={require('./path-to-image.png')}
 *   isActive={true}
 *   isMuted={false}
 * />
 */
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
      <View style={styles.buttonViewStyle} >
        <Image source={thumbnail} style={styles.buttonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
