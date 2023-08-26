import Slider from '@react-native-community/slider';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Switch, TextInput, Modal } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import InfoModal from '../components/InfoModal';
import { getSettings, updateSetting } from '../utils/settingsStorage';
import styles from '../utils/styles';

const SettingsScreen = ({ navigation }) => {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [playtimeAnimationEnabled, setPlaytimeAnimationEnabled] = useState(false);
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [value, setValue] = useState(1);
  const [brightness, setBrightness] = useState(1); // Default brightness is full (1)
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default selected color is white

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setPlaytimeAnimationEnabled(settings.playtimeAnimationEnabled || false);
      setName(settings.name || '');
      setBackgroundColor(settings.backgroundColor || '#FFFFFF');
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      await updateSetting('playtimeAnimationEnabled', playtimeAnimationEnabled);
      await updateSetting('name', name);
      await updateSetting('backgroundColor', backgroundColor);
    };

    saveSettings();
  }, [playtimeAnimationEnabled, name, backgroundColor]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAboutPress = () => {
    setAboutModalVisible(true);
  };

  const closeAboutModal = () => {
    setAboutModalVisible(false);
  };

  const handleColorConfirm = () => {
    setBackgroundColor(selectedColor);
    setColorPickerVisible(false);
  };

  return (
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

        {/* Background Color Setting */}
        <View style={styles.settingRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.settingsText}>Background Color</Text>
          </View>
          <View style={styles.componentContainer}>
            <TouchableOpacity onPress={() => setColorPickerVisible(true)}>
              <Text style={{ ...styles.settingsText, backgroundColor, padding: 10 }}>
                Pick Color
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add other settings as needed below */}
      </ScrollView>

      {/* Color Picker Modal */}
      {colorPickerVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={colorPickerVisible}
          onRequestClose={() => setColorPickerVisible(false)}>
          <View style={styles.colorPickerModalContainer}>
            <Text style={styles.colorPickerModalLabel}>Color Picker:</Text>
            <ColorPicker
              color={selectedColor}
              onColorChange={(color) => setSelectedColor(fromHsv(color))}
              style={{ flex: 1 }}
            />

            <Text style={styles.colorPickerModalLabel}>Brightness:</Text>
            <Slider
              style={styles.colorPickerModalSlider}
              value={brightness}
              onValueChange={(value) => {
                setBrightness(value);
                setSelectedColor((prevColor) => fromHsv({ ...prevColor, v: value }));
              }}
            />

            <TouchableOpacity onPress={handleColorConfirm} style={styles.confirmColorButton}>
              <Text style={styles.confirmColorButtonText}>Confirm Color</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <InfoModal
        visible={aboutModalVisible}
        onRequestClose={closeAboutModal}
        content={[
          { label: 'App Name', value: Constants.manifest.name },
          { label: 'Developer', value: 'ChatGPT 4' },
          { label: 'Version', value: Constants.manifest.version },
          { label: 'Support Email:', value: 'non.existing.organization@gmail.com' },
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
