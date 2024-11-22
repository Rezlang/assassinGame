import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, AsyncStorage } from 'react-native';
import { styles, createGameStyles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';

const CreateGame = () => {
    const [roundLengthValueMins, setRoundLengthValue] = useState('30');
    const [customRoundLengthValueMins, setCustomValue] = useState('');
    const [killDistanceFeet, setKillDistance] = useState('5');
    const [customKillDistanceFeet, setCustomKillDistance] = useState('');
    const [shuffleTargets, setShuffleTargets] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userID, setUserID] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            setUserEmail(user.email);
            setUserID(user.uid)
        }
    }, []);

    return (
        <View style={styles.homePageScrn}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('JoinGame')}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Create Game</Text>

            <View style={createGameStyles.formContainer}>
                {/* Round Length Section */}
                <Text style={styles.subTitle}>Round Length</Text>
                <View style={createGameStyles.pickerContainer}>
                    <Picker
                        selectedValue={roundLengthValueMins}
                        style={createGameStyles.picker}
                        dropdownIconColor="white"
                        onValueChange={(itemValue) => setRoundLengthValue(itemValue)}
                    >
                        <Picker.Item label="30 mins" value="30" color="black" />
                        <Picker.Item label="1 hour" value="60" color="black" />
                        <Picker.Item label="3 hours" value="180" color="black" />
                        <Picker.Item label="6 hours" value="360" color="black" />
                        <Picker.Item label="12 hours" value="720" color="black" />
                        <Picker.Item label="Other" value="other" color="black" />
                    </Picker>
                </View>

                {roundLengthValueMins === 'other' && (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            const days = parseFloat(text) || 0;
                            const minutes = days * 1440;
                            setCustomValue(text);
                            setRoundLengthValue(minutes.toString());
                        }}
                        value={customRoundLengthValueMins}
                        placeholder="Enter number of days"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                    />
                )}

                {/* Kill Distance Section */}
                <Text style={styles.subTitle}>Kill Distance (feet)</Text>
                <View style={createGameStyles.pickerContainer}>
                    <Picker
                        selectedValue={killDistanceFeet}
                        style={createGameStyles.picker}
                        dropdownIconColor="white"
                        onValueChange={(itemValue) => setKillDistance(itemValue)}
                    >
                        <Picker.Item label="5 feet" value="5" color="black" />
                        <Picker.Item label="10 feet" value="10" color="black" />
                        <Picker.Item label="25 feet" value="25" color="black" />
                        <Picker.Item label="50 feet" value="50" color="black" />
                        <Picker.Item label="100 feet" value="100" color="black" />
                        <Picker.Item label="Other" value="other" color="black" />
                    </Picker>
                </View>

                {killDistanceFeet === 'other' && (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setCustomKillDistance(text);
                            if (text) setKillDistance(text);
                        }}
                        value={customKillDistanceFeet}
                        placeholder="Enter distance in feet"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                    />
                )}

                {/* Shuffle Targets Section */}
                <TouchableOpacity
                    style={createGameStyles.shuffleContainer}
                    onPress={() => setShuffleTargets(!shuffleTargets)}
                    activeOpacity={0.7}
                >
                    <View style={createGameStyles.shuffleContent}>
                        <View>
                            <Text style={styles.subTitle}>Shuffle Targets</Text>
                            <Text style={createGameStyles.description}>
                                {shuffleTargets
                                    ? "Targets will be randomly reassigned each round"
                                    : "Your Targets target will become your target "}
                            </Text>
                        </View>
                        <Switch
                            value={shuffleTargets}
                            onValueChange={setShuffleTargets}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={shuffleTargets ? '#2196F3' : '#f4f3f4'}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Create Game Button */}
            <TouchableOpacity
                style={[styles.loginBtn, createGameStyles.createButton]}
                onPress={async () => {
                    //TODO: pass additional game settings through request and set actual owner name and id
                    const url = 'http://128.113.126.109/create_game';
                    const requestData = {
                        owner_name: userEmail,
                        owner_id: userID
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
                            Alert.alert('Game Created', `Game ID: ${result.game_id}`);
                            try {
                                await AsyncStorage.setItem(
                                    'game_id',
                                    result.game_id,
                                );
                            } catch (error) {
                                Alert.alert('Error saving Game ID');
                            }
                        } else {
                            Alert.alert('Error Creating Game', result.error);
                        }
                    } catch (error) {
                        console.error('Error creating game:', error);
                        Alert.alert('Error', 'Failed to connect to the server.');
                    }
                    // You can access all the values: roundLengthValue, killDistance, shuffleTargets
                    console.log({
                        roundLengthMins: roundLengthValueMins,
                        killDistanceFeet: killDistanceFeet,
                        shuffleTargets: shuffleTargets
                    });

                }}
            >
                <Text style={styles.buttonText}>Create Game</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateGame;