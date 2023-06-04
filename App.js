import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Replace these with the paths to your actual images
const backgroundImage = require('./assets/background.png');

const colorMap = new Map([
  [
    'blue',
    {
      name: 'Blue',
      image: require('./assets/noise_colours/blue.png'),
      thumbnail: require('./assets/noise_colours/blue.png'),
      buttons: [
        {
          name: 'Sub Button 1',
          image: require('./assets/noise_colours/blue.png'),
          thumbnail: require('./assets/noise_colours/blue.png'),
        },
        {
          name: 'Sub Button 2',
          image: require('./assets/noise_colours/blue.png'),
          thumbnail: require('./assets/noise_colours/blue.png'),
        },
      ],
    },
  ],
  [
    'brown',
    {
      name: 'Brown',
      image: require('./assets/noise_colours/brown.png'),
      thumbnail: require('./assets/noise_colours/brown.png'),
      buttons: [
        {
          name: 'Sub Button 1',
          image: require('./assets/noise_colours/blue.png'),
          thumbnail: require('./assets/noise_colours/blue.png'),
        },
      ],
    },
  ],
  // ... Repeat for the rest of the colors
]);
const CustomButton = ({ onPress, onLongPress, name, image, thumbnail, buttons }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handlePress = () => {
    if (!showSubMenu) {
      onPress(image);
    }
  };

  const handleLongPress = () => {
    setShowSubMenu(true);
    onLongPress(name);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[styles.button, showSubMenu && styles.fadedButton]}
    >
      <Image source={thumbnail} style={styles.buttonImage} />
      {showSubMenu && (
        <View style={styles.subButtonContainer}>
          {buttons.map(({ name, image, thumbnail }, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.subButton, styles.button]}
              onPress={() => onPress(image)}
            >
              <Image source={thumbnail} style={styles.buttonImage} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const App = () => {
  const [mainImage, setMainImage] = useState(backgroundImage);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonPress = (image) => {
    setMainImage(image);
  };

  const handleButtonLongPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>
      <View style={styles.buttonContainer}>
        {Array.from(colorMap).map(([colorName, { name, image, thumbnail, buttons }]) => (
          <View key={colorName}>
            <CustomButton
              onPress={handleButtonPress}
              onLongPress={handleButtonLongPress}
              name={name}
              image={image}
              thumbnail={thumbnail}
              buttons={buttons}
            />
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  fadedButton: {
    opacity: 0.5,
  },
  buttonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4, // Adjust the gap between the border and the image
  },
  subButtonContainer: {
    position: 'absolute',
    top: -60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginVertical: 5,
  },
});


export default App;
