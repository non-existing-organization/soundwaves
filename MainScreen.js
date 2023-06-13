/* eslint-disable react/prop-types */
// MainScreen.js
import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import CustomButton from './CustomButton';
import colorMap from './colorMap';
import styles from './styles';

const backgroundImage = require('./assets/background.png');

const MainScreen = ({navigation}) => {
  const [mainImage, setMainImage] = useState(backgroundImage);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [activeColor, setActiveColor] = useState(null); // Add this state

  useEffect(() => {
    return sound ?
      () => {
        console.log('Unloading Sound on component unmount');
        sound.unloadAsync();
      } :
      undefined;
  }, [sound]);

  useEffect(() => {
    Audio.setAudioModeAsync({playsInSilentModeIOS: true});
  });

  const handleButtonPress = async (colorName, image, audio_file) => {
    console.log(
        `Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audio_file}`,
    );
    setMainImage(image);

    const isOtherSoundPlaying = sound && audio_file !== currentAudioFile;
    const isSoundLoaded = sound && (await sound.getStatusAsync()).isLoaded;

    if (sound && isSoundLoaded) {
      const status = await sound.getStatusAsync();
      if (isOtherSoundPlaying) {
        console.log('Stopping and unloading previous sound');
        await sound.stopAsync();
        await sound.unloadAsync();
        console.log('Previous sound unloaded');
        setActiveColor(null);
      } else if (status.isPlaying) {
        console.log('Pausing current sound');
        await sound.pauseAsync();
        console.log('Current sound paused');
        setActiveColor(null);
        setMainImage(backgroundImage);

        return;
      } else {
        console.log('Resuming current sound');
        await sound.playAsync();
        console.log('Current sound resumed');
        setActiveColor(colorName);
        return;
      }
    }

    console.log('Loading new sound');
    const {sound: newSound} = await Audio.Sound.createAsync(
        audio_file,
        {
          isLooping: true,
          isMuted: false,
          volume: 1.0,
          rate: 1.0,
          shouldCorrectPitch: true,
        },
        (status) => {
          if (status.didJustFinish && !status.isLooping) {
            setLoopCount(loopCount + 1);
            console.log('Loop count:', loopCount);
          }
        },
    );
    setSound(newSound);
    setCurrentAudioFile(audio_file);
    setActiveColor(colorName);
    console.log('New sound loaded');

    console.log('Playing new sound');
    await newSound.playAsync();
    console.log('New sound playing');
  };

  const sortedColorMap = Array.from(colorMap).sort(([colorA], [colorB]) =>
    colorA.localeCompare(colorB),
  );

  const handleBackButtonPress = () => {
    console.log('Back button pressed');
    navigation.navigate('About');
  };

  const handleSettingsButtonPress = () => {
    console.log('Settings button pressed');
    navigation.navigate('Settings');
  };

  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>
      <View style={styles.topButtonsBar}>
        <TouchableOpacity style={styles.topButton} onPress={handleBackButtonPress}>
          <Ionicons name="arrow-back" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={handleSettingsButtonPress}>
          <Ionicons name="settings" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {sortedColorMap.map(
            ([colorName, {name, image, thumbnail, audio_file}]) => (
              <View key={colorName}>
                <CustomButton
                  onPress={() => handleButtonPress(colorName, image, audio_file)}
                  image={image}
                  thumbnail={thumbnail}
                  isActive={activeColor === colorName}
                />
              </View>
            ),
        )}
      </View>
    </ImageBackground>
  );
};

export default MainScreen;
