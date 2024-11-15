import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Button, AsyncStorage } from 'react-native';
import { styles, joinGameStyles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const JoinGame = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [gameCode, setGameCode] = useState('');

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setUserEmail(user.email);
            setUserID(user.uid)
        }
    }, []);

    const handleJoinGame = async () => {
        const url = 'http://128.113.126.109/join_game';
        const requestData = {
            owner_name: userEmail,
            owner_id: userID,
            game_id: gameCode
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
                Alert.alert('Game Joined', `Game ID: ${result.game_id}`);
                navigation.navigate('Home', { gameId: gameCode });
            } else {
                Alert.alert('Error Joining Game', result.error);
            }
        } catch (error) {
            console.error('Error Joining game:', error);
            Alert.alert('Error', 'Failed to connect to the server.');
        }

    };

    const handleCreateGame = () => {
        // Navigate to the "CreateGame" screen
        navigation.navigate('CreateGame');
    };

    return (
        <View>
            <Text style={styles.header}>Join Game</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    const days = parseFloat(text) || 0;
                    setGameCode(text);
                }}
                value={gameCode}
                placeholder="Enter your game code"
                placeholderTextColor="#666"
                keyboardType="numeric"
            />
            <Button
                title="Join Game"
                onPress={handleJoinGame}
            />
            <Text style={styles.header}>or</Text>
            <Button
                title="Create Game"
                onPress={handleCreateGame}
            />
        </View>
    );
};

export default JoinGame;