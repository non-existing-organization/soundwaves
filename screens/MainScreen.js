/* eslint-disable react/prop-types */
// MainScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

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
  const [soundsCache, setSoundsCache] = useState(new Map());



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


  // // Handle button press
  // const handleButtonPress = async (colorName, image, audioFile) => {
  //   console.log(`Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audioFile}`);

  //   const isOtherSoundPlaying = sound && audioFile !== currentAudioFile;
  //   const isSoundLoaded = sound && (await sound.getStatusAsync()).isLoaded;

  //   console.log('isMuted:', isMuted);

  //   if (isMuted) {
  //     console.log('Stoping and unloading previous sound');
  //     await sound.stopAsync();
  //     sound.setIsMutedAsync(false);
  //     setIsMuted(false);
  //   }

  //   setMainColor(colorMap.get(colorName).colors[Math.floor(Math.random() * 5)]);

  //   if (sound && isSoundLoaded && !isMuted) {
  //     const status = await sound.getStatusAsync();
  //     if (isOtherSoundPlaying) {
  //       console.log('Stopping and unloading previous sound');
  //       await sound.stopAsync();
  //       await sound.unloadAsync();
  //       console.log('Previous sound unloaded');
  //       setActiveColor(null);
  //     } else if (status.isPlaying) {
  //       console.log('Pausing current sound');
  //       setMainColor(backgroundColorDefault);
  //       await sound.pauseAsync();
  //       console.log('Current sound paused');
  //       setActiveColor(null);
  //       return;
  //     } else {
  //       console.log('Resuming current sound');
  //       await sound.playAsync();
  //       console.log('Current sound resumed');
  //       setActiveColor(colorName);
  //       return;
  //     }
  //   }

  //   console.log('Loading new sound');
  //   const newSound = new Audio.Sound();
  //   await newSound.loadAsync(
  //     { uri: audioFile },
  //     {
  //       isLooping: true,
  //       isMuted: false,
  //       volume: 1.0,
  //       rate: 1.0,
  //       shouldCorrectPitch: true,
  //     },
  //     (status) => {
  //       if (status.didJustFinish && !status.isLooping) {
  //         setLoopCount((prevCount) => prevCount + 1);
  //         console.log('Loop count:', loopCount);
  //       }
  //     }
  //   );
  //   setSound(newSound);
  //   setCurrentAudioFile(audioFile);
  //   setActiveColor(colorName);
  //   console.log('New sound loaded');

  //   console.log('Playing new sound');
  //   await newSound.playAsync();
  //   console.log('New sound playing');
  // };

  // // Handle button press
  // const handleButtonPress = async (colorName, image, audioFile) => {
  //   console.log(`Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audioFile}`);

  //   const isOtherSoundPlaying = sound && audioFile !== currentAudioFile;
  //   const isSoundLoaded = sound && (await sound.getStatusAsync()).isLoaded;

  //   console.log('isMuted:', isMuted);

  //   if (isMuted) {
  //     console.log('Stopping and unloading previous sound');
  //     await sound.stopAsync();
  //     sound.setIsMutedAsync(false);
  //     setIsMuted(false);
  //   }

  //   setMainColor(colorMap.get(colorName).colors[Math.floor(Math.random() * 5)]);

  //   if (sound && isSoundLoaded && !isMuted) {
  //     const status = await sound.getStatusAsync();
  //     if (isOtherSoundPlaying) {
  //       console.log('Stopping previous sound');
  //       await sound.stopAsync();
  //       console.log('Previous sound stopped');
  //       setActiveColor(null);
  //     } else if (status.isPlaying) {
  //       console.log('Pausing current sound');
  //       setMainColor(backgroundColorDefault);
  //       await sound.pauseAsync();
  //       console.log('Current sound paused');
  //       setActiveColor(null);
  //       return;
  //     } else {
  //       console.log('Resuming current sound');
  //       await sound.playAsync();
  //       console.log('Current sound resumed');
  //       setActiveColor(colorName);
  //       return;
  //     }
  //   }

  //   let newSound;
  //   if (soundsCache.has(audioFile)) {
  //     console.log('Loading sound from cache');
  //     newSound = soundsCache.get(audioFile);
  //   } else {
  //     console.log('Loading new sound');
  //     newSound = new Audio.Sound();
  //     await newSound.loadAsync(
  //       { uri: audioFile },
  //       {
  //         isLooping: true,
  //         isMuted: false,
  //         volume: 1.0,
  //         rate: 1.0,
  //         shouldCorrectPitch: true,
  //       },
  //       (status) => {
  //         if (status.didJustFinish && !status.isLooping) {
  //           setLoopCount((prevCount) => prevCount + 1);
  //           console.log('Loop count:', loopCount);
  //         }
  //       }
  //     );

  //     setSoundsCache(soundsCache.set(audioFile, newSound));
  //     console.log('New sound loaded');
  //   }

  //   setSound(newSound);
  //   setCurrentAudioFile(audioFile);
  //   setActiveColor(colorName);

  //   console.log('Playing new sound');
  //   await newSound.playAsync();
  //   console.log('New sound playing');
  // };

  // Handle button press
  const handleButtonPress = async (colorName, image, audioFile) => {
    console.log(`Button press detected. Color: ${colorName}, Image: ${image}, Audio File: ${audioFile}`);

    const isOtherSoundPlaying = sound && audioFile !== currentAudioFile;
    let isSoundLoaded = sound && (await sound.getStatusAsync()).isLoaded;

    console.log('isMuted:', isMuted);

    if (isMuted) {
      console.log('Stoping and unloading previous sound');
      if (isSoundLoaded) {
        try {
          await sound.stopAsync();
          await sound.setIsMutedAsync(false);
        } catch (e) {
          console.error('Error stopping or unmuting sound:', e);
        }
      }
      setIsMuted(false);
    }

    setMainColor(colorMap.get(colorName).colors[Math.floor(Math.random() * 5)]);

    if (sound && isSoundLoaded && !isMuted) {
      const status = await sound.getStatusAsync();
      if (isOtherSoundPlaying) {
        console.log('Stopping and unloading previous sound');
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (e) {
          console.error('Error stopping or unloading sound:', e);
        }
        console.log('Previous sound unloaded');
        setActiveColor(null);
      } else if (status.isPlaying) {
        console.log('Pausing current sound');
        setMainColor(backgroundColorDefault);
        try {
          await sound.pauseAsync();
        } catch (e) {
          console.error('Error pausing sound:', e);
        }
        console.log('Current sound paused');
        setActiveColor(null);
        return;
      } else {
        console.log('Resuming current sound');
        try {
          await sound.playAsync();
        } catch (e) {
          console.error('Error playing sound:', e);
        }
        console.log('Current sound resumed');
        setActiveColor(colorName);
        return;
      }
    }

    console.log('Loading new sound');
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
      setCurrentAudioFile(audioFile);
      setActiveColor(colorName);
      console.log('New sound loaded');

      console.log('Playing new sound');
      try {
        await newSound.playAsync();
      } catch (e) {
        console.error('Error playing new sound:', e);
      }
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
