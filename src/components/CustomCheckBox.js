/* eslint-disable react/prop-types */
import React, {  } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../utils/styles';

const CustomCheckBox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={styles.checkBox}>
        {checked && <Icon name="check" size={16} color="white" />}
      </View>
    </TouchableOpacity>
  );
};



export default CustomCheckBox;
