import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from 'react-native';
import auth from '@react-native-firebase/auth';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Set up Firebase onAuthStateChanged listener and cache user data
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                await cacheUserData(user); // Cache user data on sign-in
            } else {
                setUser(null);
                await clearCachedUserData(); // Clear cache on sign-out
            }
        });
        return unsubscribe; // Clean up the listener on unmount
    }, []);

    // Function to cache user data
    const cacheUserData = async (user) => {
        try {
            await AsyncStorage.setItem('userEmail', user.email);
            await AsyncStorage.setItem('userUID', user.uid);
        } catch (error) {
            console.error('Error caching user data:', error);
        }
    };

    // Function to clear cached user data on logout
    const clearCachedUserData = async () => {
        try {
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userUID');
            await AsyncStorage.removeItem('game_id');
        } catch (error) {
            console.error('Error clearing cached user data:', error);
        }
    };

    // Sign-in function
    const signIn = async (email, password) => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            setUser(userCredential.user);
            await cacheUserData(userCredential.user);
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    };

    // Sign-out function
    const signOut = async () => {
        try {
            await auth().signOut();
            setUser(null);
            await clearCachedUserData();
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    // Provide the auth values and functions to the app
    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
