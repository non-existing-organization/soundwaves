// App.js
import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import CustomButton from './CustomButton';
import colorMap from './colorMap';
import styles from './styles';

const backgroundImage = require('./assets/background.png');

const App = () => {
  const [mainImage, setMainImage] = useState(backgroundImage);
  const [sound, setSound] = useState(null);
  const [currentAudioFile, setCurrentAudioFile] = useState(null);

  const handleButtonPress = async (image, audio_file) => {
    console.log(`Button press detected. Image: ${image}, Audio File: ${audio_file}`);
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
        } else if (status.isPlaying) {
            console.log('Pausing current sound');
            await sound.pauseAsync();
            console.log('Current sound paused');
            return;
        } else {
            console.log('Resuming current sound');
            await sound.playAsync();
            console.log('Current sound resumed');
            return;
        }
    }

    console.log('Loading new sound');
    const { sound: newSound } = await Audio.Sound.createAsync(audio_file);
    setSound(newSound);
    setCurrentAudioFile(audio_file);
    console.log('New sound loaded');

    console.log('Playing new sound');
    await newSound.playAsync();
    console.log('New sound playing');
};



  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound on component unmount');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const sortedColorMap = Array.from(colorMap).sort(([colorA], [colorB]) => colorA.localeCompare(colorB));

  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>
      <View style={styles.buttonContainer}>
        {sortedColorMap.map(([colorName, { name, image, thumbnail, audio_file }]) => (
          <View key={colorName}>
            <CustomButton
              onPress={() => handleButtonPress(image, audio_file)}
              name={name}
              image={image}
              thumbnail={thumbnail}
            />
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

export default App;
