import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { styles, joinGameStyles} from '../styles.js';
import { useNavigation } from '@react-navigation/native';

const JoinGame = () => {
    const [GameCode, setGameCode] = useState('');
    const handleJoinGame = () => {
        navigation.navigate('Home', { gameId: GameCode });
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
                value={GameCode}
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
