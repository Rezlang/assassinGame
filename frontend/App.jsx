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

const Stack = createStackNavigator();

function App() {
    let user;
    try {
        const auth = useAuth();
        user = auth?.user;
    } catch (error) {
        console.error('Error accessing AuthContext:', error);
        user = null;
    }
    const [currentRoute, setCurrentRoute] = useState('Landing');
    const [initialRoute, setInitialRoute] = useState('Landing');

    // Determine the initial route based on user auth status and cached game_id
    useEffect(() => {
        const determineInitialRoute = async () => {
            if (user) {
                try {
                    const gameId = await AsyncStorage.getItem('game_id');
                    setInitialRoute(gameId ? 'HomeScreen' : 'CreateGame');
                } catch (error) {
                    console.error('Error checking cached game ID:', error);
                }
            } else {
                setInitialRoute('Landing');
            }
        };

        determineInitialRoute();
    }, [user]);

    return (
        <AuthProvider>
            <NavigationContainer
                onStateChange={(state) => {
                    const routeName = state?.routes[state.index]?.name;
                    setCurrentRoute(routeName);
                }}>
                <Stack.Navigator
                    initialRouteName={initialRoute}
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="CreateGame" component={CreateGame} />
                </Stack.Navigator>

                {currentRoute !== 'Landing' && currentRoute !== 'SignUp' && <InGameNavBar />}
            </NavigationContainer>
        </AuthProvider>
    );
}

export default App;
