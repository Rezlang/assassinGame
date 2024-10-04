import * as React from 'react';
import {View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InGameNavBar from './components/InGameNavbar.jsx'
import HomeScreen from './pages/HomeScreen.js'
import Profile from './pages/Profile.js'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <InGameNavBar />
    </NavigationContainer>
  );
}

export default App;
