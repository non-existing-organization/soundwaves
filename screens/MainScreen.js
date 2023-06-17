/* eslint-disable react/prop-types */
// MainScreen.js
import React, {useState, useEffect, useRef} from 'react';
import {View, ImageBackground, TouchableOpacity} from 'react-native';
import {Audio} from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import colorMap from '../utils/colorMap';
import styles from '../utils/styles';
// import SettingsButton from '../components/SettingsButton';
import CustomButton from '../components/CustomButton';

const backgroundImage = require('../assets/background.png');

const MainScreen = ({navigation}) => {
  const [mainImage, setMainImage] = useState(backgroundImage);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousColorRef = useRef(null);


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

  // Handle button press
  const handleButtonPress = async (colorName, image, audioFile) => {
    console.log(`Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audioFile}`);

    const isOtherSoundPlaying = sound && audioFile !== currentAudioFile;
    const isSoundLoaded = sound && (await sound.getStatusAsync()).isLoaded;

    console.log('isMuted:', isMuted);

    if (isMuted) {
      console.log('Stoping and unloading previous sound');
      await sound.stopAsync();
      sound.setIsMutedAsync(false);
      setIsMuted(false);
    }
    setMainImage(image);
    if (sound && isSoundLoaded && !isMuted) {
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
        audioFile,
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
        },
    );
    setSound(newSound);
    setCurrentAudioFile(audioFile);
    setActiveColor(colorName);
    console.log('New sound loaded');

    console.log('Playing new sound');
    await newSound.playAsync();
    console.log('New sound playing');
  };

  // // Handle settings button press
  // const handleSettingsButtonPress = () => {
  //   console.log('Settings button pressed');
  //   navigation.navigate('Settings');
  // };

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
  const renderCustomButton = ([colorName, {name, image, thumbnail, audioFile}]) => {
    const onPress = () => handleButtonPress(colorName, image, audioFile);
    return (
      <View key={colorName}>
        <CustomButton
          onPress={onPress}
          image={image}
          thumbnail={thumbnail}
          isActive={activeColor === colorName}
          isMuted={isMuted}
        />
      </View>
    );
  };

  // Sort the color map by color name
  const sortedColorMap = Array.from(colorMap).sort(([colorA], [colorB]) =>
    colorA.localeCompare(colorB),
  );

  // Render the main screen
  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>

      <View style={styles.topButtonsBar}>
        <TouchableOpacity onPress={handleSpeakerButtonPress}>
          <Icon
            name={isMuted ? 'volume-off' : 'volume-up'}
            size={24}
            color={isMuted ? 'red' : 'white'}
          />
        </TouchableOpacity>
        {/* <SettingsButton onPress={handleSettingsButtonPress} /> */}
      </View>

      <View style={styles.buttonContainer}>
        {sortedColorMap.map(renderCustomButton)}
      </View>
    </ImageBackground>
  );
};

export default MainScreen;
