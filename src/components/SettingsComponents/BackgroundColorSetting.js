import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import styles from '../../utils/styles';

/**
 * BackgroundColorSetting Component.
 * Allows the user to select a default background color.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.backgroundColor - The current background color.
 * @param {Function} props.setColorPickerVisible - Function to set visibility of the color picker.
 * @param {boolean} props.colorPickerVisible - Whether the color picker is visible or not.
 * @param {string} props.selectedColor - The currently selected color in the color picker.
 * @param {Function} props.handleColorChange - Function to handle changes in the color picker.
 * @param {Function} props.handleColorConfirm - Function to confirm the selected color.
 * @param {Function} props.getContrastTextColor - Function to get contrasting text color for a given background color.
 *
 * @returns {JSX.Element} A View component containing Text, TouchableOpacity, and Modal for color selection.
 *
 * @example
 *
 * import BackgroundColorSetting from './BackgroundColorSetting';
 *
 * const ParentComponent = () => {
 *   const [colorPickerVisible, setColorPickerVisible] = useState(false);
 *   const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
 *   const [selectedColor, setSelectedColor] = useState('#FFFFFF');
 *
 *   const handleColorChange = (newColor) => {
 *     setSelectedColor(newColor);
 *   };
 *
 *   const handleColorConfirm = () => {
 *     setBackgroundColor(selectedColor);
 *     setColorPickerVisible(false);
 *   };
 *
 *   const getContrastTextColor = (bgColor) => {
 *     // Implementation to get a contrasting text color based on bgColor
 *   };
 *
 *   return (
 *     <View>
 *       <BackgroundColorSetting
 *         backgroundColor={backgroundColor}
 *         setColorPickerVisible={setColorPickerVisible}
 *         colorPickerVisible={colorPickerVisible}
 *         selectedColor={selectedColor}
 *         handleColorChange={handleColorChange}
 *         handleColorConfirm={handleColorConfirm}
 *         getContrastTextColor={getContrastTextColor}
 *       />
 *       // other components
 *     </View>
 *   );
 * };
 */
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
        <Text style={styles.settingsText}>What should be the default color?</Text>
        <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
          <View style={{ ...styles.pickColorBox, backgroundColor }}>
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
        transparent
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
