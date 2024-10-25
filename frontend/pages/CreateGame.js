import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { styles, createGameStyles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const CreateGame = () => {
    const [roundLengthValueMins, setRoundLengthValue] = useState('30');
    const [customRoundLengthValueMins, setCustomValue] = useState('');
    const [killDistanceFeet, setKillDistance] = useState('5');
    const [customKillDistanceFeet, setCustomKillDistance] = useState('');
    const [shuffleTargets, setShuffleTargets] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.homePageScrn}>
            <Text style={styles.header}>Create Game</Text>
            
            <View style={createGameStyles.formContainer}>
                {/* Round Length Section */}
                <Text style={styles.subTitle}>Round Length</Text>
                <View style={createGameStyles.pickerContainer}>
                    <Picker
                        selectedValue={roundLengthValue}
                        style={createGameStyles.picker}
                        dropdownIconColor="white"
                        onValueChange={(itemValue) => setRoundLengthValue(itemValue)}
                    >
                        <Picker.Item label="30 mins" value="30" color="white" />
                        <Picker.Item label="1 hour" value="60" color="white" />
                        <Picker.Item label="3 hours" value="180" color="white" />
                        <Picker.Item label="6 hours" value="360" color="white" />
                        <Picker.Item label="12 hours" value="720" color="white" />
                        <Picker.Item label="Other" value="other" color="white" />
                    </Picker>
                </View>

                {roundLengthValue === 'other' && (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            const days = parseFloat(text) || 0;
                            const minutes = days * 1440;
                            setCustomValue(text);
                            setRoundLengthValue(minutes.toString());
                        }}
                        value={customRoundLengthValue}
                        placeholder="Enter number of days"
                        placeholderTextColor="#666"
                        keyboardType="numeric"
                    />
                )}

                {/* Kill Distance Section */}
                <Text style={styles.subTitle}>Kill Distance (meters)</Text>
                <View style={createGameStyles.pickerContainer}>
                    <Picker
                        selectedValue={killDistance}
                        style={createGameStyles.picker}
                        dropdownIconColor="white"
                        onValueChange={(itemValue) => setKillDistance(itemValue)}
                    >
                        <Picker.Item label="10 feet" value="10" color="white" />
                        <Picker.Item label="25 feet" value="25" color="white" />
                        <Picker.Item label="50 feet" value="50" color="white" />
                        <Picker.Item label="100 feet" value="100" color="white" />
                        <Picker.Item label="Other" value="other" color="white" />
                    </Picker>
                </View>

                {killDistance === 'other' && (
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            setCustomKillDistance(text);
                            if (text) setKillDistance(text);
                        }}
                        value={customKillDistance}
                        placeholder="Enter distance in meters"
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
                                    : "your Targets target will become your target "}
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
                onPress={() => {
                    // Handle game creation here
                    // You can access all the values: roundLengthValue, killDistance, shuffleTargets
                }}
            >
                <Text style={styles.buttonText}>Create Game</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateGame;