// App.js
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useKeepAwake } from 'expo-keep-awake';

import AboutScreen from './screens/AboutScreen';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useLocalStorage } from './hooks/useLocalStorage';

const Stack = createStackNavigator();

const App = () => {
  useKeepAwake();
  const navigation = useNavigation();
  const [firstTimeOpened] = useLocalStorage(storageItemsKeys.settings.firstTimeOpened)

  useEffect(() => {
    if (firstTimeOpened === null) {
      navigation.navigate('About');
    }
  }, [data, navigation]);


useEffect(() => {
  const checkFirstTime = async () => {
    try {
      const value = await AsyncStorage.getItem('isFirstTime');
      setIsFirstTime(value === null);
    } catch (error) {
      console.log('Error retrieving isFirstTime value:', error);
    }
  };

  checkFirstTime();
}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
