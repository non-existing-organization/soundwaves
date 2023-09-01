import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import styles from '../../utils/styles';

const BackgroundColorSetting = ({
  backgroundColor,
  setColorPickerVisible,
  colorPickerVisible,
  selectedColor,
  handleColorChange,
  handleColorConfirm,
  getContrastTextColor,
}) => (
  <>
    <View style={styles.settingRow}>
      <View style={styles.backgroundColorContainer}>
        <Text style={styles.settingsText}>Background Color</Text>
        <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
          <View style={{ ...styles.pickColorBox, backgroundColor: backgroundColor }}>
            <Text
              style={{
                ...styles.pickColorText,
                color: getContrastTextColor(backgroundColor),
              }}>
              Pick Color
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

    {/* Color Picker Modal */}
    {colorPickerVisible && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorPickerVisible}
        onRequestClose={() => setColorPickerVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.colorPickerWrapper}>
            <ColorPicker
              color={selectedColor}
              onColorChange={handleColorChange}
              // your other props here
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleColorConfirm} style={styles.confirmColorButton}>
                <Text style={styles.confirmColorButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setColorPickerVisible(false)}
                style={styles.cancelColorButton}>
                <Text style={styles.cancelColorButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )}
  </>
);

export default BackgroundColorSetting;
