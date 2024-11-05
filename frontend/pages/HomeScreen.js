<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
=======
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
>>>>>>> 51ffb61427d103ff5838bf4143c49d6b061a50fd
import { homepageStyles } from '../styles.js'
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [target, setTarget] = useState('');
    const [gameID, setGameID] = useState('');

    useEffect(async () => {
        const user = auth().currentUser;
        if (user) {
            setUserEmail(user.email);
            setUserID(user.uid);
        }
        const fetchGameId = async () => {
            const storedGameId = await AsyncStorage.getItem('game_id');
            setGameId(storedGameId);
        };

        fetchGameId();

        const cachedTarget = await getCachedTarget();
        if (!cachedTarget) {
            await getTarget(); // Only call the backend if no cached target is found
        } else {
            setTarget(cachedTarget);
            Alert.alert('Cached Target Loaded', `Target: ${cachedTarget}`);
        }
    }, []);

    // Retrieve cached target from AsyncStorage
    const getCachedTarget = async () => {
        try {
            const cachedTarget = await AsyncStorage.getItem('target');
            return cachedTarget ? JSON.parse(cachedTarget) : null;
        } catch (error) {
            console.error('Error retrieving cached target:', error);
            return null;
        }
    };

    const getTarget = async () => {
        const url = 'http://128.113.126.109/get_target';
        const requestData = {
            owner_name: userEmail,
            owner_id: userID,
            game_id: gameID
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                setTarget(result.target);
                Alert.alert('Game Joined', `Game ID: ${result.game_id}`);
            } else {
                Alert.alert('Error Joining Game', result.error);
            }
        } catch (error) {
            console.error('Error Joining game:', error);
            Alert.alert('Error (getTarget)', 'Failed to connect to the server.');
        }
    };

    const handleKill = async () => {
        const url = 'http://128.113.126.109/kill';
        const requestData = {
            killer_name: userEmail,
            killer_id: userID,
            game_id: gameID
        };

        try {
            const response = await fetch(url, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if(response.ok) {
                Alert.alert("Target Killed");
            } else {
                Alert.alert("Error killing target");
            }
        } catch (error) {
            Alert.alert("Error killing target");
        }
    };

    const handleAction = () => {
        Alert.alert('Action button clicked!');
    };

    const handleLogout = () => {
        auth().signOut().then(() => {
            Alert.alert('Logged out');
        }).catch((error) => {
            Alert.alert('Logout failed', error.message);
        });
    };

    return (
        <View style={homepageStyles.container}>
            <View style={homepageStyles.header}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={homepageStyles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <Text style={homepageStyles.userText}>User: {userEmail || 'Placeholder'}</Text>
            </View>

            <Text style={homepageStyles.targetText}>Target: {target || 'Placeholder'}</Text>

            <View style={homepageStyles.killButton}>
                <TouchableOpacity style={homepageStyles.button} onPress={handleKill}>
                    <Text style={homepageStyles.buttonText}>Kill</Text>
                </TouchableOpacity>
            </View>
            <View style={homepageStyles.actionButton}>
                <TouchableOpacity style={homepageStyles.button} onPress={handleAction}>
                    <Text style={homepageStyles.buttonText}>Action</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default HomeScreen;
