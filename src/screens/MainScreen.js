/* eslint-disable react/prop-types */
// MainScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

import Icon from 'react-native-vector-icons/FontAwesome';
import colorMap from '../utils/colorMap';
import styles from '../utils/styles';
import CustomButton from '../components/CustomButton';
import BubbleOverlay from '../utils/BubbleOverlay';
import InfoModal from '../components/InfoModal';
import { getSettings } from '../utils/settingsStorage';

const MainScreen = ({ navigation }) => {
  const [mainColor, setMainColor] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousColorRef = useRef(null);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const opacityValue = useRef(new Animated.Value(0)).current; // Initialize with 0 opacity
  const [appSettings, setAppSettings] = useState({}); // State to hold the settings

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

  useFocusEffect(
    React.useCallback(() => {
      loadAndSetSettings();
      return () => {};
    }, [])
  );

  /**
   * Retrieves the app settings from AsyncStorage and sets the state.
   * @async
   * @function
   * @description
   * - Retrieves the app settings from AsyncStorage.
   * - Sets the app settings in state.
   * - If no settings exist, it defaults to an empty object.
   * - If an error occurs, it defaults to an empty object.
   * @throws Will throw an error if there's an issue retrieving the settings.
   *
   */
  const loadAndSetSettings = async () => {
    try {
      const loadedSettings = await getSettings();
      console.log('Loaded settings:', loadedSettings);
      setAppSettings(loadedSettings); // Set the loaded settings in state
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  /**
   * Downloads the given audio file from a URL and saves it locally. If the file already exists locally, it skips the download and returns the local path.
   *
   * @async
   * @function
   * @param {string} audioFileUrl - The remote URL of the audio file to be downloaded.
   * @returns {Promise<string|null>} - Returns the local URI path of the audio file if successful, otherwise returns null.
   *
   * @description
   * - The function first extracts the file name from the given URL.
   * - It then checks if the audio file already exists locally. If it does, it simply returns the local path.
   * - If not, it downloads the audio file and saves it in the local directory.
   * - During the download process, a modal with a spinner is shown to indicate loading.
   *
   * @throws Will throw an error if there's an issue downloading the file.
   */
  const downloadAudioFile = async (audioFileUrl) => {
    const uriArray = audioFileUrl.split('/');
    const audioFile = uriArray[uriArray.length - 1];

    // Define the path of the new file
    const path = `${FileSystem.documentDirectory}${audioFile}`;

    // Check if the file already exists
    const fileInfo = await FileSystem.getInfoAsync(path);
    if (fileInfo.exists) {
      // console.log(`File already exists at path: ${path}`);
      console.log(`File already exists`);
      return path;
    } else {
      console.log(`File does not exist, downloading new file`);
      // If it doesn't exist, download the file
      try {
        // show a modal with a spinner
        setIsLoading(true);
        setDownloadModalVisible(true);
        const result = await FileSystem.downloadAsync(audioFileUrl, path);
        console.log('Download result:', result.status);
        setIsLoading(false);
        setDownloadModalVisible(false);
        return result.uri;
      } catch (e) {
        console.error('Error downloading file:', e);
        return null;
      }
    }
  };

  /**
   * Checks if a sound is loaded before performing any operations on it.
   *
   * @async
   * @function
   * @returns {Promise<boolean>} - Returns `true` if sound is loaded, otherwise `false`.
   */
  const isSoundLoaded = async () => {
    if (!sound) return false;
    const status = await sound.getStatusAsync();
    return status.isLoaded;
  };

  /**
   * Handles the button press for a given color, and manages the sound playback and UI updates accordingly.
   *
   * @async
   * @function
   * @param {string} colorName - The name of the color associated with the pressed button.
   * @param {string} image - The image associated with the color.
   * @param {string} audioFileUrl - The remote URL for the audio file.
   * @param {string} audioFileName - The name of the audio file.
   *
   * @description
   * - If the same sound/colorName is selected, it stops and unloads the current sound, resets the main color and active color.
   * - If a different sound/colorName is selected, it stops any currently playing sound, then downloads the new audio file and plays the sound.
   * - Also, updates the main color on the UI based on the pressed button's color.
   *
   * @throws Will throw an error if there's an issue stopping or unloading a sound.
   */
  const handleButtonPress = async (colorName, image, audioFileUrl) => {
    console.log(
      `Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audioFileUrl}`
    );

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
            setActiveColor(null); // Reset active color
          }
        } catch (e) {
          console.error('Error stopping or unloading sound:', e);
        }
        return; // Exit the function after stopping the sound
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
    loadAndPlayNewSound(localAudioFileUri, colorName);

    // Update the main color
    setMainColor(colorMap.get(colorName).colors[Math.floor(Math.random() * 5)]);
  };

  /**
   * Loads a new audio file and starts playing it. During the loading process, a BubbleOverlay is faded in.
   *
   * @async
   * @function
   * @param {string} audioFile - The local URI of the audio file to be played.
   * @param {string} colorName - The name of the color associated with the audio file.
   *
   * @description
   * - The function starts by fading in the BubbleOverlay.
   * - It then loads the audio file, sets the looping, volume, rate, and pitch correction properties.
   * - On successful loading of the audio, it updates the current audio file and active color states.
   * - If the audio file finishes playing and isn't looping, it updates a loop count.
   * - Finally, the audio is played.
   *
   * @throws Will throw an error if there's an issue loading or playing the sound.
   */
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

  /**
   * Handles the speaker button press, toggling the sound between muted and unmuted states.
   *
   * @async
   * @function
   *
   * @description
   * - If the sound object exists and the sound is currently muted, it will:
   *   - Unmute the sound.
   *   - Set the state to indicate sound is not muted.
   *   - Restore the active color to its previous value.
   *   - Fade in the BubbleOverlay.
   * - If the sound object exists and the sound is currently not muted, it will:
   *   - Mute the sound.
   *   - Set the state to indicate sound is muted.
   *   - Store the current active color.
   *   - Set the active color to 'red'.
   *   - Fade out the BubbleOverlay.
   *
   * @throws Will throw an error if there's an issue setting the mute state on the sound object.
   */
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

  /**
   * Handles the settings button press, navigating to the SettingsScreen.
   * @function
   * @description
   * Navigates to the SettingsScreen.
   */
  const handleSettingsPress = () => {
    navigation.navigate('Settings'); // Navigate to the SettingsScreen
  };

  /**
   * Renders a custom button component based on the provided color data.
   *
   * @function
   * @param {Array} colorData - An array containing the color name and its associated properties.
   * @param {string} colorData.0 - The name of the color.
   * @param {Object} colorData.1 - The associated properties of the color.
   * @param {string} colorData.1.name - The human-readable name of the color.
   * @param {string} colorData.1.image - The image associated with the color.
   * @param {string} colorData.1.thumbnail - The thumbnail for the color.
   * @param {string} colorData.1.audioFile - The audio file associated with the color.
   *
   * @returns {JSX.Element} - A React component representing the custom button.
   *
   * @description
   * - For each color, a button is rendered with its respective image, thumbnail, and active/muted states.
   * - On press of the button, the handleButtonPress function is called with the color's properties.
   */
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

  /**
   * The default background color to be used if no color is selected.
   * This value is retrieved from the app settings.
   * If no settings exist, it defaults to white.
   *
   * @type {string} - The default background color.
   *
   */
  const backgroundColorDefault = appSettings.backgroundColor;

  /**
   * Determines the background color to be used.
   * Uses the `mainColor` value if it's available; otherwise, defaults to `backgroundColorDefault`.
   *
   * @type {string} - The selected background color.
   */
  const backgroundColor = mainColor || backgroundColorDefault; // Default to white if no color is selected

  /**
   * Main screen rendering which consists of:
   * - A top bar with a volume toggle button.
   * - A modal to show downloading status.
   * - A gradient background container that holds an overlay for visual effects.
   * - A container at the bottom with custom color buttons for selection.
   *
   * @returns {JSX.Element} - The rendered main screen component.
   */
  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.speakerButton} onPress={handleSpeakerButtonPress}>
          <Icon
            name={isMuted ? 'volume-off' : 'volume-up'}
            size={24}
            color={isMuted ? 'red' : 'white'}
          />
        </TouchableOpacity>
        {/* Add other elements for the top bar */}
        <TouchableOpacity style={styles.topButton} onPress={handleSettingsPress}>
          <Icon name="gear" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.modal}>
        <InfoModal
          visible={downloadModalVisible}
          onRequestClose={() => {}}
          content={[{ label: 'Downloading new sound...' }]}
        />
      </View>

      <LinearGradient
        colors={['black', backgroundColor, 'black']}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.9 }}
        style={[styles.mainContainer, { height: 200 }]}>
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
