// components/RadioButton.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { radioButtonStyles, greenColor, blackColor, transparentColor } from '../utils/styles';

const RadioButton = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          radioButtonStyles.radioButton,
          {
            borderColor: checked ? greenColor : blackColor,
            backgroundColor: checked ? greenColor : transparentColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RadioButton;
