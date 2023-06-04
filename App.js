import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Replace these with the paths to your actual images
const backgroundImage = require('./assets/background.png');

const images = [
  require('./assets/noise_colours/blue.png'),
  require('./assets/noise_colours/brown.png'),
  require('./assets/noise_colours/pink.png'),
  require('./assets/noise_colours/red.png'),
  require('./assets/noise_colours/violet.png'),
  require('./assets/noise_colours/white.png'),
  require('./assets/noise_colours/gray.png'),
  // ... Repeat for the rest of your images
];

const thumbnails = [
  require('./assets/noise_colours/blue.png'),
  require('./assets/noise_colours/brown.png'),
  require('./assets/noise_colours/pink.png'),
  require('./assets/noise_colours/red.png'),
  require('./assets/noise_colours/violet.png'),
  require('./assets/noise_colours/white.png'),
  require('./assets/noise_colours/gray.png'),
  // ... Repeat for the rest of your thumbnails
];

const CustomButton = ({ onPress, image, thumbnail }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={thumbnail} style={styles.buttonImage} />
    </TouchableOpacity>
  );
};

const App = () => {
  const [mainImage, setMainImage] = useState(backgroundImage);

  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>
      <View style={styles.buttonContainer}>
        {images.map((image, index) => (
          <CustomButton
            key={index}
            onPress={() => setMainImage(image)}
            image={image}
            thumbnail={thumbnails[index]}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  buttonContainer: {
    position: 'absolute', // Position the button container absolutely
    bottom: 30, // Position it at the bottom of the screen
    width: '100%', // Make it span the full width of the screen
    flexDirection: 'row',
    justifyContent: 'space-around', // Space the buttons equally
    padding: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'purple',
    borderWidth: 2,
  },
  buttonImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default App;
