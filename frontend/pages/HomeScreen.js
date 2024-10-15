import React from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { homepageStyles } from '../styles.js'

const HomeScreen = () => {
    const handleKill = () => {
        Alert.alert('Kill action clicked!');
    };

    const handleAction = () => {
        Alert.alert('Action button clicked!');
    };

    const handleLogout = () => {
        Alert.alert('Logging out...');
    };

    return (
        <View style={homepageStyles.container}>
            <View style={homepageStyles.header}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={homepageStyles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <Text style={homepageStyles.userText}>User: Placeholder</Text>
            </View>
            
            <Text style={homepageStyles.targetText}>Target: ________</Text>
            
            <View style={homepageStyles.buttonContainer}>
                <View style={homepageStyles.button}>
                    <Button title="Kill" onPress={handleKill} />
                </View>
                <View style={homepageStyles.button}>
                    <Button title="Action" onPress={handleAction} />
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;
