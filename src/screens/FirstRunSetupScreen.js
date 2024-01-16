import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import DotsIndicator from '../components/DotsIndicator';
import AnimationSetting from '../components/SettingsComponents/AnimationSetting';
import BackgroundColorSetting from '../components/SettingsComponents/BackgroundColorSetting';
import NameSetting from '../components/SettingsComponents/NameSetting';
import SmallStory from '../components/SettingsComponents/SmallStory';
import { getSettings, updateSetting } from '../utils/settingsStorage';
import styles from '../utils/styles';

const { width: screenWidth } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const carouselRef = useRef(null);

  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playtimeAnimationEnabled, setPlaytimeAnimationEnabled] = useState(true);

  // TODO #90 remove message from FirstRunSetupScreen

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Navigate to the first item in the carousel when the screen is focused
      if (carouselRef.current) {
        carouselRef.current.snapToItem(0);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setPlaytimeAnimationEnabled(settings.playtimeAnimationEnabled || false);
      setName(settings.name || '');
      setBackgroundColor(settings.backgroundColor || '#FFFFFF');
      setIsFirstRun(settings.isFirstRun || true);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      await updateSetting('playtimeAnimationEnabled', playtimeAnimationEnabled);
      await updateSetting('name', name);
      await updateSetting('backgroundColor', backgroundColor);
      await updateSetting('isFirstRun', isFirstRun);
    };

    saveSettings();
  }, [playtimeAnimationEnabled, name, backgroundColor, isFirstRun]);

  /**
   * Handles the change of color by setting the selected color.
   *
   * @param {string} color - The color to set as the selected color.
   */
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  /**
   * Confirms the color selection by setting the background color and hides the color picker.
   */
  const handleColorConfirm = () => {
    setBackgroundColor(selectedColor);
    setColorPickerVisible(false);
  };

  /**
   * Handles the press event for the "Next" button.
   * Navigates through the carousel or to the main screen based on the conditions.
   *
   * @async
   * @throws Will throw an error if unable to handle the next button press.
   */
  const handleNextButtonPress = async () => {
    try {
      const nextIndex = activeIndex + 1;

      if (nextIndex === 1) {
        if (isFirstRun) {
          carouselRef.current.snapToItem(nextIndex);
        } else {
          navigation.navigate('Main');
        }
      } else if (nextIndex < 4) {
        carouselRef.current.snapToItem(nextIndex);
      } else if (nextIndex === 4) {
        carouselRef.current.snapToItem(nextIndex);
        await updateSetting('isFirstRun', false);
        navigation.navigate('Main'); // Navigate to Main Screen
      }

      setActiveIndex(nextIndex);
    } catch (error) {
      console.error('Error handling next button press:', error);
    }
  };

  /**
   * Determines the most readable text color (black or white)
   * based on the given background color.
   *
   * @param {string} backgroundColor - The background color in hexadecimal format.
   * @returns {string} The text color in hexadecimal format (#000000 for black or #ffffff for white).
   */
  const getContrastTextColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  /**
   * Renders the settings screen based on the specified screen type.
   *
   * @param {string} screenType - The type of settings screen to display ('name', 'animation', 'backgroundColor').
   * @returns {JSX.Element} The rendered settings screen.
   */
  const renderSettingsScreen = (screenType) => {
    return (
      <ScrollView
        contentContainerStyle={[styles.scrollContentContainer, styles.centerContent]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.parentContainer}>
          {/* Name Setting Screen */}
          {screenType === 'name' && <NameSetting name={name} setName={setName} />}

          {/* Animation Setting Screen */}
          {screenType === 'animation' && (
            <AnimationSetting
              playtimeAnimationEnabled={playtimeAnimationEnabled}
              setPlaytimeAnimationEnabled={setPlaytimeAnimationEnabled}
            />
          )}

          {/* Background Color Setting Screen */}
          {screenType === 'backgroundColor' && (
            <BackgroundColorSetting
              backgroundColor={backgroundColor}
              setColorPickerVisible={setColorPickerVisible}
              colorPickerVisible={colorPickerVisible} // <-- Add this line
              selectedColor={selectedColor} // <-- Add this line
              handleColorChange={handleColorChange} // <-- Add this line
              handleColorConfirm={handleColorConfirm} // <-- Add this line
              getContrastTextColor={getContrastTextColor}
            />
          )}
          {/* Small Story */}
          {screenType === 'smallStory' && <SmallStory />}
        </View>

        {/* Other components and code */}
        {/* Next Button at the Bottom */}
        <TouchableOpacity
          style={[styles.nextButton, styles.nextButtonBottom]}
          onPress={handleNextButtonPress}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  /**
   * Handles the snap event for the carousel when it snaps to a specific screen.
   *
   * @param {number} index - The index of the screen the carousel has snapped to.
   */

  const handleCarouselSnap = (index) => {
    // Handle navigation or other logic when carousel snaps to a specific screen
    // You can update state or perform actions based on the current index
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={['name', 'animation', 'backgroundColor', 'smallStory']}
        renderItem={({ item }) => renderSettingsScreen(item)}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index) => {
          handleCarouselSnap(index);
          setActiveIndex(index);
        }}
        paginationStyle={{ marginBottom: 10, color: '#ff0000', backgroundColor: '#00ff00' }} // Default style for pagination
        dotStyle={{ width: 10, height: 10, borderRadius: 5, marginHorizontal: 4 }} // Default style for dots
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
      <DotsIndicator activeIndex={activeIndex} length={4} />
    </View>
  );
};

export default SettingsScreen;
