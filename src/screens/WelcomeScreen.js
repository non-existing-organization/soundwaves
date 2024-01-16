import React, { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

import { getSettings } from '../utils/settingsStorage';
import styles from '../utils/styles';

const WelcomeScreen = ({ navigation }) => {
  const [isFirstRun, setIsFirstRun] = useState(null);
  const [userName, setUserName] = useState(null); // To store the user name
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Array of welcome messages for first run
  const firstRunMessages = [
    "Welcome! Let's get started.",
    'Hi there! Time to set up your app.',
    'Welcome aboard! Ready to set up?',
    "Hello! Let's get you set up.",
    'Hi! Ready to dive in?',
  ];

  // Array of welcome messages for returning users
  const welcomeBackMessages = (name) => [
    `Hi ${name}, welcome to Soundwaves, time to relax`,
    `Hello ${name}, let Soundwaves soothe your soul`,
    `Welcome back ${name}! Unwind with the sounds of Soundwaves`,
    `Hey there ${name}, Soundwaves is here to bring you peace`,
    `Step into serenity with Soundwaves, ${name}`,
    `Soundwaves welcomes you back, ${name}, to a world of calm`,
    `Hi ${name}! Ready to experience tranquility with Soundwaves?`,
    `Welcome back ${name}! Let Soundwaves be your sanctuary`,
    `Hello ${name}! Your oasis of relaxation starts with Soundwaves`,
    `Greetings ${name}! Find your inner calm with Soundwaves`,
    `Hey ${name}! Let Soundwaves wash away your stress`,
    `Welcome back ${name}! Tune into relaxation with Soundwaves`,
    `Hi ${name}! Let's create your perfect ambiance with Soundwaves`,
    `Hello and welcome back ${name}! Soundwaves is your gateway to peace`,
    `Hi ${name}, you've reached Soundwaves. Time for some me-time`,
    `Welcome back ${name}! Let Soundwaves be your peaceful escape`,
    `Hey ${name}! Discover your Zen moment with Soundwaves`,
    `Hello ${name}! Soundwaves is your passport to relaxation`,
    `Welcome back to Soundwaves, ${name}, where your calm awaits`,
    `Hey ${name}! Dive into relaxation with Soundwaves`,
    `Welcome back ${name}! Soundwaves missed you`,
    `Hey ${name}, ready for some Soundwaves magic?`,
    `Welcome ${name}! Your Soundwaves journey continues`,
    `Hi ${name}, Soundwaves is your place for relaxation`,
    `Hello ${name}, let Soundwaves take you to your happy place`,
    `Hi ${name}, your Soundwaves sanctuary is ready`,
    `Hey ${name}, ready to escape with Soundwaves?`,
    `Hello ${name}, Soundwaves is your haven of peace`,
    `Greetings ${name}, let Soundwaves lift your spirits`,
    `Hi ${name}, Soundwaves is your escape hatch to tranquility`,
    `Welcome ${name}, let Soundwaves be your musical paradise`,
    `Hello ${name}, Soundwaves awaits your return`,
    `Hey ${name}, Soundwaves is your place to escape`,
    `Hi ${name}, let's explore your Soundwaves universe`,
    `Welcome ${name}, Soundwaves is your home away from home`,
    `Hey ${name}, Soundwaves is your endless horizon of peace`,
    `Hi ${name}, dive into a world of peace with Soundwaves`,
    `Welcome ${name}, let Soundwaves take you away`,
    `Hey ${name}, relax and unwind with Soundwaves`,
    `Hi ${name}, let Soundwaves be your guiding light`,
    `Welcome ${name}, your Soundwaves retreat awaits`,
    `Hello ${name}, Soundwaves is your realm of serenity`,
    `Hi ${name}, come find your peace at Soundwaves`,
    `Welcome ${name}, Soundwaves is where you belong`,
    `Hey ${name}, time to tune into Soundwaves`,
    `Hello ${name}, let Soundwaves help you find your groove`,
    `Hi ${name}, Soundwaves is your comfort zone`,
    `Welcome ${name}, make yourself at home with Soundwaves`,
  ];

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      if (settings.hasOwnProperty('isFirstRun')) {
        setIsFirstRun(settings.isFirstRun);
      } else {
        setIsFirstRun(true); // Default to true
      }
      if (settings.hasOwnProperty('name')) {
        setUserName(settings.name);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (isFirstRun !== null) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate(isFirstRun ? 'FirstRunSetup' : 'Main');
      });
    }
  }, [isFirstRun]);

  let message = 'Loading...';
  if (isFirstRun !== null) {
    if (isFirstRun) {
      message = firstRunMessages[Math.floor(Math.random() * firstRunMessages.length)];
    } else if (userName) {
      const personalizedMessages = welcomeBackMessages(userName);
      message = personalizedMessages[Math.floor(Math.random() * personalizedMessages.length)];
    } else {
      message = 'Welcome back!'; // Fallback message when userName is not available
    }
  }

  return (
    <View style={styles.welcomeContainer}>
      <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>{message}</Animated.Text>
    </View>
  );
};

export default WelcomeScreen;
