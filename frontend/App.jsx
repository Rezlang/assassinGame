import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InGameNavBar from './components/InGameNavbar.jsx';
import HomeScreen from './pages/HomeScreen.js';
import Profile from './pages/Profile.js';
import Landing from './pages/Landing.js';
import SignUp from './pages/SignUp.js';

const Stack = createStackNavigator();

function App() {
  const [currentRoute, setCurrentRoute] = useState('Landing');

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const routeName = state?.routes[state.index]?.name;
        setCurrentRoute(routeName);
      }}>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>

      {currentRoute !== 'Landing' && currentRoute !== 'SignUp' && <InGameNavBar />}
    </NavigationContainer>
  );
}

export default App;
