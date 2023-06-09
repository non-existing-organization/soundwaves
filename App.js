// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useKeepAwake } from 'expo-keep-awake';

import AboutScreen from './AboutScreen';
import MainScreen from './MainScreen';

const Stack = createStackNavigator();

const App = () => {
  useKeepAwake();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="About">
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
