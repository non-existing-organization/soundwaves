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
    setMainImage(image);

    if (sound) {
      if (audio_file === currentAudioFile) {
        const isPlaying = await sound.getStatusAsync();
        if (isPlaying.isPlaying) {
          console.log('Pausing sound');
          await sound.pauseAsync();
        } else {
          console.log('Resuming sound');
          await sound.playAsync();
        }
      } else {
        console.log('Stopping and unloading previous sound');
        await sound.stopAsync();
        await sound.unloadAsync();

        console.log('Loading new sound');
        const { sound: newSound } = await Audio.Sound.createAsync(audio_file);
        setSound(newSound);
        setCurrentAudioFile(audio_file);
        console.log('Playing sound');
        await newSound.playAsync();
      }
    } else {
      console.log('Loading new sound');
      const { sound: newSound } = await Audio.Sound.createAsync(audio_file);
      setSound(newSound);
      setCurrentAudioFile(audio_file);
      console.log('Playing sound');
      await newSound.playAsync();
    }
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
