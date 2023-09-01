import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Switch, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from '@react-native-community/slider'; // Import the slider component

import { getSettings, updateSetting } from '../utils/settingsStorage';
import styles from '../utils/styles';
import InfoModal from '../components/InfoModal';

/**
 * The settings screen where users can modify their application settings.
 *
 * @returns {JSX.Element} The rendered component.
 */
const SettingsScreen = ({ navigation }) => {
  const pickerRef = useRef(null);

  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [playtimeAnimationEnabled, setPlaytimeAnimationEnabled] = useState(false);
  const [name, setName] = useState('');
  const [firstRun, setIsFirstRun] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default selected color is white
  const [startVolume, setStartVolume] = useState(50); // Initial value of the start volume

  /**
   * Load application settings from storage.
   */
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setPlaytimeAnimationEnabled(settings.playtimeAnimationEnabled || false);
      setName(settings.name || '');
      setBackgroundColor(settings.backgroundColor || '#FFFFFF');
      setStartVolume(settings.startVolume || 50);
    };
    loadSettings();
  }, []);

  /**
   * Save any changes made to application settings.
   */
  useEffect(() => {
    const saveSettings = async () => {
      await updateSetting('playtimeAnimationEnabled', playtimeAnimationEnabled);
      await updateSetting('name', name);
      await updateSetting('backgroundColor', backgroundColor);
      await updateSetting('startVolume', startVolume);
      await updateSetting('isFirstRun', firstRun);
    };

    saveSettings();
  }, [playtimeAnimationEnabled, name, backgroundColor, startVolume, firstRun]);

  /**
   * Navigate back to the previous screen.
   */
  const handleBackPress = () => {
    navigation.goBack();
  };

  /**
   * Open the about modal.
   */
  const handleAboutPress = () => {
    setAboutModalVisible(true);
  };

  /**
   * Close the about modal.
   */
  const closeAboutModal = () => {
    setAboutModalVisible(false);
  };

  /**
   * Handle color change event from the color picker.
   * @param {string} color The selected color.
   */
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  /**
   * Handle color confirm event from the color picker.
   */
  const handleColorConfirm = () => {
    setBackgroundColor(selectedColor);
    setColorPickerVisible(false);
  };

  /**
   * Handle start volume change event from the slider.
   * @param {number} volume The selected volume.
   */
  const handleStartVolumeChange = (volume) => {
    setStartVolume(volume);
  };

  /**
   * Handle the next button press.
   * @date 27/08/2023 - 22:18:58
   *
   * @description
   * When the button si pressed the setting isFirstRun is set to false and the user is redirected to the MainScreen.
   *
   *
   *
   */
  const handleNextPress = () => {
    setIsFirstRun(false);
    navigation.navigate('Main');
  };

  /**
   * Get the contrast text color based on the background color.
   * @date 27/08/2023 - 22:18:58
   *
   * @param {*} backgroundColor
   * @returns {*}
   */
  const getContrastTextColor = (backgroundColor) => {
    // Convert background color to a luminance value
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white or black based on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  return (
    // TODO Use reusable Settings components #89

    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.topButton} onPress={handleBackPress}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={handleAboutPress}>
          <Icon name="info" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Name Setting */}
        <View style={styles.settingRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.settingsText}>Name</Text>
          </View>
          <View style={styles.componentContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(newName) => setName(newName)}
            />
          </View>
        </View>
        {/* Playtime Animation Setting */}
        <View style={styles.settingRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.settingsText}>Animation</Text>
          </View>
          <View style={styles.componentContainer}>
            <Switch
              value={playtimeAnimationEnabled}
              onValueChange={(newValue) => setPlaytimeAnimationEnabled(newValue)}
            />
          </View>
        </View>
        <View style={styles.settingRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.settingsText}>Background Color</Text>
          </View>
          <View style={styles.componentContainer}>
            <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
              <View
                style={{
                  ...styles.pickColorBox, // A new style for the wrapping View
                  backgroundColor: backgroundColor,
                  // borderColor: getContrastTextColor(backgroundColor), // Use contrasting text color as border color
                }}>
                <Text
                  style={{
                    ...styles.pickColorText,
                    color: getContrastTextColor(backgroundColor), // Calculate inverted text color
                  }}>
                  Pick Color
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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
                ref={pickerRef}
                color={selectedColor}
                onColorChange={handleColorChange}
                thumbSize={40}
                sliderSize={40}
                noSnap={true}
                row={false}
              />
              <View style={styles.buttonGap} />
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

      <InfoModal
        visible={aboutModalVisible}
        onRequestClose={closeAboutModal}
        content={[
          {
            label: 'App Name: ',
            value: Constants.expoConfig.name,
          },
          {
            label: 'Developer: ',
            value: 'ChatGPT 4',
          },
          {
            label: 'Version:',
            value: Constants.expoConfig.version,
          },
          {
            label: 'Support Email:',
            value: 'non.existing.organization@gmail.com',
          },
          {
            label: 'Support Website:',
            value: 'https://github.com/non-existing-organization/soundwaves',
          },
        ]}
      />
    </View>
  );
};

export default SettingsScreen;
