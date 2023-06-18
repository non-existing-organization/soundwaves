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
  const [data = true] = useLocalStorage(storageItemsKeys.settings.firstTimeOpened)

  useEffect(() => {
    if (!data) {
      navigation.navigate('About');
    }
  }, [data, navigation]);

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
