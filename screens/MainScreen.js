/* eslint-disable react/prop-types */
// MainScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Modal, Text, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/FontAwesome';
import colorMap from '../utils/colorMap';
import styles from '../utils/styles';
import CustomButton from '../components/CustomButton';
import BubbleOverlay from '../utils/BubbleOverlay';



const MainScreen = ({ navigation }) => {
  const [mainColor, setMainColor] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousColorRef = useRef(null);
  const backgroundColorDefault = '#202020'; // TODO add it on the settnigs as a variable to select the default color
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const opacityValue = useRef(new Animated.Value(0)).current; // Initialize with 0 opacity



  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound on component unmount');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

  // Download audio file
  const downloadAudioFile = async (audioFileUrl) => {
    const uriArray = audioFileUrl.split('/');
    const audioFile = uriArray[uriArray.length - 1];

    // Define the path of the new file
    const path = `${FileSystem.documentDirectory}${audioFile}`;

    // Check if the file already exists
    const fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
      // console.log(`File already exists at path: ${path}`);
      console.log(`✅ File already exists`);
      return path;
    } else {
      console.log(`🛜 File does not exist, downloading new file`);
      // If it doesn't exist, download the file
      try {
        // show a modal with a spinner
        setIsLoading(true);
        setModalVisible(true);
        const result = await FileSystem.downloadAsync(audioFileUrl, path);
        console.log('📊 Download result:', result.status);
        setIsLoading(false);
        setModalVisible(false);
        return result.uri;
      } catch (e) {
        console.error('❌ Error downloading file:', e);
        return null;
      }
    }
  };

// ===========================================

// Check if sound is loaded before stopping or unloading
const isSoundLoaded = async () => {
  if (!sound) return false;
  const status = await sound.getStatusAsync();
  return status.isLoaded;
};

const handleButtonPress = async (colorName, image, audioFileUrl, audioFileName) => {
  console.log(`Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audioFileUrl}`);

  // If the same sound/colorName is selected
  if (activeColor === colorName) {
    if (sound) {
      console.log('Same sound selected, stopping and unloading current sound');
      try {
        // Check if the sound is loaded before attempting to stop or unload
        if (await isSoundLoaded()) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setMainColor(backgroundColorDefault);
          setActiveColor(null);  // Reset active color
        }
      } catch (e) {
        console.error('Error stopping or unloading sound:', e);
      }
      return;  // Exit the function after stopping the sound
    }
  }

  // Stop the currently playing sound, if any other sound is playing
  if (sound) {
    console.log('Stopping and unloading current sound');
    try {
      // Check if the sound is loaded before attempting to stop or unload
      if (await isSoundLoaded()) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    } catch (e) {
      console.error('Error stopping or unloading sound:', e);
    }
  }

  // Reset the mute state for the new sound
  setIsMuted(false);

  // Download the new audio file and play the sound
  const localAudioFileUri = await downloadAudioFile(audioFileUrl);
  if (!localAudioFileUri) {
    console.log('Error downloading sound');
    return;
  }

  // Play the new sound
  loadAndPlayNewSound(localAudioFileUri, colorName, audioFileName);

  // Update the main color
  setMainColor(colorMap.get(colorName).colors[Math.floor(Math.random() * 5)]);
};

// ===========================================


  // Load and play a new sound
  const loadAndPlayNewSound = async (audioFile, colorName) => {
    console.log('Loading new sound');
    // Fade in the BubbleOverlay
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioFile },
        {
          isLooping: true,
          isMuted: false,
          volume: 1.0,
          rate: 1.0,
          shouldCorrectPitch: true,
        },
        (status) => {
          if (status.didJustFinish && !status.isLooping) {
            setLoopCount((prevCount) => prevCount + 1);
            console.log('Loop count:', loopCount);
          }
        }
      );
      setSound(newSound);
      setCurrentAudioFile(colorName);
      setActiveColor(colorName);
      console.log('New sound loaded');

      console.log('Playing new sound');
      await newSound.playAsync();
      console.log('New sound playing');

    } catch (e) {
      console.error('Error loading or playing new sound:', e);
    }
  };

  // Handle speaker button press
  const handleSpeakerButtonPress = async () => {
    if (sound) {
      if (isMuted) {
        console.log('Unmuting sound');
        await sound.setIsMutedAsync(false);
        setIsMuted(false);
        setActiveColor(previousColorRef.current || null);
        previousColorRef.current = null;
        console.log('Sound unmuted');

        // Fade in the BubbleOverlay
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000, // Adjust duration as needed
          useNativeDriver: true,
      }).start();

      } else {
        console.log('Muting sound');
        await sound.setIsMutedAsync(true);
        setIsMuted(true);
        previousColorRef.current = activeColor;
        setActiveColor('red');
        console.log('Sound muted');

        // Fade out the BubbleOverlay
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 1000, // Adjust duration as needed
          useNativeDriver: true,
        }).start();

      }
    }
  };

  // Render a custom button for each color in the color map
  const renderCustomButton = ([colorName, { name, image, thumbnail, audioFile }]) => {
    const onPress = () => handleButtonPress(colorName, image, audioFile);
    const isButtonActive = activeColor === colorName;
    const isButtonMuted = isMuted;

    return (
      <View key={colorName} style={styles.buttonWrapper}>
        <CustomButton
          onPress={onPress}
          image={image}
          thumbnail={thumbnail}
          isActive={isButtonActive}
          isMuted={isButtonMuted}
        />
      </View>
    );
  };

  // Select a random background color
  const backgroundColor = mainColor || backgroundColorDefault ; // Default to white if no color is selected

  // Render the main screen
  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.speakerButton} onPress={handleSpeakerButtonPress}>
          <Icon name={isMuted ? 'volume-off' : 'volume-up'} size={24} color={isMuted ? 'red' : 'white'} />
        </TouchableOpacity>
        {/* Add other elements for the top bar */}
      </View>

      <View style={styles.modal}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.loadingText}>Downloading new sound...</Text>
            </View>
            <View style={styles.spinnerContainer}>
              <Spinner visible={isLoading} />
            </View>
          </View>
        </Modal>
      </View>

      <LinearGradient
        colors={['black', backgroundColor, 'black']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.9 }}
        style={[styles.mainContainer, { height: 200 }]}
      >
        <Animated.View style={{ ...styles.overlay, opacity: opacityValue }}>
          {activeColor && <BubbleOverlay />}
        </Animated.View>
      </LinearGradient>


      <View style={styles.buttonsContainer}>
        {/* Buttons for color selection */}
        {Array.from(colorMap).map(renderCustomButton)}
      </View>
    </View>
  );

};

export default MainScreen;
