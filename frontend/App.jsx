import React, { useState, useEffect, AsyncStorage } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './components/AuthProvider.js';
import InGameNavBar from './components/InGameNavbar.jsx';
import HomeScreen from './pages/HomeScreen.js';
import Profile from './pages/Profile.js';
import Landing from './pages/Landing.js';
import SignUp from './pages/SignUp.js';
import CreateGame from './pages/CreateGame.js';
import JoinGame from './pages/JoinGame.js';

const Stack = createStackNavigator();

function App() {
    const [currentRoute, setCurrentRoute] = useState('Landing');
    const excludedRoutes = ['Landing', 'SignUp', 'JoinGame', 'CreateGame'];

    return (
        <AuthProvider>
            <NavigationContainer
                onStateChange={(state) => {
                    const routeName = state?.routes[state.index]?.name;
                    setCurrentRoute(routeName);
                }}>
                <Stack.Navigator
                    initialRouteName={currentRoute}
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="CreateGame" component={CreateGame} />
                    <Stack.Screen name="JoinGame" component={JoinGame} />
                </Stack.Navigator>

                {!excludedRoutes.includes(currentRoute) && <InGameNavBar />}
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
