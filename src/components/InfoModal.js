// ./src/components/InfoModal.js

import React from 'react';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import styles from '../utils/styles';

const InfoModal = ({ visible, onRequestClose, content }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onRequestClose}
      >
        <View style={styles.modalContent}>
          {content.map((item, index) => (
            <Text key={index} style={styles.aboutText}>{item.label}: {item.value}</Text>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default InfoModal;
