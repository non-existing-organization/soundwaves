/**
 * InfoModal Component.
 *
 * @module src/components/InfoModal
 */

import React from 'react';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import styles from '../utils/styles';

/**
 * Represents a modal to display information content.
 *
 * @function
 * @param {Object} props - Properties passed to the component.
 * @param {boolean} props.visible - Determines if the modal should be visible or not.
 * @param {Function} props.onRequestClose - Callback function called when user tries to close the modal.
 * @param {Array.<{ label: string, value: string }>} props.content - List of content items to display in the modal.
 * @returns {React.Element} Rendered React component.
 *
 * @example
 * <InfoModal
 *   visible={true}
 *   onRequestClose={() => {}}
 *   content={[{ label: "Label1", value: "Value1" }, { label: "Label2", value: "Value2" }]}
 * />
 */
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
            <Text key={index} style={styles.aboutText}>{item.label} {item.value}</Text>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default InfoModal;
