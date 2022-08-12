import * as React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home/Home';
import ModelsList from './src/Home/ModelsList';
import ModelDetailse from './src/Home/ModelDetailse';

const Stack = createNativeStackNavigator();
const App = (route) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ModelsList" component={ModelsList} />
        <Stack.Screen name="ModelDetailse" component={ModelDetailse} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
