import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Switch, TextInput, Modal } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getSettings, updateSetting } from '../utils/settingsStorage';
import styles from '../utils/styles';

/**
 * The settings screen where users can modify their application settings.
 *
 * @returns {JSX.Element} The rendered component.
 */
const SettingsScreen = ({ navigation }) => {
  const pickerRef = useRef(null);
  const [playtimeAnimationEnabled, setPlaytimeAnimationEnabled] = useState(false);
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default background color is white
  const [colorPickerVisible, setColorPickerVisible] = useState(false); // Added state for color picker modal
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default selected color is white
  const [startVolume, setStartVolume] = useState(50); // Initial value of the start volume
  const [showFirstRunMessage, setShowFirstRunMessage] = useState(true); // Added state for first run message
  const [isFirstRun, setIsFirstRun] = useState(true); // Added state for first run
  const [message, setMessage] = useState('');

  const messages = [
    "Welcome to Sound Waves! Let's Get Started",
    'Hello there! Ready to Set Up Sound Waves?',
    "Hi! It's Time to Customize Your Sound Waves Experience",
    'Greetings! Your Sound Waves Adventure Begins Here',
    "Hey, Welcome! Let's Configure Your Sound Waves App",
    'Hello and Welcome! Ready to Personalize Sound Waves?',
    "Hey, New User! Let's Begin the Sound Waves Setup",
    'Hi, Friend! Time to Set Up Your Sound Waves Journey',
    "Welcome aboard! Let's Dive into Sound Waves Setup",
    "Hello, Sound Enthusiast! Let's Shape Your Sound Waves",
  ];

  /**
   * Get a random message from the messages array.
   */
  useEffect(() => {
    if (showFirstRunMessage) {
      setMessage(getRandomMessage());
    }
  }, [showFirstRunMessage]);

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
      setIsFirstRun(settings.isFirstRun);
      console.log('Load Settings Function', settings);
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
      await updateSetting('isFirstRun', isFirstRun);
    };

    saveSettings();
  }, [playtimeAnimationEnabled, name, backgroundColor, startVolume, isFirstRun]);

  /**
   * Get a random message from the messages array.
   * @returns {string} A random message.
   * @date 27/08/2023 - 22:18:58
   * @example
   * getRandomMessage();
   * // => "Hello there! Ready to Set Up Sound Waves?"
   */
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
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
   * Handles the press event of the "Next" button.
   * Updates the 'isFirstRun' setting to true and navigates to the "Main" screen.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves once the setting is updated and navigation is performed.
   */
  const handleNextButtonPress = async () => {
    try {
      // Set isFirstRun to false
      await updateSetting('isFirstRun', false);
      // Navigate to the Main screen
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error handling next button press:', error);
    }
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

  //  log all settings
  console.log('Settings Screen', {
    playtimeAnimationEnabled,
    name,
    backgroundColor,
    startVolume,
    isFirstRun,
  });

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBarContainer}></View>
      {/* First Run Message Container */}
      {showFirstRunMessage && (
        <View style={styles.firstRunContainer}>
          <Text style={styles.firstRunText}>{message}</Text>
        </View>
      )}
      {/* Settings Header */}
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
      {/* add a button that will move to the next page  */}
      <View style={styles.nextButton}>
        <TouchableOpacity onPress={handleNextButtonPress}>
          {/* add an icon point right */}
          <Icon name="arrow-right" size={30} style={styles.nextButton} />
        </TouchableOpacity>
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
    </View>
  );
};

export default SettingsScreen;
