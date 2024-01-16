// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import FirstRunSetup from './src/screens/FirstRunSetupScreen';
import MainScreen from './src/screens/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { getSettings } from './src/utils/settingsStorage';

const Stack = createStackNavigator();

const App = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkFirstRunSetting() {
      const settings = await getSettings();
      setIsFirstRun(settings.isFirstRun !== undefined ? settings.isFirstRun : true);
      setIsLoading(false);
    }

    checkFirstRunSetting();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {isFirstRun ? <Stack.Screen name="FirstRunSetup" component={FirstRunSetup} /> : null}
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
