import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ColorPicker from 'react-native-wheel-color-picker';
import { getSettings, updateSetting } from '../utils/settingsStorage';
import styles from '../utils/styles';
import DotsIndicator from '../components/DotsIndicator';
// Import the new settings components
import NameSetting from '../components/SettingsComponents/NameSetting';
import AnimationSetting from '../components/SettingsComponents/AnimationSetting';
import BackgroundColorSetting from '../components/SettingsComponents/BackgroundColorSetting';

const { width: screenWidth } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
  const carouselRef = useRef(null);

  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [startVolume, setStartVolume] = useState(50);
  const [showFirstRunMessage, setShowFirstRunMessage] = useState(true);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [message, setMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [playtimeAnimationEnabled, setPlaytimeAnimationEnabled] = useState(true);
  const pickerRef = useRef(null);

  const messages = [
    'Hi, welcome to Soundwaves, time to relax',
    'Hello, let Soundwaves soothe your soul',
    'Welcome! Unwind with the sounds of Soundwaves',
    'Hey there, Soundwaves is here to bring you peace',
    'Step into serenity with Soundwaves',
    'Soundwaves welcomes you to a world of calm',
    'Hi! Ready to experience tranquility with Soundwaves?',
    'Welcome! Let Soundwaves be your sanctuary',
    'Hello! Your oasis of relaxation starts with Soundwaves',
    'Greetings! Find your inner calm with Soundwaves',
    'Hey! Let Soundwaves wash away your stress',
    'Welcome! Tune into relaxation with Soundwaves',
    "Hi there! Let's create your perfect ambiance with Soundwaves",
    'Hello and welcome! Soundwaves is your gateway to peace',
    "Hi, you've reached Soundwaves. Time for some me-time",
    'Welcome! Let Soundwaves be your peaceful escape',
    'Hey! Discover your Zen moment with Soundwaves',
    'Hello! Soundwaves is your passport to relaxation',
    'Welcome to Soundwaves, where your calm awaits',
    'Hey there! Dive into relaxation with Soundwaves',
  ];

  useEffect(() => {
    if (showFirstRunMessage) {
      setMessage(getRandomMessage());
    }
  }, [showFirstRunMessage]);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setPlaytimeAnimationEnabled(settings.playtimeAnimationEnabled || false);
      setName(settings.name || '');
      setBackgroundColor(settings.backgroundColor || '#FFFFFF');
      setStartVolume(settings.startVolume || 50);
      setIsFirstRun(settings.isFirstRun || true);
    };
    loadSettings();
  }, []);

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

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleColorConfirm = () => {
    setBackgroundColor(selectedColor);
    setColorPickerVisible(false);
  };

  const handleStartVolumeChange = (volume) => {
    setStartVolume(volume);
  };
  const handleNextButtonPress = async () => {
    try {
      const nextIndex = activeIndex + 1;

      if (nextIndex === 1) {
        if (isFirstRun) {
          carouselRef.current.snapToItem(nextIndex);
        } else {
          navigation.navigate('Main');
        }
      } else if (nextIndex < 3) {
        carouselRef.current.snapToItem(nextIndex);
      } else if (nextIndex === 3) {
        carouselRef.current.snapToItem(nextIndex);
        await updateSetting('isFirstRun', false);
        navigation.navigate('Main'); // Navigate to Main Screen
      }

      setActiveIndex(nextIndex);
    } catch (error) {
      console.error('Error handling next button press:', error);
    }
  };

  const getContrastTextColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.substr(1, 2), 16);
    const g = parseInt(backgroundColor.substr(3, 2), 16);
    const b = parseInt(backgroundColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

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

  const handleCarouselSnap = (index) => {
    // Handle navigation or other logic when carousel snaps to a specific screen
    // You can update state or perform actions based on the current index
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={['name', 'animation', 'backgroundColor']}
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
      <DotsIndicator activeIndex={activeIndex} length={3} />
    </View>
  );
};

export default SettingsScreen;
