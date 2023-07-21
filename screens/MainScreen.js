/* eslint-disable react/prop-types */
// MainScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Modal, Text } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay';




import Icon from 'react-native-vector-icons/FontAwesome';
import colorMap from '../utils/colorMap';
import styles from '../utils/styles';
import CustomButton from '../components/CustomButton';


const MainScreen = ({ navigation }) => {
  const [mainColor, setMainColor] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousColorRef = useRef(null);
  const backgroundColorDefault = '#202020'; // TODO add it on the settnigs as a variable to select the default color
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const printDeleteFiles = async () => {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log('📁 Files in FileSystem.documentDirectory:', files);
    // delete each of the files
    files.forEach(async (file) => {
      console.log('🗑 Deleting file:', file);
      await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${file}`);
    }
    );
  };

  // Handle button press not working
  const handleButtonPress = async (colorName, image, audioFileUrl, audioFileName) => {
    console.log('👉 Button Pressed');
    // printDeleteFiles();

    const localAudioFileUri = await downloadAudioFile(audioFileUrl);
    if (!localAudioFileUri) {
      console.log('Error downloading sound');
      return;
    }

    const isOtherSoundPlaying = sound && (await sound.getStatusAsync()).isPlaying;
    let isSoundLoaded = sound && (await sound.getStatusAsync()).isLoaded;
    const isSameSound = currentAudioFile === localAudioFileUri;

    if (isMuted) {
      console.log('⏹️ Stopping and unloading previous sound');
      if (isSoundLoaded) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {
          console.error('Error stopping or unloading sound:', e);
        }
      }
      setIsMuted(false);
    }

    setMainColor(colorMap.get(colorName).colors[Math.floor(Math.random() * 5)]);

    console.log('🔈 isSoundLoaded:', isSoundLoaded);
    console.log('🔈 isOtherSoundPlaying:', isOtherSoundPlaying);
    console.log('🔈 isSameSound:', isSameSound);
    console.log('🔈 isMuted:', isMuted);

    // unload all sounds and stop all sounds
    if (isOtherSoundPlaying) {
      console.log('⏹️ Stopping and unloading previous sound');
      if (isSoundLoaded) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {
          console.error('Error stopping or unloading sound:', e);
        }
      }
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
      } else {
        console.log('Muting sound');
        await sound.setIsMutedAsync(true);
        setIsMuted(true);
        previousColorRef.current = activeColor;
        setActiveColor('red');
        console.log('Sound muted');
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
        start={{ x: 0, y: 0.1 }} // Adjust the start position of the gradient
        end={{ x: 0, y: 0.9 }} // Adjust the end position of the gradient
        style={[styles.mainContainer, { height: 200 }]} // Adjust the height of the gradient
      >
        {/* Content for the main container */}
      </LinearGradient>

      <View style={styles.buttonsContainer}>
        {/* Buttons for color selection */}
        {Array.from(colorMap).map(renderCustomButton)}
      </View>
    </View>
  );


};

export default MainScreen;
