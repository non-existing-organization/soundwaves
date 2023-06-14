/* eslint-disable react/prop-types */
// MainScreen.js
import React, {useState, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import {Audio} from 'expo-av';

import colorMap from '../utils/colorMap';
import styles from '../utils/styles';
import CustomButton from '../components/CustomButton';

const backgroundImage = require('../assets/background.png');

const MainScreen = ({navigation}) => {
  const [mainImage, setMainImage] = useState(backgroundImage);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound on component unmount');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    Audio.setAudioModeAsync({playsInSilentModeIOS: true});
  }, []);

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
    const {sound: newSound} = await Audio.Sound.createAsync(audio_file, {
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
    });
    setSound(newSound);
    setCurrentAudioFile(audio_file);
    setActiveColor(colorName);
    console.log('New sound loaded');

    console.log('Playing new sound');
    await newSound.playAsync();
    console.log('New sound playing');
  };



  const renderCustomButton = ([colorName, {name, image, thumbnail, audio_file}]) => {
    const onPress = () => handleButtonPress(colorName, image, audio_file);

    return (
      <View key={colorName}>
        <CustomButton
          onPress={onPress}
          image={image}
          thumbnail={thumbnail}
          isActive={activeColor === colorName}
        />
      </View>
    );
  };

  const sortedColorMap = Array.from(colorMap).sort(([colorA], [colorB]) =>
    colorA.localeCompare(colorB),
  );

  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>

      <View style={styles.buttonContainer}>
        {sortedColorMap.map(renderCustomButton)}
      </View>
    </ImageBackground>
  );
};

export default MainScreen;
