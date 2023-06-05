// App.js

import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import CustomButton from './CustomButton';
import colorMap from './colorMap';
import styles from './styles';

const backgroundImage = require('./assets/background.png');

const App = () => {
  const [mainImage, setMainImage] = useState(backgroundImage);

  const handleButtonPress = (image) => {
    setMainImage(image);
  };

  return (
    <ImageBackground source={mainImage} style={styles.backgroundImage}>
      <View style={styles.buttonContainer}>
        {Array.from(colorMap).map(([colorName, { name, image, thumbnail }]) => (
          <View key={colorName}>
            <CustomButton
              onPress={handleButtonPress}
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
